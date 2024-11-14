// components/Dashboard/Filters.js
import React from 'react';

const Filters = ({ setFilters }) => {
  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="filters">
      <select name="metricType" onChange={handleFilterChange}>
        <option value="cpu">CPU Usage</option>
        <option value="memory">Memory Usage</option>
        {/* Add other metric options here */}
      </select>
    </div>
  );
};

export default Filters;
