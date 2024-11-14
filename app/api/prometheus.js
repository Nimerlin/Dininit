// lib/prometheus.js
import axios from "axios";

const prometheusURL = "http://localhost:9090"; // Adjust this to your Prometheus server URL

export const fetchMetrics = async () => {
  try {
    const res = await axios.get(
      `${prometheusURL}/api/v1/query?query=hello_world_counter`
    );
    return res.data.data.result;
  } catch (error) {
    console.error("Error fetching Prometheus metrics:", error);
    return [];
  }
};
