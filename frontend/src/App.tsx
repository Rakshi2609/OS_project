import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "sonner";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import DocsPage from "./components/DocsPage";

function App() {
  return (
    <Router>
      <div className="dark min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/terminal" element={
            <>
              <div className="p-4 md:p-8 bg-background-dark min-h-screen">
                <header className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl md:text-4xl font-bold glitch-text text-primary" data-text="Smart Terminal">
                    Smart Terminal
                  </h1>
                  <div className="text-xs md:text-sm text-white/70">
                    <p>STATUS: <span className="text-primary">ONLINE</span></p>
                    <p>UID: <span className="text-cyber-cyan">777-B47-32</span></p>
                  </div>
                </header>
                <main>
                  <Dashboard />
                </main>
              </div>
            </>
          } />
          <Route path="/dashboard" element={
            <>
              <div className="p-4 md:p-8 bg-background-dark min-h-screen">
                <header className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl md:text-4xl font-bold glitch-text text-primary" data-text="Smart Terminal">
                    Smart Terminal
                  </h1>
                  <div className="text-xs md:text-sm text-white/70">
                    <p>STATUS: <span className="text-primary">ONLINE</span></p>
                    <p>UID: <span className="text-cyber-cyan">777-B47-32</span></p>
                  </div>
                </header>
                <main>
                  <Dashboard />
                </main>
              </div>
            </>
          } />
          <Route path="/history" element={
            <>
              <div className="p-4 md:p-8 bg-background-dark min-h-screen">
                <header className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl md:text-4xl font-bold glitch-text text-primary" data-text="Smart Terminal">
                    Smart Terminal
                  </h1>
                  <div className="text-xs md:text-sm text-white/70">
                    <p>STATUS: <span className="text-primary">ONLINE</span></p>
                    <p>UID: <span className="text-cyber-cyan">777-B47-32</span></p>
                  </div>
                </header>
                <main>
                  <Dashboard />
                </main>
              </div>
            </>
          } />
        </Routes>
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
