import { useState } from 'react';
import TruthFeed from './TruthFeed';
import { createClient } from 'genlayer-js';
import { HugeiconsIcon } from "@hugeicons/react";
import { Shield01Icon } from "@hugeicons/core-free-icons";
import { motion } from 'framer-motion';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x628626228Ac3503A1dfA57916CB636b6Fc0B5154";

export default function Dashboard({ account }: { account: string | null }) {
  const [claim, setClaim] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claim || !url) return alert("Please fill all fields");
    if (!account) return alert("Please connect MetaMask first!");
    
    setIsSubmitting(true);
    
    try {
      const client = createClient();
      
      const anyClient = client as any;
      const tx = await anyClient.writeContract({
        address: CONTRACT_ADDRESS as any,
        functionName: "submit_claim",
        args: [claim, url],
        account: account
      });
      
      alert("Claim submitted to the GenLayer blockchain successfully!\nTx: " + tx);
      setIsSubmitting(false);
      setClaim('');
      setUrl('');
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("Transaction failed. Check console.");
    }
  };

  const pageVariants: any = {
    initial: { opacity: 0, scale: 0.98 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 0.98 }
  };

  return (
    <motion.div 
      className="dashboard-grid"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
    >
      <div className="main-panel">
        <div className="card clay-card" style={{ marginBottom: '2rem' }}>
          <h2>Submit a Claim</h2>
          <p className="subtitle">Enter a controversial claim and a reference URL. Our decentralized AI validators will scrape the web and reach consensus.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>The Claim</label>
              <input 
                type="text" 
                placeholder="e.g. OpenAI has released GPT-5"
                value={claim}
                onChange={e => setClaim(e.target.value)}
                disabled={isSubmitting}
                className="clay-input"
              />
            </div>
            
            <div className="input-group">
              <label>Reference URL</label>
              <input 
                type="url" 
                placeholder="https://..."
                value={url}
                onChange={e => setUrl(e.target.value)}
                disabled={isSubmitting}
                className="clay-input"
              />
            </div>
            
            <button 
              type="submit" 
              className="button clay-btn" 
              disabled={isSubmitting || !account}
              style={{ width: '100%', marginTop: '1rem' }}
            >
              {isSubmitting ? (
                <span className="spin">⌛</span>
              ) : (
                <>
                  <HugeiconsIcon icon={Shield01Icon} size={20} />
                  Stake 100 $GEN & Adjudicate
                </>
              )}
            </button>
            {!account && <p style={{ fontSize: '0.85rem', color: 'var(--danger)', marginTop: '0.75rem', textAlign: 'center', fontWeight: 500 }}>Please connect wallet first</p>}
          </form>
        </div>

        <div className="network-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="metric-card clay-card">
            <h3>Active Validators</h3>
            <div className="value">142</div>
          </div>
          <div className="metric-card clay-card">
            <h3>Total Value Locked</h3>
            <div className="value">1.2M <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>$GEN</span></div>
          </div>
        </div>
      </div>
      
      <div className="side-panel">
        <TruthFeed />
      </div>
    </motion.div>
  );
}
