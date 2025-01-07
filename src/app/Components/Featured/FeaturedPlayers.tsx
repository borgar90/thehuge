"use client"
import React from 'react';

// Dummy data to simulate raid log data
const dummyData = {
  mainTank: {
    name: 'TankMaster',
    server: 'Silvermoon',
    stats: {
      itemLevel: 445,
      raidsTanked: 120,
    },
  },
  topHealer: {
    name: 'HealQueen',
    server: 'Stormrage',
    stats: {
      itemLevel: 442,
      healingDone: '1.5M',
    },
  },
  topDps: {
    name: 'DpsLord',
    server: 'Ragnaros',
    stats: {
      itemLevel: 448,
      dps: '25.3K',
    },
  },
};

interface Player {
  name: string;
  server: string;
  stats: {
    [key: string]: string | number;
  };
}

interface FeaturedPlayerCardProps {
  title: string;
  player: Player;
}

const FeaturedPlayerCard: React.FC<FeaturedPlayerCardProps> = ({ title, player }) => {
  return (
    <div style={{
      border: '2px solid #000',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#2d2f36',
      color: '#fff',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    }}>
      <h3 style={{ color: '#f39c12' }}>{title}</h3>
      <p><strong>Name:</strong> {player.name}</p>
      <p><strong>Server:</strong> {player.server}</p>
      {Object.entries(player.stats).map(([key, value]) => (
        <p key={key}><strong>{key}:</strong> {value}</p>
      ))}
    </div>
  );
};

const FeaturedRaidStats = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '20px',
      padding: '20px',
      backgroundColor: '#efefef',
    }} className='flex flex-col justify-center items-center'>
      <h1 style={{ color: '#f39c12' }} className='text-4xl'>Featured Raiders</h1>
      <div className='flex flex-row'>
        <FeaturedPlayerCard title="Main Tank" player={dummyData.mainTank} />
        <FeaturedPlayerCard title="Top Healer" player={dummyData.topHealer} />
        <FeaturedPlayerCard title="Top DPS" player={dummyData.topDps} />
      </div>
    </div>
  );
};

export default FeaturedRaidStats;

// In the future:
// Fetch data from the latest raid logs API (e.g., Raider.IO or WarcraftLogs)
// Use this structure to dynamically populate the component with real data.
