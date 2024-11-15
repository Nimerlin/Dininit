// components/Sidenavbar.js
import Link from 'next/link';

export default function Sidenavbar() {
  return (
    <aside className="bg-gray-800 text-white p-6 h-full rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li><Link href="/overview">Overview</Link></li>
        <li><Link href="/services/docker/metrics">Metrics</Link></li>
        <li><Link href="/services/docker/graph">Graph</Link></li>
        <li><Link href="/logs">Logs</Link></li>
        <li><Link href="/settings">Settings</Link></li>
      </ul>
    </aside>
  );
}
