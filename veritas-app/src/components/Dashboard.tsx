import React, { useState } from 'react';
import TruthFeed from './TruthFeed';
import { ShieldCheckIcon } from '@hugeicons/react';
// import { GenLayerClient } from 'genlayer-js';

// The address from your deployment screenshot!
const CONTRACT_ADDRESS = "0x628626228Ac3503A1dfA57916CB636b6Fc0B5154";

export default function Dashboard({ account }: { account: string | null }) {
  const [claim, setClaim] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) {
      alert("Please connect your wallet first!");
      return;
    }

    setIsSubmitting(true);
    
    try {
      /* 
      // REAL GENLAYER SDK INTEGRATION
      const client = new GenLayerClient({ network: "testnet" }); // Use appropriate config
      
      const tx = await client.callContract({
        contract: CONTRACT_ADDRESS,
        method: "submit_claim",
        args: [claim, url],
        sender: account
      });
      
      await tx.wait();
      alert("Claim submitted to the GenLayer blockchain successfully!");
      */

      // Simulation for UI testing before full network hookup
      setTimeout(() => {
        setIsSubmitting(false);
        setClaim('');
        setUrl('');
        alert(`Transaction Sent to ${CONTRACT_ADDRESS}!\n\nClaim: ${claim}\nURL: ${url}`);
      }, 1500);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("Transaction failed. Check console.");
    }
  };

  return (
    <div className="dashboard-grid">
      <div className="left-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="card">
          <h2>Submit Claim for Verification</h2>
          <p className="subtitle">
            Stake tokens and submit a claim. The GenLayer Intelligent Contract will browse the web, cross-reference data, and use LLM consensus to verify its truthfulness.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Claim Statement</label>
              <input 
                type="text" 
                placeholder="e.g. The company X has filed for bankruptcy." 
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                required 
              />
            </div>
            
            <div className="input-group">
              <label>Reference URL / Evidence</label>
              <input 
                type="url" 
                placeholder="https://news.example.com/article" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="button" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} disabled={isSubmitting}>
              {isSubmitting ? (
                <span>Signing Transaction...</span>
              ) : (
                <>
                  <ShieldCheckIcon size={20} />
                  Stake 100 $GEN & Adjudicate
                </>
              )}
            </button>
          </form>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="card metric-card" style={{ flex: 1 }}>
            <h3>Global Consensus</h3>
            <div className="value">92%</div>
          </div>
          <div className="card metric-card" style={{ flex: 1 }}>
            <h3>Total Staked</h3>
            <div className="value">2.4M</div>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <TruthFeed />
      </div>
    </div>
  );
}
