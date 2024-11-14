// components/Services/KubernetesMonitor.js

"use client";

import React from 'react';

const mockKubernetesData = [
  { clusterName: 'Cluster 1' },
  { clusterName: 'Cluster 2' },
];

export default function KubernetesMonitor() {
  return (
    <div>
      <h2>Kubernetes Monitoring</h2>
      <p>Kubernetes Cluster Count: {mockKubernetesData.length}</p>
    </div>
  );
}
