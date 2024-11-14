// components/Dashboard/Panel.js
import React from 'react';

const Panel = ({ data }) => (
  <div className="panel">
    <h2>{data.title}</h2>
    <p>{data.value}</p>
    {/* Add your chart library here, e.g., Chart.js or Recharts */}
  </div>
);

export default Panel;
