// import axios from "axios";

// // Prometheus base URL - from .env or fallback
// const prometheusBase = process.env.NEXT_PUBLIC_PROMETHEUS_URL || "http://localhost:9090/prometheus";

// /**
//  * Generic function to fetch metrics from Prometheus.
//  * @param {string} query - The PromQL query to execute.
//  * @returns {Promise<Array>} - The result of the PromQL query.
//  */
// export const fetchMetrics = async (query) => {
//   try {
//     const res = await axios.get(`${prometheusBase}/api/v1/query`, {
//       params: { query },
//     });
//     if (res.data.status === "success") {
//       return res.data.data.result;
//     }
//     console.error("Error in Prometheus query response:", res.data);
//     return [];
//   } catch (error) {
//     console.error("Error fetching Prometheus metrics:", error.message);
//     return [];
//   }
// };

// // Specific Metric Queries
// export const fetchCPUUsage = async () => {
//   return fetchMetrics('rate(container_cpu_usage_seconds_total[5m])');
// };

// export const fetchMemoryUsage = async () => {
//   return fetchMetrics('container_memory_usage_bytes');
// };

// export const fetchMemoryLimit = async () => {
//   return fetchMetrics('container_spec_memory_limit_bytes');
// };

// export const fetchNetworkReceive = async () => {
//   return fetchMetrics('rate(container_network_receive_bytes_total[5m])');
// };

// export const fetchNetworkTransmit = async () => {
//   return fetchMetrics('rate(container_network_transmit_bytes_total[5m])');
// };

// export const fetchFilesystemUsage = async () => {
//   return fetchMetrics('container_fs_usage_bytes');
// };

// export const fetchFilesystemLimit = async () => {
//   return fetchMetrics('container_fs_limit_bytes');
// };

// export const fetchIORead = async () => {
//   return fetchMetrics('rate(container_fs_reads_bytes_total[5m])');
// };

// export const fetchIOWrite = async () => {
//   return fetchMetrics('rate(container_fs_writes_bytes_total[5m])');
// };

// export const fetchCustomMetric = async (metricName) => {
//   return fetchMetrics(metricName);
// };

// utils/prometheus.js
import axios from "axios";

const prometheusBase = process.env.NEXT_PUBLIC_PROMETHEUS_URL || "http://localhost:9090/prometheus";

const sanitizeLabelValue = (value) => {
  return /^[\w-]+$/.test(value) ? value : null;
};

const applyLabelFilters = (query, filters = {}) => {
  const sanitizedFilters = Object.entries(filters)
    .map(([key, val]) => [key, sanitizeLabelValue(val)])
    .filter(([_, val]) => val);

  if (sanitizedFilters.length === 0) return query;

  const labelStr = sanitizedFilters
    .map(([key, val]) => `${key}="${val}"`)
    .join(",");

  return query.replace(/({[^}]*})?/, (match) => {
    const inside = match ? match.slice(1, -1).trim() : "";
    const separator = inside ? "," : "";
    return `{${inside}${separator}${labelStr}}`;
  });
};

const fetchMetrics = async (query, labels = {}) => {
  const filteredQuery = applyLabelFilters(query, labels);
  try {
    const res = await axios.get(`${prometheusBase}/api/v1/query`, {
      params: { query: filteredQuery },
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

// Cluster-level Metrics
export const fetchNamespaceList = async (labels = {}) => {
  return fetchMetrics("count(count by(namespace) (kube_pod_info))", labels);
};

export const fetchPodCountPerNamespace = async (labels = {}) => {
  return fetchMetrics("count by(namespace) (kube_pod_info)", labels);
};

export const fetchTotalPods = async (labels = {}) => {
  return fetchMetrics("count(kube_pod_info)", labels);
};

// Container-level Metrics
export const fetchCPUUsage = async (labels = {}) => {
  return fetchMetrics("rate(container_cpu_usage_seconds_total[1m])", labels);
};

export const fetchMemoryUsage = async (labels = {}) => {
  return fetchMetrics("container_memory_usage_bytes", labels);
};

export const fetchContainerRestarts = async (labels = {}) => {
  return fetchMetrics("rate(kube_pod_container_status_restarts_total[5m])", labels);
};

// Optional Additional Metrics
export const fetchMemoryLimit = async (labels = {}) => {
  return fetchMetrics("container_spec_memory_limit_bytes", labels);
};

export const fetchNetworkReceive = async (labels = {}) => {
  return fetchMetrics("rate(container_network_receive_bytes_total[5m])", labels);
};

export const fetchNetworkTransmit = async (labels = {}) => {
  return fetchMetrics("rate(container_network_transmit_bytes_total[5m])", labels);
};

export const fetchFilesystemUsage = async (labels = {}) => {
  return fetchMetrics("container_fs_usage_bytes", labels);
};

export const fetchFilesystemLimit = async (labels = {}) => {
  return fetchMetrics("container_fs_limit_bytes", labels);
};

export const fetchIORead = async (labels = {}) => {
  return fetchMetrics("rate(container_fs_reads_bytes_total[5m])", labels);
};

export const fetchIOWrite = async (labels = {}) => {
  return fetchMetrics("rate(container_fs_writes_bytes_total[5m])", labels);
};

export const fetchCustomMetric = async (metricName, labels = {}) => {
  return fetchMetrics(metricName, labels);
};

// Service Metrics
export const fetchTotalServices = async (labels = {}) => {
  return fetchMetrics("count(kube_service_info)", labels);
};

export const fetchServicesPerNamespace = async (labels = {}) => {
  return fetchMetrics("count by(namespace) (kube_service_info)", labels);
};

// Ingress Metrics
export const fetchTotalIngresses = async (labels = {}) => {
  return fetchMetrics("count(kube_ingress_info)", labels);
};

export const fetchIngressesPerNamespace = async (labels = {}) => {
  return fetchMetrics("count by(namespace) (kube_ingress_info)", labels);
};
