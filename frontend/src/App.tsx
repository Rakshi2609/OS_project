import { useState } from 'react'
import Terminal from './components/Terminal'
import Dashboard from './components/Dashboard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'

function App() {
  const [activeTab, setActiveTab] = useState('terminal')

  return (
    <div className="h-screen w-screen bg-background p-4">
      <div className="h-full flex flex-col">
        <header className="mb-4">
          <h1 className="text-3xl font-bold text-primary">Smart Terminal</h1>
          <p className="text-sm text-muted-foreground">AI-powered terminal with resource monitoring</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mb-4">
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="terminal" className="flex-1 mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
              <div className="lg:col-span-2">
                <Terminal />
              </div>
              <div className="hidden lg:block">
                <Dashboard compact />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="dashboard" className="flex-1 mt-0">
            <Dashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
