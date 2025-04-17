"use client"; // To ensure compatibility with React hooks

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const mockServerData = [
  { name: 'Server 1' },
  { name: 'Server 2' },
  { name: 'Server 3' },
];

export default function ServersMonitor() {
  const router = useRouter(); // Initialize the router

  const handleClick = () => {
    // Redirect to the servers page or wherever you'd like to navigate
    router.push('/servers');
  };

  return (
    <div className="monitor-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h2>Server (VM) Monitoring</h2>
      {/* <p>Server Count: {mockServerData.length}</p> */}
    </div>
  );
}

