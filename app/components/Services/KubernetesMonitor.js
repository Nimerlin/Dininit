"use client"; // To ensure compatibility with React hooks

import React from 'react';
import { useRouter } from 'next/navigation'; // Update import to use next/navigation

const mockKubernetesData = [
  { clusterName: 'Cluster 1' },
  { clusterName: 'Cluster 2' },
];

export default function KubernetesMonitor() {
  const router = useRouter(); // Initialize the router

  const handleClick = () => {
    // Redirect to the Kubernetes monitoring page (you can modify this path as needed)
    router.push('/kubernetes');
  };

  return (
    <div className="monitor-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h2>Kubernetes Monitoring</h2>
      <p>Kubernetes Cluster Count: {mockKubernetesData.length}</p>
    </div>
  );
}
