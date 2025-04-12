"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
} from "../api/prometheus";
import DockerLayout from "../layout";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DockerGraphsPage() {
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

  const [timestamps, setTimestamps] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState({
    cpu: true,
    memory: true,
    memoryLimit: true,
    networkReceive: true,
    networkTransmit: true,
    filesystemUsage: true,
    filesystemLimit: true,
    ioRead: true,
    ioWrite: true,
  });

  const [selectedEnv, setSelectedEnv] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const fetchData = async () => {
          const data = {};
          if (selectedMetrics.cpu) data.cpu = await fetchCPUUsage(selectedEnv);
          if (selectedMetrics.memory) data.memory = await fetchMemoryUsage(selectedEnv);
          if (selectedMetrics.memoryLimit) data.memoryLimit = await fetchMemoryLimit(selectedEnv);
          if (selectedMetrics.networkReceive) data.networkReceive = await fetchNetworkReceive(selectedEnv);
          if (selectedMetrics.networkTransmit) data.networkTransmit = await fetchNetworkTransmit(selectedEnv);
          if (selectedMetrics.filesystemUsage) data.filesystemUsage = await fetchFilesystemUsage(selectedEnv);
          if (selectedMetrics.filesystemLimit) data.filesystemLimit = await fetchFilesystemLimit(selectedEnv);
          if (selectedMetrics.ioRead) data.ioRead = await fetchIORead(selectedEnv);
          if (selectedMetrics.ioWrite) data.ioWrite = await fetchIOWrite(selectedEnv);

          const parseData = (data) => {
            return {
              values: data.map((metric) => parseFloat(metric.value[1])),
              timestamps: data.map((metric) => new Date(parseInt(metric.value[0]) * 1000).toLocaleTimeString()),
            };
          };

          setMetrics({
            cpu: parseData(data.cpu || []),
            memory: parseData(data.memory || []),
            memoryLimit: parseData(data.memoryLimit || []),
            networkReceive: parseData(data.networkReceive || []),
            networkTransmit: parseData(data.networkTransmit || []),
            filesystemUsage: parseData(data.filesystemUsage || []),
            filesystemLimit: parseData(data.filesystemLimit || []),
            ioRead: parseData(data.ioRead || []),
            ioWrite: parseData(data.ioWrite || []),
          });

          if (data.cpu && data.cpu.length > 0) {
            setTimestamps(data.cpu.map((metric) => new Date(parseInt(metric.value[0]) * 1000).toLocaleTimeString()));
          }
        };

        fetchData();
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, [selectedMetrics, selectedEnv]);

  const createChartData = (label, data, color) => ({
    labels: timestamps,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: `${color}33`,
        fill: true,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleMetricChange = (e) => {
    const { name, checked } = e.target;
    setSelectedMetrics((prev) => ({ ...prev, [name]: checked }));
  };

  const handleEnvChange = (e) => {
    setSelectedEnv(e.target.value);
  };

  return (
    <div>
      <h1 className="text-3xl text-white font-semibold mb-8">Docker Monitoring Dashboard</h1>

      <div className="mb-4">
        <label className="text-white mr-2">Filter by Environment:</label>
        <input
          type="text"
          value={selectedEnv}
          onChange={handleEnvChange}
          placeholder="e.g., prod, staging"
          className="p-2 rounded border border-gray-400"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl text-white mb-4">Select Metrics to Display</h2>
        <div className="space-y-2">
          {Object.keys(selectedMetrics).map((metric) => (
            <div key={metric} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={metric}
                checked={selectedMetrics[metric]}
                onChange={handleMetricChange}
                className="text-white"
              />
              <label className="text-white capitalize">{metric}</label>
            </div>
          ))}
        </div>
      </div>

      {selectedMetrics.cpu && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl text-white mb-4">CPU Usage</h2>
          <Line data={createChartData("CPU Usage (%)", metrics.cpu.values, "rgb(75, 192, 192)")} options={chartOptions} />
        </div>
      )}

      {selectedMetrics.memory && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl text-white mb-4">Memory Usage</h2>
          <Line data={createChartData("Memory Usage (MB)", metrics.memory.values, "rgb(255, 99, 132)")} options={chartOptions} />
        </div>
      )}

      {selectedMetrics.memoryLimit && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl text-white mb-4">Memory Limit</h2>
          <Line data={createChartData("Memory Limit (MB)", metrics.memoryLimit.values, "rgb(153, 102, 255)")} options={chartOptions} />
        </div>
      )}

      {selectedMetrics.networkReceive && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl text-white mb-4">Network Receive</h2>
          <Line data={createChartData("Network Receive (bytes)", metrics.networkReceive.values, "rgb(54, 162, 235)")} options={chartOptions} />
        </div>
      )}

      {selectedMetrics.networkTransmit && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl text-white mb-4">Network Transmit</h2>
          <Line data={createChartData("Network Transmit (bytes)", metrics.networkTransmit.values, "rgb(255, 159, 64)")} options={chartOptions} />
        </div>
      )}

      {selectedMetrics.filesystemUsage && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl text-white mb-4">Filesystem Usage</h2>
          <Line data={createChartData("Filesystem Usage (GB)", metrics.filesystemUsage.values, "rgb(255, 205, 86)")} options={chartOptions} />
        </div>
      )}

      {selectedMetrics.filesystemLimit && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl text-white mb-4">Filesystem Limit</h2>
          <Line data={createChartData("Filesystem Limit (GB)", metrics.filesystemLimit.values, "rgb(75, 192, 192)")} options={chartOptions} />
        </div>
      )}

      {selectedMetrics.ioRead && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl text-white mb-4">IO Read</h2>
          <Line data={createChartData("IO Read (bytes)", metrics.ioRead.values, "rgb(153, 102, 255)")} options={chartOptions} />
        </div>
      )}

      {selectedMetrics.ioWrite && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl text-white mb-4">IO Write</h2>
          <Line data={createChartData("IO Write (bytes)", metrics.ioWrite.values, "rgb(255, 159, 64)")} options={chartOptions} />
        </div>
      )}
    </div>
  );
}

