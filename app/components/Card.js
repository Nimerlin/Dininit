
"use client";

// components/Card.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Card({ title, logData }) {
  // Prepare the data for the graph (example: extracting timestamps and values)
  const graphData = {
    labels: logData.map(log => log.timestamp), // X-axis: Timestamps from log data
    datasets: [
      {
        label: 'Metric Value', // Example metric label
        data: logData.map(log => log.value), // Y-axis: Values from log data
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1, // Line tension for smooth curves
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="w-full h-72">
        <Line data={graphData} options={options} />
      </div>
    </div>
  );
}
