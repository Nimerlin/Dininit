"use client"; // To ensure compatibility with React hooks

import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation

// Mock data for Docker containers
const mockDockerData = [
  { containerName: 'nginx-container' },
  { containerName: 'redis-container' },
  { containerName: 'mysql-container' },
  { containerName: 'app-container' },
];

const MicroservicesMonitor = () => {
  const router = useRouter(); // Initialize the router

  const handleClick = () => {
    // Navigate to the Docker monitoring page
    router.push('/docker');
  };

  return (
    <div className="monitor-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h2>Microservices Monitoring</h2>
      <p>Docker Container Count: {mockDockerData.length}</p>
      <ul>
        {mockDockerData.map((container, index) => (
          <li key={index}>{container.containerName}</li>
        ))}
      </ul>
    </div>
  );
};

export default MicroservicesMonitor;

