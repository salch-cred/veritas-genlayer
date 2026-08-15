import { Tick02Icon, Cancel02Icon, Loading03Icon } from '@hugeicons/react';

const MOCK_CLAIMS = [
  {
    id: 1,
    claim: "The company X has filed for bankruptcy.",
    consensus: "FALSE",
    time: "2 mins ago"
  },
  {
    id: 2,
    claim: "New quantum computing breakthrough achieved.",
    consensus: "TRUE",
    time: "15 mins ago"
  },
  {
    id: 3,
    claim: "Local government approves budget cuts.",
    consensus: "PENDING",
    time: "45 mins ago"
  }
];

export default function TruthFeed() {
  return (
    <div className="card">
      <h2>Live Adjudications</h2>
      <p className="subtitle">Real-time AI consensus feed from the GenLayer blockchain.</p>
      
      <div className="feed-list">
        {MOCK_CLAIMS.map(item => (
          <div key={item.id} className={`feed-item status-${item.consensus.toLowerCase()}`}>
            <div className="feed-header">
              <span className="time">{item.time}</span>
              <div className="consensus-badge" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {item.consensus === 'TRUE' && <><Tick02Icon size={14} /> TRUE</>}
                {item.consensus === 'FALSE' && <><Cancel02Icon size={14} /> FALSE</>}
                {item.consensus === 'PENDING' && <><Loading03Icon size={14} /> PENDING</>}
              </div>
            </div>
            <p className="claim-text">"{item.claim}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
