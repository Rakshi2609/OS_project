import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "sonner";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import { SVGGrid } from "./components/SVGGrid";

function App() {
  return (
    <Router>
      <div className="bg-black text-green-400 font-mono min-h-screen relative">
        <SVGGrid />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/terminal" element={
              <>
                <div className="p-4 md:p-8">
                  <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold glitch" data-text="Smart Terminal">
                      Smart Terminal
                    </h1>
                    <div className="text-xs md:text-sm">
                      <p>STATUS: <span className="text-green-500">ONLINE</span></p>
                      <p>UID: <span className="text-yellow-400">777-B47-32</span></p>
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
                <div className="p-4 md:p-8">
                  <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold glitch" data-text="Smart Terminal">
                      Smart Terminal
                    </h1>
                    <div className="text-xs md:text-sm">
                      <p>STATUS: <span className="text-green-500">ONLINE</span></p>
                      <p>UID: <span className="text-yellow-400">777-B47-32</span></p>
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
                <div className="p-4 md:p-8">
                  <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold glitch" data-text="Smart Terminal">
                      Smart Terminal
                    </h1>
                    <div className="text-xs md:text-sm">
                      <p>STATUS: <span className="text-green-500">ONLINE</span></p>
                      <p>UID: <span className="text-yellow-400">777-B47-32</span></p>
                    </div>
                  </header>
                  <main>
                    <Dashboard />
                  </main>
                </div>
              </>
            } />
          </Routes>
        </div>
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
