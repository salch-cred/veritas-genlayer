import { useState } from 'react';
import Dashboard from './components/Dashboard';
function App() {
  const [account, setAccount] = useState<string | null>(null);

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
      <header>
        <div className="logo">
          🌐
          Veritas
        </div>
        <nav>
          {account ? (
            <div className="button outline" style={{ cursor: 'default' }}>
              {account.slice(0, 6)}...{account.slice(-4)}
            </div>
          ) : (
            <button className="button outline" onClick={connectWallet}>Connect Wallet</button>
          )}
        </nav>
      </header>

      <main>
        <Dashboard account={account} />
      </main>
    </div>
  );
}

export default App;
