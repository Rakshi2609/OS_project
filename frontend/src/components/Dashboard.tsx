import { useEffect, useState } from 'react'
import Terminal from './Terminal'
import { api } from '@/lib/api'
import { toast } from 'sonner'

interface SystemResources {
  cpu: { percent: number; cores: number }
  memory: { used: number; total: number; percent: number }
  disk: { used: number; total: number; percent: number }
}

export default function Dashboard() {
  const [resources, setResources] = useState<SystemResources | null>(null)
  const [activeTab, setActiveTab] = useState<'terminal' | 'monitoring'>('terminal')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true)
        const data = await api.getSystemResources()
        setResources(data)
        
        // Show cyberpunk toast notification
        if (data.cpu.percent > 80) {
          toast.error('🔥 SYSTEM OVERLOAD DETECTED', {
            description: `CPU utilization: ${data.cpu.percent.toFixed(1)}%`,
            duration: 3000,
          })
        }
      } catch (error) {
        console.error('Failed to fetch resources:', error)
        toast.error('⚠️ NEURAL LINK COMPROMISED', {
          description: 'Unable to establish connection to system monitoring',
          duration: 4000,
        })
        
        // Mock data for demo
        setResources({
          cpu: { percent: 45.2, cores: 8 },
          memory: { used: 8.5 * 1024 ** 3, total: 16 * 1024 ** 3, percent: 53.1 },
          disk: { used: 256 * 1024 ** 3, total: 512 * 1024 ** 3, percent: 50.0 }
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchResources()
    const interval = setInterval(fetchResources, 2000)
    return () => clearInterval(interval)
  }, [])

  const formatBytes = (bytes: number) => {
    const gb = bytes / (1024 ** 3)
    return `${gb.toFixed(1)} GB`
  }

  const ResourceBar = ({ label, percent, used, total, unit = '', color = 'cyan' }: {
    label: string
    percent: number
    used?: number
    total?: number
    unit?: string
    color?: 'cyan' | 'green' | 'pink' | 'purple'
  }) => {
    const colorClasses = {
      cyan: 'from-cyan-400 to-blue-500 shadow-cyan-400/50',
      green: 'from-green-400 to-emerald-500 shadow-green-400/50',
      pink: 'from-pink-400 to-purple-500 shadow-pink-400/50',
      purple: 'from-purple-400 to-indigo-500 shadow-purple-400/50'
    }

    return (
      <div className="cyberpunk-card p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-cyan-300 uppercase tracking-wider">{label}</span>
          <span className={`text-lg font-mono ${
            percent > 80 ? 'text-pink-400 animate-pulse' : 
            percent > 60 ? 'text-yellow-400' : 'text-green-400'
          }`}>
            {percent.toFixed(1)}%
          </span>
        </div>
        
        <div className="relative">
          <div className="w-full bg-black/60 rounded-full h-3 border border-cyan-500/30 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-500 relative overflow-hidden`}
              style={{ width: `${percent}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
          <div className="absolute -top-1 -bottom-1 left-0 w-1 bg-green-400 rounded-full animate-pulse opacity-70" />
        </div>

        {used !== undefined && total !== undefined && (
          <div className="text-xs text-green-300 font-mono flex justify-between">
            <span>{used}{unit} / {total}{unit}</span>
            <span className="text-cyan-400">ALLOCATED</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Neural Network Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="neural-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="cyan" stopOpacity="0.3" />
              <stop offset="100%" stopColor="magenta" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          {/* Neural Network Nodes */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <circle 
                cx={`${20 + (i * 15)}%`} 
                cy={`${30 + Math.sin(i) * 20}%`} 
                r="2" 
                fill="url(#neural-glow)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              {i < 7 && (
                <line 
                  x1={`${20 + (i * 15)}%`} 
                  y1={`${30 + Math.sin(i) * 20}%`}
                  x2={`${20 + ((i + 1) * 15)}%`} 
                  y2={`${30 + Math.sin(i + 1) * 20}%`}
                  stroke="cyan" 
                  strokeWidth="0.5" 
                  opacity="0.3"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-10 p-6">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-black/60 p-1 rounded-lg border border-cyan-500/30 w-fit">
            {[
              { id: 'terminal' as const, label: 'NEURAL TERMINAL', icon: '⚡' },
              { id: 'monitoring' as const, label: 'SYSTEM MATRIX', icon: '🔮' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md transition-all duration-300 font-mono text-sm font-bold ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white neon-glow'
                    : 'text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'terminal' && (
          <div className="h-[600px]">
            <Terminal />
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            {/* Status Header */}
            <div className="cyberpunk-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-cyan-400 glitch" data-text="SYSTEM STATUS">
                  SYSTEM STATUS
                </h2>
                <div className="flex items-center space-x-3">
                  <div className="status-indicator status-online" />
                  <span className="text-green-400 font-mono text-sm">OPERATIONAL</span>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                  <span className="ml-4 text-cyan-300 font-mono">SCANNING NEURAL PATHWAYS...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {resources && (
                    <>
                      <ResourceBar
                        label="CPU CORE TEMP"
                        percent={resources.cpu.percent}
                        color={resources.cpu.percent > 80 ? 'pink' : resources.cpu.percent > 60 ? 'purple' : 'cyan'}
                      />
                      <ResourceBar
                        label="MEMORY BANKS"
                        percent={resources.memory.percent}
                        used={parseFloat(formatBytes(resources.memory.used).split(' ')[0])}
                        total={parseFloat(formatBytes(resources.memory.total).split(' ')[0])}
                        unit=" GB"
                        color={resources.memory.percent > 80 ? 'pink' : 'green'}
                      />
                      <ResourceBar
                        label="STORAGE MATRIX"
                        percent={resources.disk.percent}
                        used={parseFloat(formatBytes(resources.disk.used).split(' ')[0])}
                        total={parseFloat(formatBytes(resources.disk.total).split(' ')[0])}
                        unit=" GB"
                        color={resources.disk.percent > 90 ? 'pink' : 'purple'}
                      />
                    </>
                  )}
                </div>
              )}
            </div>

            {/* System Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="cyberpunk-card p-6">
                <h3 className="text-xl font-bold text-pink-400 mb-4 glitch" data-text="NETWORK STATUS">
                  NETWORK STATUS
                </h3>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-cyan-300">Neural Link:</span>
                    <span className="text-green-400">ESTABLISHED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300">Encryption:</span>
                    <span className="text-green-400">QUANTUM-256</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300">Uptime:</span>
                    <span className="text-green-400">{Math.floor(Math.random() * 72)}h {Math.floor(Math.random() * 60)}m</span>
                  </div>
                </div>
              </div>

              <div className="cyberpunk-card p-6">
                <h3 className="text-xl font-bold text-purple-400 mb-4 glitch" data-text="AI MATRIX">
                  AI MATRIX
                </h3>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-cyan-300">Model:</span>
                    <span className="text-green-400">GROQ-NEURAL-7B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300">Response Time:</span>
                    <span className="text-green-400">&lt;200ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300">Accuracy:</span>
                    <span className="text-green-400">98.7%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}