"use client"
import React, { useEffect, useState } from 'react';

const ApplyToJoinButton = () => {
  const authenticateWithDiscord = async () => {
    try {
      const authResponse = await fetch('/api/discord/authenticate');
      const result = await authResponse.json();
      if (result.success) {
        window.location.href = '/application';
      } else {
        alert('Discord authentication failed.');
      }
    } catch (error) {
      console.error('Error during Discord authentication:', error);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <button
        style={{
          backgroundColor: "#ff5722",
          color: "#fff",
          padding: "15px 30px",
          fontSize: "18px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        onClick={authenticateWithDiscord}
      >
        Apply to Join Raid Force
      </button>
    </div>
  );
};


export const ApplyToJoinButtonSmall = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const initiateBlizzardAuth = () => {
    window.location.href = '/api/auth/auth';
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        style={{
          backgroundColor: '#ff5722',
          color: '#fff',
          padding: '7px 15px',
          fontSize: '14px',
          borderRadius: '8px',
          border: 'none',
        }}
        onClick={initiateBlizzardAuth}
      >
        Apply to Join Raid Force
      </button>
    </div>
  );
};

export default ApplyToJoinButton;