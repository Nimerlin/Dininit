"use client"; // To ensure compatibility with React hooks

import { useEffect, useState } from "react";
import {
  fetchCPUUsage,
  fetchMemoryUsage,
  fetchMemoryLimit,
  fetchNetworkReceive,
  fetchNetworkTransmit,
  fetchFilesystemUsage,
  fetchFilesystemLimit,
  fetchIORead,
  fetchIOWrite,
} from "./api/prometheus"; // Prometheus fetching logic
import DockerLayout from "./layout"; // Import the custom DockerLayout component


export default function DockerPage() {
  const [metrics, setMetrics] = useState({
    cpu: [],
    memory: [],
    memoryLimit: [],
    networkReceive: [],
    networkTransmit: [],
    filesystemUsage: [],
    filesystemLimit: [],
    ioRead: [],
    ioWrite: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMetrics = async () => {
      try {
        const cpu = await fetchCPUUsage();
        const memory = await fetchMemoryUsage();
        const memoryLimit = await fetchMemoryLimit();
        const networkReceive = await fetchNetworkReceive();
        const networkTransmit = await fetchNetworkTransmit();
        const filesystemUsage = await fetchFilesystemUsage();
        const filesystemLimit = await fetchFilesystemLimit();
        const ioRead = await fetchIORead();
        const ioWrite = await fetchIOWrite();

        setMetrics({
          cpu,
          memory,
          memoryLimit,
          networkReceive,
          networkTransmit,
          filesystemUsage,
          filesystemLimit,
          ioRead,
          ioWrite,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching metrics:", error);
        setLoading(false);
      }
    };

    fetchAllMetrics();
  }, []);

  const renderMetricsTable = (title, data) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl text-white mb-4">{title}</h2>
      <table className="w-full table-auto text-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Metric Name</th>
            <th className="px-4 py-2">Value</th>
            <th className="px-4 py-2">Labels</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No data available</td>
            </tr>
          ) : (
            data.map((metric, index) => (
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
  );

  // if (loading) {
  //   return (
  //     <DockerLayout>
  //       <h1 className="text-3xl text-white font-semibold mb-8">
  //         Docker Monitoring Dashboard
  //       </h1>
  //       <div className="text-white text-center">Loading metrics...</div>
  //     </DockerLayout>
  //   );
  // }

  return (
    <div>
      
      <h1 className="text-3xl text-white font-semibold mb-8">
        Docker Monitoring Dashboard
      </h1>

      {renderMetricsTable("CPU Usage", metrics.cpu)}
      {renderMetricsTable("Memory Usage", metrics.memory)}
      {renderMetricsTable("Memory Limit", metrics.memoryLimit)}
      {renderMetricsTable("Network Receive", metrics.networkReceive)}
      {renderMetricsTable("Network Transmit", metrics.networkTransmit)}
      {renderMetricsTable("Filesystem Usage", metrics.filesystemUsage)}
      {renderMetricsTable("Filesystem Limit", metrics.filesystemLimit)}
      {renderMetricsTable("I/O Read", metrics.ioRead)}
      {renderMetricsTable("I/O Write", metrics.ioWrite)}
    </div>
  );
}
