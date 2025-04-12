interface MetricCardProps {
    title: string;
    value: string | number;
    status?: "ok" | "warning" | "error";
  }
  
  export default function MetricCard({ title, value, status = "ok" }: MetricCardProps) {
    const color =
      status === "error"
        ? "text-red-500"
        : status === "warning"
        ? "text-yellow-500"
        : "text-green-500";
  
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="text-gray-300 text-sm">{title}</div>
        <div className={`text-2xl font-semibold ${color}`}>{value}</div>
      </div>
    );
  }
  