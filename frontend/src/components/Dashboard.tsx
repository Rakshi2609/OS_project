import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { api } from '@/lib/api'

interface DashboardProps {
  compact?: boolean
}

interface SystemResources {
  cpu_percent: number
  memory_percent: number
  memory_used_gb: number
  memory_total_gb: number
  disk_percent: number
  disk_used_gb: number
  disk_total_gb: number
  timestamp: string
}

export default function Dashboard({ compact = false }: DashboardProps) {
  const [resources, setResources] = useState<SystemResources | null>(null)
  const [history, setHistory] = useState<SystemResources[]>([])

  useEffect(() => {
    // Connect to SSE stream
    const eventSource = new EventSource(api.getSystemResourcesStream())

    eventSource.onmessage = (event) => {
      const data: SystemResources = JSON.parse(event.data)
      setResources(data)
      
      setHistory(prev => {
        const newHistory = [...prev, data]
        // Keep last 30 data points
        return newHistory.slice(-30)
      })
    }

    eventSource.onerror = (error) => {
      console.error('SSE error:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  if (!resources) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Loading resources...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 h-full overflow-auto">
      {/* System Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">System Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* CPU */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">CPU</span>
              <Badge variant="outline">{resources.cpu_percent.toFixed(1)}%</Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${resources.cpu_percent}%` }}
              />
            </div>
          </div>

          {/* Memory */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Memory</span>
              <Badge variant="outline">
                {resources.memory_used_gb.toFixed(1)} / {resources.memory_total_gb.toFixed(1)} GB
              </Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${resources.memory_percent}%` }}
              />
            </div>
          </div>

          {/* Disk */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Disk</span>
              <Badge variant="outline">
                {resources.disk_used_gb.toFixed(0)} / {resources.disk_total_gb.toFixed(0)} GB
              </Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${resources.disk_percent}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CPU History Chart */}
      {!compact && history.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">CPU Usage History</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                  hide
                />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleTimeString()}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'CPU']}
                />
                <Line 
                  type="monotone" 
                  dataKey="cpu_percent" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Memory History Chart */}
      {!compact && history.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Memory Usage History</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                  hide
                />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleTimeString()}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Memory']}
                />
                <Line 
                  type="monotone" 
                  dataKey="memory_percent" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
