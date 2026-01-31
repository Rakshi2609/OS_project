import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-x-hidden relative">
      {/* Neural Network Background */}
      <div className="fixed inset-0 opacity-20 z-0">
        <svg width="100%" height="100%" className="w-full h-full">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
            <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00ff00" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#00ff00" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Moving dots */}
          {Array.from({ length: 20 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * window.innerWidth}
              cy={Math.random() * window.innerHeight}
              r="2"
              fill="#00ff00"
              className="animate-pulse"
              style={{
                animation: `pulse 2s infinite ${i * 0.1}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-8">
          {/* Title with Glitch Effect */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 relative">
            <span className="glitch-text neon-text" data-text="TERMINAL">
              TERMINAL
            </span>
            <div className="text-2xl md:text-3xl text-cyan-400 mt-4 tracking-wider">
              NEURAL INTERFACE v2.0
            </div>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Enter the matrix of advanced terminal computing. 
            <span className="text-magenta-400"> AI-powered</span> command execution with 
            <span className="text-cyan-400"> real-time monitoring</span> and 
            <span className="text-green-400"> neural intelligence</span>.
          </p>

          {/* Stats Display */}
          <div className="flex justify-center space-x-12 my-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">∞</div>
              <div className="text-sm text-gray-400">PROCESSING POWER</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">AI</div>
              <div className="text-sm text-gray-400">NEURAL ASSIST</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-magenta-400">24/7</div>
              <div className="text-sm text-gray-400">SYSTEM MONITOR</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-6">
          <Link
            to="/terminal"
            className="block px-12 py-4 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold text-xl rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/50 hover:glow-green animate-pulse-slow"
          >
            ACCESS TERMINAL
          </Link>
          
          <div className="flex justify-center space-x-6">
            <Link
              to="/dashboard"
              className="px-8 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 rounded hover:shadow-md hover:shadow-cyan-400/50"
            >
              System Monitor
            </Link>
            <Link
              to="/history"
              className="px-8 py-3 border border-magenta-400 text-magenta-400 hover:bg-magenta-400 hover:text-black transition-all duration-300 rounded hover:shadow-md hover:shadow-magenta-400/50"
            >
              Command History
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-6xl">
          <div className="cyber-card bg-gray-900/80 border border-green-400/30 rounded-lg p-6 hover:border-green-400 transition-all duration-300">
            <div className="text-green-400 text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-green-400 mb-3">Lightning Fast</h3>
            <p className="text-gray-300">
              Optimized PTY processes with real-time I/O handling for maximum performance.
            </p>
          </div>

          <div className="cyber-card bg-gray-900/80 border border-cyan-400/30 rounded-lg p-6 hover:border-cyan-400 transition-all duration-300">
            <div className="text-cyan-400 text-3xl mb-4">🧠</div>
            <h3 className="text-xl font-bold text-cyan-400 mb-3">AI Intelligence</h3>
            <p className="text-gray-300">
              Smart command suggestions powered by advanced neural networks and machine learning.
            </p>
          </div>

          <div className="cyber-card bg-gray-900/80 border border-magenta-400/30 rounded-lg p-6 hover:border-magenta-400 transition-all duration-300">
            <div className="text-magenta-400 text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-magenta-400 mb-3">Real-time Analytics</h3>
            <p className="text-gray-300">
              Complete system monitoring with live resource tracking and performance metrics.
            </p>
          </div>
        </div>

        {/* Terminal Preview */}
        <div className="mt-20 w-full max-w-4xl">
          <div className="cyber-card bg-black border border-green-400/50 rounded-lg overflow-hidden">
            <div className="bg-gray-800/90 border-b border-green-400/30 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-gray-400 ml-4">neural-terminal@matrix:~$</span>
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">$</span>
                <span className="text-white typing-animation">system --status --all</span>
              </div>
              <div className="text-cyan-400">
                ╔══════════════════════════════════════╗
              </div>
              <div className="text-cyan-400">
                ║ SYSTEM STATUS: <span className="text-green-400">OPERATIONAL</span>        ║
              </div>
              <div className="text-cyan-400">
                ║ AI CORE: <span className="text-green-400">ONLINE</span>                   ║
              </div>
              <div className="text-cyan-400">
                ║ NEURAL NET: <span className="text-green-400">CONNECTED</span>             ║
              </div>
              <div className="text-cyan-400">
                ╚══════════════════════════════════════╝
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <span className="text-green-400">$</span>
                <span className="text-white">_</span>
                <span className="animate-pulse text-green-400">█</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-500">
          <div className="space-y-2">
            <p>© 2024 Neural Terminal Systems. All rights reserved.</p>
            <p className="text-sm">Powered by cyberpunk aesthetics and future technology.</p>
          </div>
        </footer>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s infinite ease-in-out ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;