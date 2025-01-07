"use client";

import React, { useState } from 'react';

// Dummy data to simulate raid progress
interface RaidData {
  name: string;
  difficulties: {
    mythic: Boss[];
    heroic: Boss[];
    normal: Boss[];
  };
}

const dummyRaidData: RaidData = {
  name: "Nerub-ar Palace ",
  difficulties: {
    mythic: [
      { name: "Ulgrax the Devourer", progress: 100, photo: "img/boss/ulgrax.webp", firstKillDate: "2024" },
      { name: "The Bloodbound Horror", progress: 100, photo: "img/boss/bloodhound.webp", firstKillDate: "2024" },
      { name: "Sikran", progress: 100, photo: "img/boss/sikran.webp", firstKillDate: "2024" },
      { name: "Rasha'nan", progress: 0, photo: "img/boss/rashan.webp" },
      { name: "Broodtwister Ovi'nax", progress: 0, photo: "img/boss/brood.webp" },
      { name: "Nexus-Princess Ky'veza", progress: 0, photo: "img/boss/nexus.webp" },
      { name: "The Silken Court", progress: 0, photo: "img/boss/silken.webp" },
      { name: "Queen Ansurek", progress: 0, photo: "img/boss/queen.jpg" },
    ],
    heroic: [
      { name: "Ulgrax the Devourer", progress: 100, photo: "img/boss/ulgrax.webp", firstKillDate: "2024" },
      { name: "The Bloodbound Horror", progress: 100, photo: "img/boss/bloodhound.webp", firstKillDate: "2024" },
      { name: "Sikran", progress: 100, photo: "img/boss/sikran.webp", firstKillDate: "2024" },
      { name: "Rasha'nan", progress: 100, photo: "img/boss/rashan.webp", firstKillDate: "2024" },
      { name: "Broodtwister Ovi'nax", progress: 100, photo: "img/boss/brood.webp", firstKillDate: "2024" },
      { name: "Nexus-Princess Ky'veza", progress: 100, photo: "img/boss/nexus.webp", firstKillDate: "2024" },
      { name: "The Silken Court", progress: 100, photo: "img/boss/silken.webp", firstKillDate: "2024" },
      { name: "Queen Ansurek", progress: 100, photo: "img/boss/queen.jpg", firstKillDate: "2024" },
    ],
    normal: [
      { name: "Ulgrax the Devourer", progress: 100, photo: "img/boss/ulgrax.webp", firstKillDate: "2024" },
      { name: "The Bloodbound Horror", progress: 100, photo: "img/boss/bloodhound.webp", firstKillDate: "2024" },
      { name: "Sikran", progress: 100, photo: "img/boss/sikran.webp", firstKillDate: "2024" },
      { name: "Rasha'nan", progress: 100, photo: "img/boss/rashan.webp", firstKillDate: "2024" },
      { name: "Broodtwister Ovi'nax", progress: 100, photo: "img/boss/brood.webp", firstKillDate: "2024" },
      { name: "Nexus-Princess Ky'veza", progress: 100, photo: "img/boss/nexus.webp", firstKillDate: "2024" },
      { name: "The Silken Court", progress: 100, photo: "img/boss/silken.webp", firstKillDate: "2024" },
      { name: "Queen Ansurek", progress: 100, photo: "img/boss/queen.jpg", firstKillDate: "2024" },
    ],
  },
};

const ProgressBar = ({ progress }: { progress: number }) => (
  <div style={{
    height: "20px",
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "10px",
  }}>
    <div
      style={{
        height: "100%",
        width: `${progress}%`,
        backgroundColor: progress === 100 ? "#4caf50" : "#ff9800",
        transition: "width 0.3s",
      }}
    />
  </div>
);

interface Boss {
  name: string;
  progress: number;
  photo: string;
  firstKillDate?: string;
}

const BossCard = ({ boss }: { boss: Boss }) => (
  <div style={{
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "10px",
    margin: "10px",
    backgroundColor: "#2d2f36",
    color: "#fff",
    textAlign: "center",
  }}>
    <img
      src={boss.photo}
      alt={boss.name}
      className='max-w-[200px] max-h-[300px] min-h-[100px] rounded-lg'
    />
    <h3>{boss.name}</h3>
    <ProgressBar progress={boss.progress} />
    <p>
      {boss.progress === 0
        ? "Not defeated"
        : `First Kill: ${boss.firstKillDate || "Unknown"}`}
    </p>
    {boss.progress > 0 && boss.progress < 100 && (
      <p>{boss.progress}% completed</p>
    )}
  </div>
);

const RaidProgress = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("mythic");

  const raidData = dummyRaidData;
  const difficulties = Object.keys(raidData.difficulties);
  const activeProgress = raidData.difficulties[selectedDifficulty as keyof typeof raidData.difficulties];

  return (
    <div className='flex flex-col justify-center items-center text-black' style={{ padding: "20px", backgroundColor: "#1b1c21", color: "#fff" }}>
      <h2 className='text-center text-4xl text-white mb-5'>{`Raid Progress: ${raidData.name}`}</h2>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="difficulty" className='text-white'>Select Difficulty: </label>
        <select
          id="difficulty"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          style={{ padding: "5px", borderRadius: "5px" }}
          className='text-black'
        >
          {difficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {activeProgress.map((boss, index) => (
          <BossCard key={index} boss={boss} />
        ))}
      </div>
    </div>
  );
};

export default RaidProgress;