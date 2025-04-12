import { Line } from "react-chartjs-2";

export default function MetricChart({ title, data, color }: any) {
  const chartData = {
    labels: data.timestamps,
    datasets: [
      {
        label: title,
        data: data.values,
        borderColor: color,
        backgroundColor: `${color}33`,
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow mb-6">
      <h2 className="text-white text-xl mb-4">{title}</h2>
      <Line data={chartData} options={{
        responsive: true,
        plugins: { legend: { display: true, position: "top" } },
        scales: { x: { ticks: { maxTicksLimit: 10 } }, y: { beginAtZero: true } }
      }} />
    </div>
  );
}
