// import axios from "axios";

// const prometheusURL = "http://10.1.38.67:9090/metrics"; // Adjust this to your Prometheus server URL

// /**
//  * Generic function to fetch metrics from Prometheus.
//  * @param {string} query - The PromQL query to execute.
//  * @returns {Promise<Array>} - The result of the PromQL query.
//  */
// export const fetchMetrics = async (query) => {
//   try {
//     const res = await axios.get(`${prometheusURL}/api/v1/query`, {
//       params: { query },
//     });
//     if (res.data.status === "success") {
//       return res.data.data.result;
//     }
//     console.error("Error in Prometheus query response:", res.data);
//     return [];
//   } catch (error) {
//     console.error("Error fetching Prometheus metrics:", error);
//     return [];
//   }
// };

// // ================================
// // Specific Metric Queries
// // ================================

// /**
//  * Fetch container CPU usage.
//  * @returns {Promise<Array>} - The result of the CPU usage query.
//  */
// export const fetchCPUUsage = async () => {
//   return fetchMetrics('rate(container_cpu_usage_seconds_total[5m])');
// };

// /**
//  * Fetch container memory usage.
//  * @returns {Promise<Array>} - The result of the memory usage query.
//  */
// export const fetchMemoryUsage = async () => {
//   return fetchMetrics('container_memory_usage_bytes');
// };

// /**
//  * Fetch container memory limit.
//  * @returns {Promise<Array>} - The result of the memory limit query.
//  */
// export const fetchMemoryLimit = async () => {
//   return fetchMetrics('container_spec_memory_limit_bytes');
// };

// /**
//  * Fetch container network receive bytes.
//  * @returns {Promise<Array>} - The result of the network receive query.
//  */
// export const fetchNetworkReceive = async () => {
//   return fetchMetrics('rate(container_network_receive_bytes_total[5m])');
// };

// /**
//  * Fetch container network transmit bytes.
//  * @returns {Promise<Array>} - The result of the network transmit query.
//  */
// export const fetchNetworkTransmit = async () => {
//   return fetchMetrics('rate(container_network_transmit_bytes_total[5m])');
// };

// /**
//  * Fetch container filesystem usage.
//  * @returns {Promise<Array>} - The result of the filesystem usage query.
//  */
// export const fetchFilesystemUsage = async () => {
//   return fetchMetrics('container_fs_usage_bytes');
// };

// /**
//  * Fetch container filesystem limit.
//  * @returns {Promise<Array>} - The result of the filesystem limit query.
//  */
// export const fetchFilesystemLimit = async () => {
//   return fetchMetrics('container_fs_limit_bytes');
// };

// /**
//  * Fetch container I/O read bytes.
//  * @returns {Promise<Array>} - The result of the I/O read query.
//  */
// export const fetchIORead = async () => {
//   return fetchMetrics('rate(container_fs_reads_bytes_total[5m])');
// };

// /**
//  * Fetch container I/O write bytes.
//  * @returns {Promise<Array>} - The result of the I/O write query.
//  */
// export const fetchIOWrite = async () => {
//   return fetchMetrics('rate(container_fs_writes_bytes_total[5m])');
// };

// /**
//  * Fetch a custom metric by name.
//  * @param {string} metricName - The name of the custom metric.
//  * @returns {Promise<Array>} - The result of the custom metric query.
//  */
// export const fetchCustomMetric = async (metricName) => {
//   return fetchMetrics(metricName);
// };

// prometheus.js


import axios from "axios";

// Prometheus base URL - from .env or fallback
const prometheusURL = process.env.NEXT_PUBLIC_PROMETHEUS_URL || "http://localhost:30090";

/**
 * Generic function to fetch metrics from Prometheus.
 * @param {string} query - The PromQL query to execute.
 * @returns {Promise<Array>} - The result of the PromQL query.
 */
export const fetchMetrics = async (query) => {
  try {
    const res = await axios.get(`${prometheusURL}/api/v1/query`, {
      params: { query },
    });
    if (res.data.status === "success") {
      return res.data.data.result;
    }
    console.error("Error in Prometheus query response:", res.data);
    return [];
  } catch (error) {
    console.error("Error fetching Prometheus metrics:", error.message);
    return [];
  }
};

// Specific Metric Queries
export const fetchCPUUsage = async () => {
  return fetchMetrics('rate(container_cpu_usage_seconds_total[5m])');
};

export const fetchMemoryUsage = async () => {
  return fetchMetrics('container_memory_usage_bytes');
};

export const fetchMemoryLimit = async () => {
  return fetchMetrics('container_spec_memory_limit_bytes');
};

export const fetchNetworkReceive = async () => {
  return fetchMetrics('rate(container_network_receive_bytes_total[5m])');
};

export const fetchNetworkTransmit = async () => {
  return fetchMetrics('rate(container_network_transmit_bytes_total[5m])');
};

export const fetchFilesystemUsage = async () => {
  return fetchMetrics('container_fs_usage_bytes');
};

export const fetchFilesystemLimit = async () => {
  return fetchMetrics('container_fs_limit_bytes');
};

export const fetchIORead = async () => {
  return fetchMetrics('rate(container_fs_reads_bytes_total[5m])');
};

export const fetchIOWrite = async () => {
  return fetchMetrics('rate(container_fs_writes_bytes_total[5m])');
};

export const fetchCustomMetric = async (metricName) => {
  return fetchMetrics(metricName);
};
