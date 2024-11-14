// components/Dashboard/TimeRangePicker.js
import React from 'react';

const TimeRangePicker = ({ setTimeRange }) => (
  <div className="time-range-picker">
    <select onChange={(e) => setTimeRange(e.target.value)}>
      <option value="Last 1 hour">Last 1 hour</option>
      <option value="Last 24 hours">Last 24 hours</option>
      <option value="Last 7 days">Last 7 days</option>
      {/* More time ranges */}
    </select>
  </div>
);

export default TimeRangePicker;
