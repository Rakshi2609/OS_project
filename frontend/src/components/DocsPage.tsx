import { Link } from 'react-router-dom';

const DocsPage = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen">
            {/* Background Effects - No Matrix Rain */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 grid-bg opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/30 to-background-dark"></div>
            </div>

            <div className="relative z-10 flex h-auto min-h-screen w-full flex-col">
                {/* Header */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 px-6 py-4 md:px-20 bg-black/60 backdrop-blur-lg sticky top-0 z-50">
                    <Link to="/" className="flex items-center gap-4 text-primary hover:text-primary/80 transition-colors">
                        <div className="size-6 flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">terminal</span>
                        </div>
                        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] font-mono">SMART_TERMINAL</h2>
                    </Link>
                    <div className="hidden md:flex flex-1 justify-end gap-8">
                        <nav className="flex items-center gap-9">
                            <Link className="text-white/70 hover:text-primary text-sm font-medium transition-colors" to="/terminal">
                                Terminal
                            </Link>
                            <Link className="text-primary text-sm font-medium transition-colors" to="/docs">
                                Docs
                            </Link>
                        </nav>
                        <div className="flex gap-2">
                            <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold tracking-tight">
                                <span className="truncate">System: Online</span>
                            </button>
                        </div>
                    </div>
                    <button className="md:hidden text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="relative px-6 py-12 md:py-16 border-b border-white/10">
                        <div className="max-w-6xl mx-auto">
                            <div className="space-y-4">
                                <h1 className="text-primary text-4xl md:text-6xl font-bold font-mono tracking-tight">
                                    DOCUMENTATION
                                </h1>
                                <p className="text-white/80 text-lg md:text-xl max-w-3xl">
                                    Complete guide to Smart Terminal - AI-powered terminal interface with neural network integration
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Documentation Content */}
                    <section className="max-w-6xl mx-auto px-6 py-12">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Sidebar Navigation */}
                            <aside className="lg:col-span-1">
                                <div className="sticky top-24 space-y-2">
                                    <h3 className="text-primary text-sm font-bold uppercase tracking-wider mb-4">Contents</h3>
                                    <nav className="space-y-1">
                                        {[
                                            { id: 'introduction', label: 'Introduction' },
                                            { id: 'getting-started', label: 'Getting Started' },
                                            { id: 'features', label: 'Features' },
                                            { id: 'api-reference', label: 'API Reference' },
                                            { id: 'terminal-usage', label: 'Terminal Usage' },
                                            { id: 'system-monitoring', label: 'System Monitoring' },
                                            { id: 'ai-integration', label: 'AI Integration' },
                                            { id: 'configuration', label: 'Configuration' },
                                            { id: 'troubleshooting', label: 'Troubleshooting' },
                                        ].map((item) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className="block text-white/70 hover:text-primary text-sm py-2 px-3 rounded transition-colors hover:bg-white/5"
                                            >
                                                {item.label}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </aside>

                            {/* Main Documentation */}
                            <div className="lg:col-span-3 space-y-12">
                                {/* Introduction */}
                                <section id="introduction" className="space-y-4">
                                    <h2 className="text-white text-3xl font-bold border-b border-primary/20 pb-3">Introduction</h2>
                                    <p className="text-white/90 leading-relaxed">
                                        <strong className="text-white">Smart Terminal</strong> is a next-generation, AI-powered terminal interface that combines the power of traditional command-line interfaces with modern web technologies and artificial intelligence. Built with a professional aesthetic, it provides real-time system monitoring, intelligent command suggestions, and seamless terminal operations through an intuitive web interface.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                        {[
                                            { icon: 'psychology', title: 'AI-Powered', desc: 'Intelligent command suggestions' },
                                            { icon: 'speed', title: 'Real-Time', desc: 'Live system monitoring' },
                                            { icon: 'web', title: 'Modern UI', desc: 'Beautiful web interface' },
                                            { icon: 'terminal', title: 'Full PTY', desc: 'Complete terminal emulation' },
                                        ].map((feature) => (
                                            <div key={feature.title} className="flex gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                                                <span className="material-symbols-outlined text-primary text-2xl">{feature.icon}</span>
                                                <div>
                                                    <h4 className="text-white font-semibold">{feature.title}</h4>
                                                    <p className="text-white/70 text-sm">{feature.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Getting Started */}
                                <section id="getting-started" className="space-y-4">
                                    <h2 className="text-white text-3xl font-bold border-b border-primary/20 pb-3">Getting Started</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-white text-xl font-semibold mb-3 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary">check_circle</span>
                                                Prerequisites
                                            </h3>
                                            <ul className="space-y-2 text-white/90">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-primary mt-1">•</span>
                                                    <span><strong className="text-white">Node.js</strong> 18.0 or higher</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-primary mt-1">•</span>
                                                    <span><strong className="text-white">Python</strong> 3.9 or higher</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-primary mt-1">•</span>
                                                    <span><strong className="text-white">npm</strong> or <strong className="text-white">yarn</strong> package manager</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-primary mt-1">•</span>
                                                    <span><strong className="text-white">Git</strong> for version control</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-white text-xl font-semibold mb-3 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary">download</span>
                                                Installation
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="bg-black/40 rounded-lg p-4 border border-primary/20">
                                                    <p className="text-white/70 text-sm mb-2">1. Clone the Repository</p>
                                                    <code className="block bg-black/60 p-3 rounded text-primary font-mono text-sm">
                                                        git clone https://github.com/nirvik34/OS_project.git<br />
                                                        cd OS_project
                                                    </code>
                                                </div>
                                                <div className="bg-black/40 rounded-lg p-4 border border-primary/20">
                                                    <p className="text-white/70 text-sm mb-2">2. Install Backend Dependencies</p>
                                                    <code className="block bg-black/60 p-3 rounded text-primary font-mono text-sm">
                                                        pip install -r requirements.txt
                                                    </code>
                                                </div>
                                                <div className="bg-black/40 rounded-lg p-4 border border-primary/20">
                                                    <p className="text-white/70 text-sm mb-2">3. Install Frontend Dependencies</p>
                                                    <code className="block bg-black/60 p-3 rounded text-primary font-mono text-sm">
                                                        cd frontend && npm install
                                                    </code>
                                                </div>
                                                <div className="bg-black/40 rounded-lg p-4 border border-primary/20">
                                                    <p className="text-white/70 text-sm mb-2">4. Start the Application</p>
                                                    <code className="block bg-black/60 p-3 rounded text-primary font-mono text-sm">
                                                        ./start.sh
                                                    </code>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-lg p-4">
                                            <div className="flex gap-3">
                                                <span className="material-symbols-outlined text-cyber-cyan">info</span>
                                                <div>
                                                    <h4 className="text-cyber-cyan font-semibold mb-1">Access Points</h4>
                                                    <ul className="text-white/90 text-sm space-y-1">
                                                        <li><strong>Frontend:</strong> http://localhost:5173</li>
                                                        <li><strong>Backend API:</strong> http://localhost:8000</li>
                                                        <li><strong>API Docs:</strong> http://localhost:8000/docs</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Features */}
                                <section id="features" className="space-y-4">
                                    <h2 className="text-white text-3xl font-bold border-b border-primary/20 pb-3">Features</h2>

                                    <div className="grid grid-cols-1 gap-6">
                                        {[
                                            {
                                                icon: 'terminal',
                                                title: 'Neural Terminal Interface',
                                                color: 'primary',
                                                features: [
                                                    'Real-time command execution',
                                                    'Full PTY support',
                                                    'WebSocket communication',
                                                    'Terminal resizing',
                                                    'Copy/paste support',
                                                ],
                                            },
                                            {
                                                icon: 'psychology',
                                                title: 'AI-Powered Suggestions',
                                                color: 'cyber-cyan',
                                                features: [
                                                    'Contextual command recommendations',
                                                    'Confidence scoring',
                                                    'Real-time updates',
                                                    'Tab completion',
                                                    'GROQ integration',
                                                ],
                                            },
                                            {
                                                icon: 'monitoring',
                                                title: 'System Monitoring',
                                                color: 'cyber-magenta',
                                                features: [
                                                    'CPU usage tracking',
                                                    'Memory monitoring',
                                                    'Disk usage visualization',
                                                    'Live updates every 2s',
                                                    'Alert system',
                                                ],
                                            },
                                        ].map((feature) => (
                                            <div key={feature.title} className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-primary/30 transition-all">
                                                <div className="flex items-start gap-4">
                                                    <div className={`size-12 rounded-lg bg-${feature.color}/10 flex items-center justify-center text-${feature.color} shrink-0`}>
                                                        <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-white text-xl font-bold mb-3">{feature.title}</h3>
                                                        <ul className="space-y-2">
                                                            {feature.features.map((item) => (
                                                                <li key={item} className="flex items-start gap-2 text-white/90 text-sm">
                                                                    <span className="text-primary mt-1">✓</span>
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* API Reference */}
                                <section id="api-reference" className="space-y-4">
                                    <h2 className="text-white text-3xl font-bold border-b border-primary/20 pb-3">API Reference</h2>

                                    <div className="space-y-6">
                                        <div className="bg-black/40 rounded-lg p-4 border border-primary/20">
                                            <p className="text-white/70 text-sm mb-2">Base URL</p>
                                            <code className="block bg-black/60 p-3 rounded text-primary font-mono">
                                                http://localhost:8000/api
                                            </code>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-white text-xl font-semibold">Endpoints</h3>

                                            {/* WebSocket */}
                                            <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                                                <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-2 py-1 bg-cyber-cyan/20 text-cyber-cyan text-xs font-mono rounded">WS</span>
                                                        <code className="text-white font-mono text-sm">/api/terminal/ws</code>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <p className="text-white/90 text-sm mb-3">Connect to terminal WebSocket for real-time command execution</p>
                                                    <div className="bg-black/60 rounded p-3">
                                                        <pre className="text-primary font-mono text-xs overflow-x-auto">
                                                            {`// Client → Server
{
  "type": "input",
  "data": "ls -la\\n"
}

// Server → Client
{
  "type": "output",
  "data": "file1.txt\\nfile2.txt\\n"
}`}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* AI Autocomplete */}
                                            <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                                                <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-mono rounded">POST</span>
                                                        <code className="text-white font-mono text-sm">/api/ai/autocomplete</code>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <p className="text-white/90 text-sm mb-3">Get AI-powered command suggestions</p>
                                                    <div className="bg-black/60 rounded p-3">
                                                        <pre className="text-primary font-mono text-xs overflow-x-auto">
                                                            {`{
  "suggestions": [
    {
      "command": "git commit -m",
      "description": "Commit staged changes",
      "confidence": 0.95
    }
  ]
}`}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* System Resources */}
                                            <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                                                <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-2 py-1 bg-cyber-magenta/20 text-cyber-magenta text-xs font-mono rounded">GET</span>
                                                        <code className="text-white font-mono text-sm">/api/resources/system</code>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <p className="text-white/90 text-sm mb-3">Get current system resource usage</p>
                                                    <div className="bg-black/60 rounded p-3">
                                                        <pre className="text-primary font-mono text-xs overflow-x-auto">
                                                            {`{
  "cpu": { "percent": 45.2, "cores": 8 },
  "memory": { "used": 9126805504, "total": 17179869184 },
  "disk": { "used": 274877906944, "total": 549755813888 }
}`}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Terminal Usage */}
                                <section id="terminal-usage" className="space-y-4">
                                    <h2 className="text-white text-3xl font-bold border-b border-primary/20 pb-3">Terminal Usage</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-white text-xl font-semibold mb-3">Keyboard Shortcuts</h3>
                                            <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                                                <table className="w-full">
                                                    <thead className="bg-white/5">
                                                        <tr>
                                                            <th className="text-left px-4 py-3 text-primary text-sm font-semibold">Shortcut</th>
                                                            <th className="text-left px-4 py-3 text-primary text-sm font-semibold">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-white/10">
                                                        {[
                                                            { key: 'Ctrl + C', action: 'Interrupt current command' },
                                                            { key: 'Ctrl + D', action: 'Exit terminal (EOF)' },
                                                            { key: 'Ctrl + L', action: 'Clear screen' },
                                                            { key: 'Tab', action: 'Accept AI suggestion' },
                                                            { key: '↑ / ↓', action: 'Navigate suggestions' },
                                                            { key: 'Ctrl + R', action: 'Search command history' },
                                                        ].map((shortcut) => (
                                                            <tr key={shortcut.key}>
                                                                <td className="px-4 py-3">
                                                                    <code className="bg-black/60 px-2 py-1 rounded text-primary font-mono text-sm">
                                                                        {shortcut.key}
                                                                    </code>
                                                                </td>
                                                                <td className="px-4 py-3 text-white/90 text-sm">{shortcut.action}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                                            <div className="flex gap-3">
                                                <span className="material-symbols-outlined text-primary">tips_and_updates</span>
                                                <div>
                                                    <h4 className="text-primary font-semibold mb-2">AI Assistance Workflow</h4>
                                                    <ol className="text-white/90 text-sm space-y-1 list-decimal list-inside">
                                                        <li>Start typing a command</li>
                                                        <li>Wait 300ms for AI suggestions to appear</li>
                                                        <li>Use ↑ and ↓ to navigate suggestions</li>
                                                        <li>Press Tab to accept the selected suggestion</li>
                                                        <li>Press Enter to execute</li>
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* System Monitoring */}
                                <section id="system-monitoring" className="space-y-4">
                                    <h2 className="text-white text-3xl font-bold border-b border-primary/20 pb-3">System Monitoring</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { metric: 'CPU', threshold: '80%', critical: '95%', update: '2s' },
                                            { metric: 'Memory', threshold: '80%', critical: '90%', update: '2s' },
                                            { metric: 'Disk', threshold: '85%', critical: '95%', update: '2s' },
                                        ].map((item) => (
                                            <div key={item.metric} className="bg-white/5 rounded-lg border border-white/10 p-4">
                                                <h4 className="text-white font-semibold mb-3">{item.metric} Monitoring</h4>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-white/70">Warning:</span>
                                                        <span className="text-yellow-400">{item.threshold}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-white/70">Critical:</span>
                                                        <span className="text-red-400">{item.critical}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-white/70">Update:</span>
                                                        <span className="text-primary">{item.update}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* AI Integration */}
                                <section id="ai-integration" className="space-y-4">
                                    <h2 className="text-white text-3xl font-bold border-b border-primary/20 pb-3">AI Integration</h2>

                                    <div className="space-y-6">
                                        <p className="text-white/90 leading-relaxed">
                                            Smart Terminal uses GROQ's neural network for intelligent command suggestions.
                                        </p>

                                        <div className="bg-black/40 rounded-lg p-4 border border-primary/20">
                                            <p className="text-white/70 text-sm mb-2">Configuration</p>
                                            <code className="block bg-black/60 p-3 rounded text-primary font-mono text-sm">
                                                GROQ_API_KEY=your_api_key_here
                                            </code>
                                        </div>

                                        <div>
                                            <h3 className="text-white text-xl font-semibold mb-3">How It Works</h3>
                                            <div className="space-y-3">
                                                {[
                                                    { step: 1, title: 'Input Analysis', desc: 'System analyzes your typing' },
                                                    { step: 2, title: 'Context Gathering', desc: 'Collects directory and command history' },
                                                    { step: 3, title: 'Neural Processing', desc: 'GROQ generates suggestions' },
                                                    { step: 4, title: 'Confidence Scoring', desc: 'Each suggestion scored 0-1' },
                                                    { step: 5, title: 'Real-time Display', desc: 'Suggestions appear in UI' },
                                                ].map((item) => (
                                                    <div key={item.step} className="flex gap-3 items-start">
                                                        <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                                            {item.step}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white font-semibold">{item.title}</h4>
                                                            <p className="text-white/70 text-sm">{item.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Configuration */}
                                <section id="configuration" className="space-y-4">
                                    <h2 className="text-white text-3xl font-bold border-b border-primary/20 pb-3">Configuration</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-white text-xl font-semibold mb-3">Backend Configuration</h3>
                                            <div className="bg-black/40 rounded-lg p-4 border border-primary/20">
                                                <pre className="text-primary font-mono text-sm overflow-x-auto">
                                                    {`# backend/app/config.py
class Settings:
    app_name: str = "Smart Terminal"
    debug: bool = True
    backend_host: str = "localhost"
    backend_port: int = 8000
    cors_origins: list = ["http://localhost:5173"]
    groq_api_key: str = os.getenv("GROQ_API_KEY", "")`}
                                                </pre>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-white text-xl font-semibold mb-3">Frontend Configuration</h3>
                                            <div className="bg-black/40 rounded-lg p-4 border border-primary/20">
                                                <pre className="text-primary font-mono text-sm overflow-x-auto">
                                                    {`// frontend/tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: "#0df20d",
      "cyber-cyan": "#00f3ff",
      "cyber-magenta": "#ff00ff",
    }
  }
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Troubleshooting */}
                                <section id="troubleshooting" className="space-y-4">
                                    <h2 className="text-white text-3xl font-bold border-b border-primary/20 pb-3">Troubleshooting</h2>

                                    <div className="space-y-4">
                                        {[
                                            {
                                                issue: 'WebSocket Connection Failed',
                                                symptom: 'Terminal shows "Connection closed" message',
                                                solution: 'Check if backend is running at http://localhost:8000/health',
                                            },
                                            {
                                                issue: 'AI Suggestions Not Appearing',
                                                symptom: 'No suggestions show up when typing',
                                                solution: 'Verify GROQ API key is set in .env file',
                                            },
                                            {
                                                issue: 'Port Already in Use',
                                                symptom: 'Error: "Address already in use"',
                                                solution: 'Kill the process using the port or use a different port',
                                            },
                                        ].map((item) => (
                                            <div key={item.issue} className="bg-white/5 rounded-lg border border-white/10 p-4">
                                                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-red-400">error</span>
                                                    {item.issue}
                                                </h4>
                                                <div className="space-y-2 text-sm">
                                                    <div>
                                                        <span className="text-white/70">Symptom: </span>
                                                        <span className="text-white/90">{item.symptom}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-white/70">Solution: </span>
                                                        <span className="text-primary">{item.solution}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-lg p-4 mt-6">
                                        <div className="flex gap-3">
                                            <span className="material-symbols-outlined text-cyber-cyan">support</span>
                                            <div>
                                                <h4 className="text-cyber-cyan font-semibold mb-2">Need More Help?</h4>
                                                <ul className="text-white/90 text-sm space-y-1">
                                                    <li>• Check GitHub Issues: <a href="https://github.com/nirvik34/OS_project/issues" className="text-primary hover:underline">github.com/nirvik34/OS_project</a></li>
                                                    <li>• Review API Documentation: <a href="http://localhost:8000/docs" className="text-primary hover:underline">localhost:8000/docs</a></li>
                                                    <li>• Check browser console for frontend errors</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t border-white/5 px-6 py-12 md:px-20 mt-20">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-4 text-primary/50">
                            <span className="material-symbols-outlined">terminal</span>
                            <span className="font-mono text-sm">© 2024 SMART_TERMINAL_INC</span>
                        </div>
                        <div className="flex gap-8">
                            <a className="text-white/30 hover:text-white transition-colors text-xs uppercase tracking-widest font-mono" href="#">
                                Twitter
                            </a>
                            <a className="text-white/30 hover:text-white transition-colors text-xs uppercase tracking-widest font-mono" href="#">
                                GitHub
                            </a>
                            <a className="text-white/30 hover:text-white transition-colors text-xs uppercase tracking-widest font-mono" href="#">
                                Discord
                            </a>
                            <a className="text-white/30 hover:text-white transition-colors text-xs uppercase tracking-widest font-mono" href="#">
                                Status
                            </a>
                        </div>
                        <div className="text-white/20 text-[10px] font-mono">ENCRYPTION: ACTIVE | LOC: NEURAL_CLUSTER_01</div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default DocsPage;
