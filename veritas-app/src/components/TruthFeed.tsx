import React from 'react';
import { Tick02Icon, Cancel02Icon, Loading03Icon } from '@hugeicons/react';

const MOCK_CLAIMS = [
  {
    id: 1,
    claim: "Scientists have discovered a new exoplanet with water vapor.",
    source: "nature.com/articles/s41586-025",
    status: 'VERIFIED',
    consensus: '99% True',
    time: '2 mins ago'
  },
  {
    id: 2,
    claim: "Viral video shows alien spaceship over New York.",
    source: "twitter.com/user123/status",
    status: 'FALSE',
    consensus: '0% True',
    time: '15 mins ago'
  },
  {
    id: 3,
    claim: "Central Bank announces unexpected rate hike.",
    source: "wsj.com/economy/central-bank",
    status: 'ANALYZING',
    consensus: 'Awaiting Consensus...',
    time: 'Just now'
  }
];

export default function TruthFeed() {
  return (
    <div className="card" style={{ height: '100%' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Live Adjudication Feed</h2>
      
      <div className="truth-feed">
        {MOCK_CLAIMS.map((claim) => (
          <div key={claim.id} className="claim-item">
            <div className="claim-header">
              <span className={`status-badge ${claim.status.toLowerCase()}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {claim.status === 'VERIFIED' && <Tick02Icon size={14} />}
                {claim.status === 'FALSE' && <Cancel02Icon size={14} />}
                {claim.status === 'ANALYZING' && <Loading03Icon size={14} className="spin" />}
                {claim.status}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{claim.time}</span>
            </div>
            
            <p className="claim-text">"{claim.claim}"</p>
            
            <div className="claim-meta" style={{ marginTop: '0.5rem' }}>
              <div><strong>Source:</strong> {claim.source}</div>
              <div style={{ marginTop: '0.25rem', color: claim.status === 'VERIFIED' ? 'var(--success)' : claim.status === 'FALSE' ? 'var(--danger)' : 'inherit' }}>
                <strong>Consensus:</strong> {claim.consensus}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
