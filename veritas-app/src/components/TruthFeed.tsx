import { useEffect, useState } from 'react';
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon, Cancel01Icon, Loading01Icon } from "@hugeicons/core-free-icons";
import { createClient } from 'genlayer-js';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x628626228Ac3503A1dfA57916CB636b6Fc0B5154";

export default function TruthFeed() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const client = createClient();
        const anyClient = client as any;
        const result = await anyClient.readContract({
          address: CONTRACT_ADDRESS as any,
          functionName: "get_all_policies",
          args: []
        });
        
        // Convert dict to array
        const policiesArray = Object.keys(result).map(key => ({
          id: key,
          ...result[key]
        })).reverse(); // newest first
        
        setPolicies(policiesArray);
      } catch (err) {
        console.error("Failed to fetch policies:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPolicies();
    
    // Poll every 10 seconds for updates
    const interval = setInterval(fetchPolicies, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clay-card">
      <h2>Recent Policies</h2>
      <p className="subtitle">Real-time insurance policies and claim status on GenLayer.</p>
      
      <div className="feed-list">
        {loading && <p>Loading policies...</p>}
        {!loading && policies.length === 0 && <p>No policies found.</p>}
        
        {policies.map(item => (
          <div key={item.id} className={`feed-item status-${item.claim_result ? (item.claim_result === 'APPROVED' ? 'true' : 'false') : 'pending'}`}>
            <div className="feed-header">
              <span className="time">Policy #{item.id}</span>
              <div className="consensus-badge" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {item.status === 'ACTIVE' && <><HugeiconsIcon icon={Loading01Icon} size={14} /> ACTIVE</>}
                {item.status === 'PROCESSED' && item.claim_result === 'APPROVED' && <><HugeiconsIcon icon={Tick01Icon} size={14} /> APPROVED</>}
                {item.status === 'PROCESSED' && item.claim_result === 'REJECTED' && <><HugeiconsIcon icon={Cancel01Icon} size={14} /> REJECTED</>}
              </div>
            </div>
            <p className="claim-text">Flight: {item.flight_number} <br/><span style={{fontSize:'0.85rem', color: 'var(--text-muted)'}}>Date: {item.flight_date}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
