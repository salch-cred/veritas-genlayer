import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import { HugeiconsIcon } from "@hugeicons/react";
import { Layers01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence } from 'framer-motion';

function AppContent() {
  const [account, setAccount] = useState<string | null>(null);
  const location = useLocation();

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Failed to connect wallet", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="app-container">
      <header className="clay-header">
        <Link to="/" className="logo">
          <HugeiconsIcon icon={Layers01Icon} size={28} />
          Veritas
        </Link>
        <nav>
          {location.pathname === '/' ? (
            <Link to="/app" className="button outline clay-btn-outline">Go to App</Link>
          ) : (
            account ? (
              <div className="button outline clay-btn-outline" style={{ cursor: 'default' }}>
                {account.slice(0, 6)}...{account.slice(-4)}
              </div>
            ) : (
              <button className="button outline clay-btn-outline" onClick={connectWallet}>Connect Wallet</button>
            )
          )}
        </nav>
      </header>

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<Dashboard account={account} />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
