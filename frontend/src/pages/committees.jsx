import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCommittees, joinCommittee, leaveCommittee } from '../api/api';

function CommitteeCard({ committee, onToggle }) {
  const [busy, setBusy] = useState(false);

  async function handleToggle() {
    setBusy(true);
    await onToggle(committee.id, committee.is_member);
    setBusy(false);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '16px', color: 'var(--blue)' }}>
          {committee.name}
        </p>
        <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '14px' }}>
          {committee.description}
        </p>
      </div>
      <button
        className={committee.is_member ? 'ghostBtn' : 'primaryBtn'}
        onClick={handleToggle}
        disabled={busy}
        style={{
          whiteSpace: 'nowrap',
          opacity: busy ? 0.6 : 1,
          fontSize: '14px',
          padding: '8px 18px',
          flexShrink: 0,
        }}
      >
        {committee.is_member ? 'Leave' : 'Join'}
      </button>
    </motion.div>
  );
}

export default function Committees() {
  const [committees, setCommittees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getCommittees()
      .then(res => setCommittees(res.data))
      .catch(() => setError('Could not load committees. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleToggle(committeeId, isMember) {
    // Optimistic update
    setCommittees(prev =>
      prev.map(c => c.id === committeeId ? { ...c, is_member: !isMember } : c)
    );
    try {
      if (isMember) {
        await leaveCommittee(committeeId);
      } else {
        await joinCommittee(committeeId);
      }
    } catch {
      // Revert on failure
      setCommittees(prev =>
        prev.map(c => c.id === committeeId ? { ...c, is_member: isMember } : c)
      );
    }
  }

  return (
    <div style={{
      maxWidth: '720px',
      margin: '0 auto',
      padding: '96px 16px 80px',
      fontFamily: 'Work Sans, sans-serif',
    }}>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 style={{
          fontWeight: 800,
          color: 'var(--blue)',
          fontSize: '32px',
          marginBottom: '8px',
          marginTop: 0,
        }}>
          Committees
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '15px' }}>
          Join committees that match your interests and get more involved with SHPE UH.
        </p>
      </motion.div>

      {loading ? (
        <p style={{ color: '#6b7280' }}>Loading committees…</p>
      ) : error ? (
        <p style={{ color: '#D33A02' }}>{error}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {committees.map(c => (
            <CommitteeCard key={c.id} committee={c} onToggle={handleToggle} />
          ))}
        </div>
      )}
    </div>
  );
}
