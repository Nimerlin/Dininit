"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  fetchCPUUsage,
  fetchMemoryUsage,
  fetchNetworkReceive,
  fetchNetworkTransmit,
} from "../api/prometheus";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NodeMetricsDashboard = () => {
  const [metrics, setMetrics] = useState({
    cpu: [],
    memory: [],
    networkRx: [],
    networkTx: [],
  });
  const [labels, setLabels] = useState([]);
  const [instance, setInstance] = useState(null);
  const [interval, setIntervalTime] = useState(10000); // Default to 10 seconds
  const [loading, setLoading] = useState(false); // Loading state

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [cpu, memory, netRx, netTx] = await Promise.all([
        fetchCPUUsage(),
        fetchMemoryUsage(),
        fetchNetworkReceive(),
        fetchNetworkTransmit(),
      ]);

      const inst =
        cpu[0]?.metric?.instance ||
        memory[0]?.metric?.instance ||
        netRx[0]?.metric?.instance ||
        netTx[0]?.metric?.instance ||
        null;
      setInstance(inst);

      const format = (data) => parseFloat(data[0]?.value[1] || "0");

      setMetrics((prev) => ({
        cpu: [...prev.cpu.slice(-9), format(cpu)],
        memory: [...prev.memory.slice(-9), format(memory)],
        networkRx: [...prev.networkRx.slice(-9), format(netRx)],
        networkTx: [...prev.networkTx.slice(-9), format(netTx)],
      }));

      setLabels((prev) => [...prev.slice(-9), new Date().toLocaleTimeString()]);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const intervalId = setInterval(fetchAll, interval);
    return () => clearInterval(intervalId);
  }, [interval]);

  const chartData = (label, data, color) => ({
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color,
        fill: false,
        tension: 0.4, // Smoother line
      },
    ],
  });

  // Handle time interval change
  const handleIntervalChange = (e) => {
    setIntervalTime(e.target.value);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Node Exporter Metrics</h2>

      {/* {instance && (
        <div className="text-sm text-gray-400">Target: {instance}</div>
      )} */}

      {/* Interval Selector */}
      <div className="flex items-center space-x-4">
        <label className="text-sm">Data Refresh Interval:</label>
        <select
          value={interval}
          onChange={handleIntervalChange}
          className="p-2 bg-gray-800 text-white rounded"
        >
          <option value={5000}>5 Seconds</option>
          <option value={10000}>10 Seconds</option>
          <option value={30000}>30 Seconds</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && <div className="text-center text-lg text-gray-500">Loading...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-2xl p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-2">CPU Usage</h3>
          <Line data={chartData("CPU", metrics.cpu, "#4ade80")} />
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Memory Usage</h3>
          <Line data={chartData("Memory", metrics.memory, "#60a5fa")} />
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Network RX</h3>
          <Line data={chartData("Network RX", metrics.networkRx, "#facc15")} />
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Network TX</h3>
          <Line data={chartData("Network TX", metrics.networkTx, "#f87171")} />
        </div>
      </div>
    </div>
  );
};

export default NodeMetricsDashboard;
