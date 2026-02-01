import React from 'react';
import { Link } from 'react-router-dom';
import BinaryRain from './BinaryRain';

const LandingPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white selection:bg-primary selection:text-black overflow-x-hidden">
      {/* Binary Rain Effect */}
      <BinaryRain />

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark"></div>
        <div className="scanline"></div>
      </div>

      <div className="relative z-10 flex h-auto min-h-screen w-full flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 px-6 py-4 md:px-20 bg-black/60 backdrop-blur-lg sticky top-0 z-50">
          <div className="flex items-center gap-4 text-primary">
            <div className="size-6 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">terminal</span>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] font-mono">SMART_TERMINAL</h2>
          </div>
          <div className="hidden md:flex flex-1 justify-end gap-8">
            <nav className="flex items-center gap-9">
              <Link className="text-white/70 hover:text-primary text-sm font-medium transition-colors" to="/terminal">
                Terminal
              </Link>
              <a className="text-white/70 hover:text-primary text-sm font-medium transition-colors" href="#">
                Docs
              </a>
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
          <section className="relative px-6 py-12 md:py-24 flex flex-col items-center">
            <div className="max-w-4xl w-full text-center space-y-8">
              <div className="space-y-4">
                <h1 className="glitch-text text-primary text-5xl md:text-8xl font-bold font-mono tracking-tighter uppercase">
                  SMART TERMINAL
                </h1>
                <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light">
                  The AI-powered command center for the next generation of infrastructure. Real-time telemetry, automated healing, and neural-link processing.
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Link
                  to="/terminal"
                  className="w-full md:w-auto flex min-w-[200px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-gradient-to-r from-primary to-cyber-cyan text-background-dark text-lg font-bold shadow-[0_0_20px_rgba(13,242,13,0.3)] hover:scale-105 transition-transform"
                >
                  Launch Terminal
                </Link>
                <button className="w-full md:w-auto flex min-w-[200px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-white/5 border border-white/10 text-white text-lg font-semibold hover:bg-white/10 transition-colors">
                  View Documentation
                </button>
              </div>

              {/* Terminal Preview */}
              <div className="mt-16 w-full max-w-3xl mx-auto rounded-xl border border-primary/30 bg-[#050505]/90 backdrop-blur-xl overflow-hidden terminal-glow text-left font-mono">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-500/50"></div>
                    <div className="size-3 rounded-full bg-yellow-500/50"></div>
                    <div className="size-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest ml-4">
                    root@smart-terminal:~
                  </div>
                </div>
                <div className="p-6 space-y-2 text-sm md:text-base bg-black/30">
                  <div className="flex gap-3">
                    <span className="text-primary">$</span>
                    <span className="text-white">init_system --neural --secure</span>
                  </div>
                  <div className="text-primary/70 animate-pulse">Initializing core modules...</div>
                  <div className="flex gap-3">
                    <span className="text-primary/70">[OK]</span>
                    <span className="text-white/50">Neural weights loaded (v2.4.0-stable)</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary/70">[OK]</span>
                    <span className="text-white/50">Connection established: TLS 1.3 | AES-256</span>
                  </div>
                  <div className="flex gap-3 text-cyber-cyan">
                    <span className="text-cyber-cyan/70">[READY]</span>
                    <span>Awaiting command input_</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* System Capabilities */}
          <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="flex flex-col gap-4 mb-12">
              <h2 className="text-white text-4xl font-bold tracking-tight">System Capabilities</h2>
              <p className="text-white/50 text-lg max-w-xl">
                Advanced orchestration tools designed for high-availability environments and complex data flows.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md p-8 transition-all neon-border-hover group">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-white text-xl font-bold">Neural Core</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Self-learning algorithms that optimize your system architecture based on real-time traffic patterns and usage metrics.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md p-8 transition-all neon-border-hover group">
                <div className="size-12 rounded-lg bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan group-hover:bg-cyber-cyan group-hover:text-black transition-colors">
                  <span className="material-symbols-outlined">query_stats</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-white text-xl font-bold">Live Telemetry</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    High-fidelity visualization of every data packet moving through your infrastructure with zero overhead monitoring.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md p-8 transition-all neon-border-hover group">
                <div className="size-12 rounded-lg bg-cyber-magenta/10 flex items-center justify-center text-cyber-magenta group-hover:bg-cyber-magenta group-hover:text-black transition-colors">
                  <span className="material-symbols-outlined">encrypted</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-white text-xl font-bold">Quantum Security</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Post-quantum encryption protocols ensure your nodes remain invisible to unauthorized actors across any network.
                  </p>
                </div>
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

export default LandingPage;