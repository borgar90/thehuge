"use client";
import React, { useState } from 'react';

// Dummy data to simulate raid progress and calendar
const dummyRaidData = {
  calendar: [
    { date: "2024-12-25", name: "Christmas Raid", status: "completed" },
    { date: "2025-01-01", name: "New Year Raid", status: "completed" },
    { date: "2025-01-08", name: "Weekly Raid", status: "upcoming" },
    { date: "2025-01-15", name: "Heroic Run", status: "upcoming" },
  ],
};

const RaidCalendar = () => {
  const [currentIndex, setCurrentIndex] = useState(dummyRaidData.calendar.findIndex(raid => raid.status === "completed"));

  const slideLeft = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : dummyRaidData.calendar.length - 1));
  };

  const slideRight = () => {
    setCurrentIndex((prev) => (prev < dummyRaidData.calendar.length - 1 ? prev + 1 : 0));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", padding: "20px", backgroundColor: "#1b1c21", color: "#fff" }} className='flex items-center justify-center'>
      <button onClick={slideLeft} style={{ margin: "0 20px", padding: "10px", cursor: "pointer" }}>&lt;</button>
      <div style={{ display: "flex", overflow: "hidden", width: "80%" }}>
        {dummyRaidData.calendar.map((raid, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 33%",
              textAlign: "center",
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <h3>{raid.name}</h3>
            <p>{raid.date}</p>
            <p>Status: {raid.status}</p>
          </div>
        ))}
      </div>
      <button onClick={slideRight} style={{ margin: "0 20px", padding: "10px", cursor: "pointer" }}>&gt;</button>
    </div>
  );
};

export default RaidCalendar;

// In the future:
// Fetch data dynamically from the raid logs API and adjust the structure to accommodate real-time data.