import React, { useState } from 'react';
import { HugeiconsIcon } from "@hugeicons/react";
import { Shield01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import TruthFeed from './TruthFeed';
import { createClient } from 'genlayer-js';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x628626228Ac3503A1dfA57916CB636b6Fc0B5154";

export default function Dashboard({ account }: { account: string | null }) {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [policyId, setPolicyId] = useState('');
  
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [claimStatus, setClaimStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const [txHash, setTxHash] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightNumber || !flightDate) {
      setPurchaseStatus('error');
      setErrorMessage("Please fill out both flight number and date.");
      return;
    }
    if (!account) {
      setPurchaseStatus('error');
      setErrorMessage("Please connect your wallet first.");
      return;
    }
    
    setPurchaseStatus('loading');
    
    try {
      const client = createClient();
      const anyClient = client as any;
      const tx = await anyClient.writeContract({
        address: CONTRACT_ADDRESS as any,
        functionName: "purchase_policy",
        args: [flightNumber, flightDate, 100], // 100 GEN default premium
        account: account
      });
      
      setTxHash(tx);
      setPurchaseStatus('success');
      setFlightNumber('');
      setFlightDate('');
    } catch (err: any) {
      console.error(err);
      setPurchaseStatus('error');
      setErrorMessage(err.message || "Transaction failed. Please try again.");
    }
  };

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyId) {
      setClaimStatus('error');
      setErrorMessage("Please enter a Policy ID to file a claim.");
      return;
    }
    if (!account) {
      setClaimStatus('error');
      setErrorMessage("Please connect your wallet first.");
      return;
    }
    
    setClaimStatus('loading');
    
    try {
      const client = createClient();
      const anyClient = client as any;
      const tx = await anyClient.writeContract({
        address: CONTRACT_ADDRESS as any,
        functionName: "claim_payout",
        args: [parseInt(policyId)],
        account: account
      });
      
      setTxHash(tx);
      setClaimStatus('success');
      setPolicyId('');
    } catch (err: any) {
      console.error(err);
      setClaimStatus('error');
      setErrorMessage(err.message || "Transaction failed. Please try again.");
    }
  };

  return (
    <div className="dashboard-grid">
      <div className="dashboard-main">
        <h2>Insurance Portal</h2>
        <p className="subtitle">Secure your flight with GenLayer's decentralized insurance protocol.</p>
        
        <div className="clay-card">
          <form onSubmit={handlePurchase}>
            <div className="input-group">
              <label>Flight Number</label>
              <input 
                type="text" 
                placeholder="e.g. DL123"
                value={flightNumber}
                onChange={e => setFlightNumber(e.target.value)}
                disabled={purchaseStatus === 'loading'}
                className="clay-input"
              />
            </div>
            
            <div className="input-group">
              <label>Flight Date</label>
              <input 
                type="date" 
                value={flightDate}
                onChange={e => setFlightDate(e.target.value)}
                disabled={purchaseStatus === 'loading'}
                className="clay-input"
              />
            </div>
            
            <button 
              type="submit" 
              className="button clay-btn" 
              disabled={purchaseStatus === 'loading' || !account}
              style={{ width: '100%', marginTop: '1rem' }}
            >
              {purchaseStatus === 'loading' ? (
                <>
                  <span className="spin">⌛</span> Purchasing Policy...
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={Shield01Icon} size={20} />
                  Purchase Flight Insurance
                </>
              )}
            </button>
            
            {purchaseStatus === 'error' && (
              <div className="feedback-box feedback-error">{errorMessage}</div>
            )}
            {purchaseStatus === 'success' && (
              <div className="feedback-box feedback-success">
                Policy purchased successfully! <br/>
                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Tx: {txHash}</span>
              </div>
            )}
          </form>
        </div>

        <div className="clay-card" style={{ marginTop: '2rem' }}>
          <h3>File a Claim</h3>
          <p className="subtitle" style={{ marginBottom: '1rem' }}>Was your flight delayed or cancelled? File a claim to have the network verify the flight data.</p>
          <form onSubmit={handleClaim}>
            <div className="input-group">
              <label>Policy ID</label>
              <input 
                type="number" 
                placeholder="Enter your Policy ID"
                value={policyId}
                onChange={e => setPolicyId(e.target.value)}
                disabled={claimStatus === 'loading'}
                className="clay-input"
              />
            </div>
            <button 
              type="submit" 
              className="button outline clay-btn-outline" 
              disabled={claimStatus === 'loading' || !account}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {claimStatus === 'loading' ? (
                <>
                  <span className="spin">⌛</span> Verifying Evidence...
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={Tick01Icon} size={20} />
                  File Claim (AI Verification)
                </>
              )}
            </button>

            {claimStatus === 'error' && (
              <div className="feedback-box feedback-error">{errorMessage}</div>
            )}
            {claimStatus === 'success' && (
              <div className="feedback-box feedback-success">
                Claim processed successfully by GenLayer! <br/>
                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Tx: {txHash}</span>
              </div>
            )}
          </form>
        </div>
      </div>
      
      <div className="dashboard-sidebar">
        <TruthFeed />
      </div>
    </div>
  );
}
