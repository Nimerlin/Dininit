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

const DashboardTile = ({ title, value, color }) => (
  <div className="bg-gray-800 p-4 rounded-2xl shadow-md min-h-[120px] flex flex-col justify-between">
    <div className="text-gray-400 text-sm">{title}</div>
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
  </div>
);

export default function DockerDashboard() {
  const [metrics, setMetrics] = useState({});
  const [timestamps, setTimestamps] = useState([]);
  const [selectedEnv, setSelectedEnv] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      const [cpu, memory, memoryLimit, networkReceive, networkTransmit, fsUsage, fsLimit, ioRead, ioWrite] = await Promise.all([
        fetchCPUUsage(selectedEnv),
        fetchMemoryUsage(selectedEnv),
        fetchMemoryLimit(selectedEnv),
        fetchNetworkReceive(selectedEnv),
        fetchNetworkTransmit(selectedEnv),
        fetchFilesystemUsage(selectedEnv),
        fetchFilesystemLimit(selectedEnv),
        fetchIORead(selectedEnv),
        fetchIOWrite(selectedEnv),
      ]);

      const parse = (data) => ({
        values: data.map((m) => parseFloat(m.value[1])),
        timestamps: data.map((m) => new Date(parseInt(m.value[0]) * 1000).toLocaleTimeString()),
      });

      setMetrics({
        cpu: parse(cpu),
        memory: parse(memory),
        memoryLimit: parse(memoryLimit),
        networkReceive: parse(networkReceive),
        networkTransmit: parse(networkTransmit),
        filesystemUsage: parse(fsUsage),
        filesystemLimit: parse(fsLimit),
        ioRead: parse(ioRead),
        ioWrite: parse(ioWrite),
      });

      setTimestamps(parse(cpu).timestamps);
    };

    fetchMetrics();
  }, [selectedEnv]);

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: true, position: "top" } },
    scales: { x: { ticks: { maxTicksLimit: 10 } }, y: { beginAtZero: true } },
  };

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

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 space-y-8">
      <h1 className="text-4xl font-bold">Docker Monitoring Dashboard</h1>
      <input
        type="text"
        placeholder="Enter environment (e.g. prod)"
        className="p-2 text-black rounded"
        value={selectedEnv}
        onChange={(e) => setSelectedEnv(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <DashboardTile title="CPU Usage" value={`${metrics.cpu?.values?.at(-1) ?? "-"}%`} color="text-teal-400" />
        <DashboardTile title="Memory Usage" value={`${metrics.memory?.values?.at(-1) ?? "-"} MB`} color="text-pink-400" />
        <DashboardTile title="Network In" value={`${metrics.networkReceive?.values?.at(-1) ?? "-"} B/s`} color="text-blue-400" />
        <DashboardTile title="Disk Read" value={`${metrics.ioRead?.values?.at(-1) ?? "-"} B/s`} color="text-purple-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl mb-4">CPU Usage</h2>
          <Line data={createChartData("CPU Usage", metrics.cpu?.values || [], "rgb(75,192,192)")} options={chartOptions} />
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl mb-4">Memory Usage</h2>
          <Line data={createChartData("Memory Usage", metrics.memory?.values || [], "rgb(255,99,132)")} options={chartOptions} />
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl mb-4">Network Transmit</h2>
          <Line data={createChartData("Transmit", metrics.networkTransmit?.values || [], "rgb(255,159,64)")} options={chartOptions} />
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl mb-4">Filesystem Usage</h2>
          <Line data={createChartData("Filesystem", metrics.filesystemUsage?.values || [], "rgb(255,205,86)")} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
