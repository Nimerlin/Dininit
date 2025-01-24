// components/Dashboard/Dashboard.js
import React from 'react';
import Panel from './Panel';
import Filters from './Filters';
import TimeRangePicker from './TimeRangePicker';

const Dashboard = () => {
  const [metrics, setMetrics] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [timeRange, setTimeRange] = React.useState('Last 24 hours');

  const fetchMetrics = async () => {
    const response = await fetch('/api/metrics');
    const data = await response.json();
    setMetrics(data);
  };

  React.useEffect(() => {
    fetchMetrics();
  }, [filters, timeRange]);

  return (
    <div>
      <h1>Custom Grafana-style Dashboard</h1>
      <TimeRangePicker setTimeRange={setTimeRange} />
      <Filters setFilters={setFilters} />
      <div className="panels">
        {metrics.map((metric, index) => (
          <Panel key={index} data={metric} />
        ))}

      </div>
    </div>
  
  );
};

export default Dashboard;
