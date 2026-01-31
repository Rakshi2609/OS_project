import { useEffect, useRef, useState } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import '@xterm/xterm/css/xterm.css'
import { api } from '@/lib/api'

interface Suggestion {
  command: string
  description: string
  confidence: number
}

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<XTerm | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!terminalRef.current) {
      return
    }

    // Initialize xterm.js
    const term = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#cccccc',
        cursor: '#ffffff',
      },
      rows: 24,
      cols: 80,
    })

    const fitAddon = new FitAddon()
    const webLinksAddon = new WebLinksAddon()

    term.loadAddon(fitAddon)
    term.loadAddon(webLinksAddon)

    term.open(terminalRef.current)
    
    // Focus the terminal to enable typing
    term.focus()

    xtermRef.current = term
    fitAddonRef.current = fitAddon

    // Connect WebSocket
    const ws = new WebSocket(api.getTerminalWebSocketUrl())

    ws.onopen = () => {
      console.log('WebSocket connected')
      setIsConnected(true)
      // On connection, resize the terminal
      setTimeout(() => handleResize(), 1)
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.type === 'output') {
        term.write(data.data)
      } else if (data.type === 'connected') {
        console.log('Terminal session:', data.session_id)
      }
    }

    ws.onclose = () => {
      console.log('WebSocket disconnected')
      setIsConnected(false)
      term.writeln('\r\n\x1b[31mConnection closed\x1b[0m')
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    wsRef.current = ws

    // Handle terminal input
    term.onData((data) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'input', data }))
      }

      // Track current input for suggestions
      if (data === '\r' || data === '\n') {
        setCurrentInput('')
        setSuggestions([])
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
        }
      } else if (data === '\x7f') { // Backspace
        setCurrentInput(prev => {
          const newInput = prev.slice(0, -1)
          // Debounce suggestions
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
          }
          debounceTimerRef.current = setTimeout(() => {
            fetchSuggestions(newInput)
          }, 300)
          return newInput
        })
      } else if (data === '\t') { // Tab key - accept suggestion
        if (suggestions.length > 0 && currentInput) {
          const selected = suggestions[selectedIndex]
          const completion = selected.command.substring(currentInput.length)
          if (completion) {
            ws.send(JSON.stringify({ type: 'input', data: completion }))
            setCurrentInput(selected.command)
          }
          setSuggestions([])
        }
      } else if (data === '\x1b[A') { // Up arrow - navigate suggestions
        setSelectedIndex(prev => Math.max(0, prev - 1))
      } else if (data === '\x1b[B') { // Down arrow - navigate suggestions
        setSelectedIndex(prev => Math.min(suggestions.length - 1, prev + 1))
      } else if (data.length === 1 && data >= ' ') { // Regular character
        setCurrentInput(prev => {
          const newInput = prev + data
          // Debounce suggestions
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
          }
          debounceTimerRef.current = setTimeout(() => {
            fetchSuggestions(newInput)
          }, 300)
          return newInput
        })
      }
    })

    // Fetch AI suggestions
    const fetchSuggestions = async (input: string) => {
      if (!input.trim() || input.endsWith('\n') || input.endsWith('\r')) {
        setSuggestions([])
        return
      }

      try {
        const response = await api.getAutocompleteSuggestions(input)
        setSuggestions(response.suggestions || [])
        setSelectedIndex(0)
      } catch (error) {
        console.error('Failed to fetch suggestions:', error)
        setSuggestions([])
      }
    }

    // Handle resize
    const handleResize = () => {
      if (fitAddonRef.current && xtermRef.current) {
        try {
          fitAddonRef.current.fit()
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
              type: 'resize',
              cols: xtermRef.current.cols,
              rows: xtermRef.current.rows,
            }))
          }
        } catch (e) {
          console.error("Failed to fit terminal:", e)
        }
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'close' }))
        ws.close()
      }
      term.dispose()
    }
  }, [])

  return (
    <div className="h-full flex flex-col relative cyberpunk-card vhs-effect">
      <div className="p-4 border-b border-cyan-500/30 flex items-center justify-between bg-gradient-to-r from-black/80 to-black/60">
        <div className="flex items-center gap-3">
          <div className={`status-indicator ${isConnected ? 'status-online' : 'status-offline'}`} />
          <span className="text-lg font-bold text-cyan-400 glitch" data-text="NEURAL TERMINAL">
            NEURAL TERMINAL
          </span>
          <div className="text-xs text-green-300 ml-2">
            [{isConnected ? 'LINKED' : 'DISCONNECTED'}]
          </div>
        </div>
        {suggestions.length > 0 && (
          <div className="text-xs text-cyan-300 flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span>AI ASSIST ACTIVE - TAB:COMPLETE ↑↓:NAVIGATE</span>
          </div>
        )}
      </div>
      <div 
        ref={terminalRef} 
        className="flex-1 p-4 terminal-screen relative" 
        onClick={() => xtermRef.current?.focus()}
        style={{
          background: `
            radial-gradient(circle at center, rgba(0, 40, 0, 0.8) 0%, rgba(0, 0, 0, 0.95) 70%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 0, 0.02) 2px,
              rgba(0, 255, 0, 0.02) 4px
            )
          `
        }}
      />
      
      {/* AI Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 max-w-3xl cyberpunk-card z-20 overflow-hidden border border-cyan-500/50">
          <div className="p-3 text-sm font-bold text-cyan-400 border-b border-cyan-500/30 bg-gradient-to-r from-black/90 to-cyan-950/20">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" className="text-cyan-400">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span className="glitch" data-text="NEURAL NETWORK SUGGESTIONS">
                NEURAL NETWORK SUGGESTIONS
              </span>
              <div className="ml-auto text-xs text-green-400">[GROQ ENHANCED]</div>
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto bg-gradient-to-b from-black/80 to-black/90">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`p-4 border-b border-cyan-500/20 last:border-b-0 cursor-pointer transition-all duration-200 ${
                  index === selectedIndex
                    ? 'bg-gradient-to-r from-cyan-950/50 to-pink-950/30 border-l-4 border-l-cyan-400 neon-glow'
                    : 'hover:bg-gradient-to-r hover:from-green-950/20 hover:to-cyan-950/10'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <code className="text-sm font-mono text-cyan-300 block bg-black/40 p-2 rounded border border-cyan-500/30">
                      <span className="text-pink-400">$</span> {suggestion.command}
                    </code>
                    <p className="text-xs text-green-300 mt-2 leading-relaxed">
                      {suggestion.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-20 bg-black/60 rounded-full h-2 overflow-hidden border border-cyan-500/30">
                      <div
                        className="bg-gradient-to-r from-green-400 to-cyan-400 h-full transition-all duration-300"
                        style={{ width: `${suggestion.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-cyan-300 font-mono min-w-[3rem] text-right">
                      {Math.round(suggestion.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
