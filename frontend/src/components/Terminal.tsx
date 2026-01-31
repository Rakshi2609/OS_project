import { useEffect, useRef, useState } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import '@xterm/xterm/css/xterm.css'
import { Card } from './ui/card'
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
    <Card className="h-full flex flex-col relative">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm font-medium">Terminal</span>
        </div>
        {suggestions.length > 0 && (
          <span className="text-xs text-muted-foreground">
            Press Tab to complete, ↑↓ to navigate
          </span>
        )}
      </div>
      <div ref={terminalRef} className="flex-1 p-2" onClick={() => xtermRef.current?.focus()} />
      
      {/* AI Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 max-w-2xl bg-background border rounded-lg shadow-lg z-10 overflow-hidden">
          <div className="p-2 text-xs font-semibold text-muted-foreground border-b bg-muted/50">
            🤖 AI Suggestions (powered by Groq)
          </div>
          <div className="max-h-64 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`p-3 border-b last:border-b-0 cursor-pointer transition-colors ${
                  index === selectedIndex
                    ? 'bg-primary/10 border-l-4 border-l-primary'
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <code className="text-sm font-mono text-foreground block">
                      {suggestion.command}
                    </code>
                    <p className="text-xs text-muted-foreground mt-1">
                      {suggestion.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <div className="w-16 bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all"
                        style={{ width: `${suggestion.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {Math.round(suggestion.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
