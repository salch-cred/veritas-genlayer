import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Docs from './components/Docs';
import { HugeiconsIcon } from "@hugeicons/react";
import { Layers01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence } from 'framer-motion';
import { usePrivy } from '@privy-io/react-auth';

function AppContent() {
  const location = useLocation();
  const { ready, authenticated, user, login, logout } = usePrivy();
  
  const account = user?.wallet?.address || user?.email?.address || null;
  const displayAccount = account ? account.slice(0, 6) + "..." + account.slice(-4) : "";

  return (
    <div className="app-container">
      <header className="clay-header">
        <Link to="/" className="logo">
          <HugeiconsIcon icon={Layers01Icon} size={28} />
          Veritas
        </Link>
        <nav className="header-nav">
          <Link to="/docs" className="nav-link">Docs</Link>
          <a href="https://github.com/salch-cred/veritas-genlayer" target="_blank" rel="noreferrer" className="nav-link">GitHub</a>
          
          {location.pathname === '/' || location.pathname === '/docs' ? (
            <Link to="/app" className="button clay-btn nav-btn">Launch App</Link>
          ) : (
            ready && authenticated ? (
              <button className="button outline clay-btn-outline nav-btn" onClick={logout}>
                {displayAccount} (Logout)
              </button>
            ) : (
              <button className="button clay-btn nav-btn" onClick={login} disabled={!ready}>
                Connect Wallet
              </button>
            )
          )}
        </nav>
      </header>

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/app" element={<Dashboard account={user?.wallet?.address || null} />} />
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
