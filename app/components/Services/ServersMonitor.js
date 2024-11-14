// components/Services/ServersMonitor.js

"use client";

import React from 'react';

const mockServerData = [
  { name: 'Server 1' },
  { name: 'Server 2' },
  { name: 'Server 3' },
];

export default function ServersMonitor() {
  return (
    <div>
      <h2>Server (VM) Monitoring</h2>
      <p>Server Count: {mockServerData.length}</p>
    </div>
  );
}
