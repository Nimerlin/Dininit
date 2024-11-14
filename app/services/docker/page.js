// pages/docker.js
"use client"; // To ensure compatibility with React hooks

import { useEffect, useState } from "react";
import { fetchMetrics } from "../api/prometheus"; // Importing Prometheus fetching logic
import DockerLayout from "./layout"; // Import the custom DockerLayout component

export default function DockerPage() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    // Fetch Prometheus metrics when the page loads
    const getMetrics = async () => {
      const data = await fetchMetrics();
      setMetrics(data);
    };
    getMetrics();
  }, []);

  return (
    <DockerLayout>
      <h1 className="text-3xl text-white font-semibold mb-8">Docker Monitoring Dashboard</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-white mb-4">Metrics</h2>
        <table className="w-full table-auto text-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Metric Name</th>
              <th className="px-4 py-2">Value</th>
              <th className="px-4 py-2">Labels</th>
            </tr>
          </thead>
          <tbody>
            {metrics.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">Loading metrics...</td>
              </tr>
            ) : (
              metrics.map((metric, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{metric.metric.__name__}</td>
                  <td className="px-4 py-2">{metric.value[1]}</td>
                  <td className="px-4 py-2">{JSON.stringify(metric.metric)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DockerLayout>
  );
}
