"use client";

// components/Services/MicroservicesMonitor.js

 // Make sure this is at the top of the file

import React from 'react';
import { useRouter } from 'next/router'; // This hook can only be used in client components

// Mock data for Docker containers
const mockDockerData = [
  { containerName: 'nginx-container' },
  { containerName: 'redis-container' },
  { containerName: 'mysql-container' },
  { containerName: 'app-container' },
];

const MicroservicesMonitor = () => {
  const router = useRouter();  // Make sure useRouter is in a client component
  const [dockerData, setDockerData] = React.useState(mockDockerData);

  const handleClick = () => {
    // Navigate to the Docker page on click
    router.push('/docker');
  };

  return (
    <div className="monitor-card" onClick={handleClick}>
      <h2 className="monitor-title">Microservices Monitoring</h2>
      <p>Click here to go to Docker monitoring page</p>

      <div className="docker-monitor">
        <h3>Docker Monitoring</h3>
        <p>Docker Container Count: {dockerData.length}</p>
        <ul>
          {dockerData.map((container, index) => (
            <li key={index}>{container.containerName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MicroservicesMonitor;
