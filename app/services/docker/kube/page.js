// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   fetchTotalPods,
//   fetchNamespaceList,
//   fetchPodCountPerNamespace,
//   fetchCPUUsage,
//   fetchMemoryUsage,
//   fetchContainerRestarts,
//   fetchTotalServices,
//   fetchServicesPerNamespace,
//   fetchTotalIngresses,
//   fetchIngressesPerNamespace,
// } from "../api/prometheus";

// const Overview = ({ env }) => {
//   const [metrics, setMetrics] = useState({
//     totalPods: [],
//     namespaces: [],
//     podsPerNamespace: [],
//     containerCPU: [],
//     containerMemory: [],
//     restarts: [],
//     totalServices: [],
//     servicesPerNamespace: [],
//     totalIngresses: [],
//     ingressesPerNamespace: [],
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAllMetrics = async () => {
//       setLoading(true);
//       try {
//         const [
//           totalPods,
//           namespaces,
//           podsPerNamespace,
//           containerCPU,
//           containerMemory,
//           restarts,
//           totalServices,
//           servicesPerNamespace,
//           totalIngresses,
//           ingressesPerNamespace,
//         ] = await Promise.all([
//           fetchTotalPods({ env }),
//           fetchNamespaceList({ env }),
//           fetchPodCountPerNamespace({ env }),
//           fetchCPUUsage({ env }),
//           fetchMemoryUsage({ env }),
//           fetchContainerRestarts({ env }),
//           fetchTotalServices({ env }),
//           fetchServicesPerNamespace({ env }),
//           fetchTotalIngresses({ env }),
//           fetchIngressesPerNamespace({ env }),
//         ]);

//         setMetrics({
//           totalPods,
//           namespaces,
//           podsPerNamespace,
//           containerCPU,
//           containerMemory,
//           restarts,
//           totalServices,
//           servicesPerNamespace,
//           totalIngresses,
//           ingressesPerNamespace,
//         });
//       } catch (err) {
//         console.error("Failed to fetch Prometheus data", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllMetrics();
//   }, [env]);

//   const MetricCard = ({ title, value }) => (
//     <div className="p-6 rounded-2xl shadow bg-gray-800 border border-gray-700 hover:shadow-lg transition-shadow duration-300">
//       <h3 className="text-lg font-medium text-gray-300">{title}</h3>
//       <p className="text-3xl font-bold text-indigo-400 mt-2">{value}</p>
//     </div>
//   );

//   return (
//     <div className="p-8 bg-gray-900 min-h-screen text-white">
//       <h2 className="text-3xl font-extrabold text-white mb-6">
//         Cluster Overview <span className="text-indigo-400">({env})</span>
//       </h2>

//       {loading ? (
//         <p className="text-gray-400 text-lg">Loading metrics...</p>
//       ) : (
//         <div className="space-y-10">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             <MetricCard title="Total Pods" value={metrics.totalPods?.[0]?.value?.[1] || "0"} />
//             <MetricCard title="Namespace Count" value={metrics.namespaces?.[0]?.value?.[1] || "0"} />
//             <MetricCard title="Total Services" value={metrics.totalServices?.[0]?.value?.[1] || "0"} />
//             <MetricCard title="Total Ingresses" value={metrics.totalIngresses?.[0]?.value?.[1] || "0"} />
//           </div>

//           <Section title="Pods per Namespace" data={metrics.podsPerNamespace} unit="pods" />
//           <Section title="Services per Namespace" data={metrics.servicesPerNamespace} unit="services" />
//           <Section title="Ingresses per Namespace" data={metrics.ingressesPerNamespace} unit="ingresses" />

//           {/* Scrollable metric sections with sticky headers */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <StickySection
//               title="CPU Usage per Container"
//               data={metrics.containerCPU}
//               format={(v) => `${parseFloat(v).toFixed(4)} cores`}
//             />
//             <StickySection
//               title="Memory Usage per Container"
//               data={metrics.containerMemory}
//               format={(v) => `${(parseFloat(v) / 1024 ** 2).toFixed(2)} MiB`}
//             />
//           </div>

//           <StickySection
//             title="Container Restarts"
//             data={metrics.restarts}
//             format={(v) => `${parseInt(v, 10)} restarts`}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// // Standard section (not scrollable)
// const Section = ({ title, data, unit, format }) => (
//   <div>
//     <h3 className="text-xl font-semibold text-gray-200 mb-3">{title}</h3>
//     <ul className="space-y-2">
//       {data.map((item, idx) => {
//         const name = item.metric?.namespace || item.metric?.container || `Item ${idx}`;
//         const value = item.value?.[1] || "0";
//         return (
//           <li
//             key={name}
//             className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-sm text-gray-300"
//           >
//             <span className="font-medium text-white">{name}</span>:{" "}
//             {format ? format(value) : `${value} ${unit}`}
//           </li>
//         );
//       })}
//     </ul>
//   </div>
// );

// // Scrollable section with sticky heading
// const StickySection = ({ title, data, format }) => (
//   <div className="max-h-80 overflow-y-auto pr-2 border border-gray-700 rounded-xl bg-gray-800 shadow">
//     <div className="sticky top-0 z-10 bg-gray-800 p-3 border-b border-gray-700">
//       <h3 className="text-lg font-semibold text-white">{title}</h3>
//     </div>
//     <ul className="p-3 space-y-2">
//       {data.map((item, idx) => {
//         const name = item.metric?.container || item.metric?.namespace || `Item ${idx}`;
//         const value = item.value?.[1] || "0";
//         return (
//           <li
//             key={name}
//             className="text-sm text-gray-300 bg-gray-900 border border-gray-700 p-2 rounded-md"
//           >
//             <span className="font-medium text-white">{name}</span>: {format ? format(value) : value}
//           </li>
//         );
//       })}
//     </ul>
//   </div>
// );

// export default Overview;

"use client";

import React, { useEffect, useState } from "react";
import {
  fetchTotalPods,
  fetchNamespaceList,
  fetchPodCountPerNamespace,
  fetchCPUUsage,
  fetchMemoryUsage,
  fetchContainerRestarts,
  fetchTotalServices,
  fetchServicesPerNamespace,
  fetchTotalIngresses,
  fetchIngressesPerNamespace,
} from "../api/prometheus";

const Overview = () => {
  const [metrics, setMetrics] = useState({
    totalPods: [],
    namespaces: [],
    podsPerNamespace: [],
    containerCPU: [],
    containerMemory: [],
    restarts: [],
    totalServices: [],
    servicesPerNamespace: [],
    totalIngresses: [],
    ingressesPerNamespace: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMetrics = async () => {
      setLoading(true);
      try {
        const [
          totalPods,
          namespaces,
          podsPerNamespace,
          containerCPU,
          containerMemory,
          restarts,
          totalServices,
          servicesPerNamespace,
          totalIngresses,
          ingressesPerNamespace,
        ] = await Promise.all([
          fetchTotalPods(),
          fetchNamespaceList(),
          fetchPodCountPerNamespace(),
          fetchCPUUsage(),
          fetchMemoryUsage(),
          fetchContainerRestarts(),
          fetchTotalServices(),
          fetchServicesPerNamespace(),
          fetchTotalIngresses(),
          fetchIngressesPerNamespace(),
        ]);

        setMetrics({
          totalPods,
          namespaces,
          podsPerNamespace,
          containerCPU,
          containerMemory,
          restarts,
          totalServices,
          servicesPerNamespace,
          totalIngresses,
          ingressesPerNamespace,
        });
      } catch (err) {
        console.error("Failed to fetch Prometheus data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMetrics();
  }, []);

  const MetricCard = ({ title, value }) => (
    <div className="p-6 rounded-2xl shadow bg-gray-800 border border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-medium text-gray-300">{title}</h3>
      <p className="text-3xl font-bold text-indigo-400 mt-2">{value}</p>
    </div>
  );

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-extrabold text-white mb-6">Cluster Overview</h2>

      {loading ? (
        <p className="text-gray-400 text-lg">Loading metrics...</p>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard title="Total Pods" value={metrics.totalPods?.[0]?.value?.[1] || "0"} />
            <MetricCard title="Namespace Count" value={metrics.namespaces?.[0]?.value?.[1] || "0"} />
            <MetricCard title="Total Services" value={metrics.totalServices?.[0]?.value?.[1] || "0"} />
            <MetricCard title="Total Ingresses" value={metrics.totalIngresses?.[0]?.value?.[1] || "0"} />
          </div>

          <Section title="Pods per Namespace" data={metrics.podsPerNamespace} unit="pods" />
          <Section title="Services per Namespace" data={metrics.servicesPerNamespace} unit="services" />
          <Section title="Ingresses per Namespace" data={metrics.ingressesPerNamespace} unit="ingresses" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StickySection
              title="CPU Usage per Container"
              data={metrics.containerCPU}
              format={(v) => `${parseFloat(v).toFixed(4)} cores`}
            />
            <StickySection
              title="Memory Usage per Container"
              data={metrics.containerMemory}
              format={(v) => `${(parseFloat(v) / 1024 ** 2).toFixed(2)} MiB`}
            />
          </div>

          <StickySection
            title="Container Restarts"
            data={metrics.restarts}
            format={(v) => `${parseInt(v, 10)} restarts`}
          />
        </div>
      )}
    </div>
  );
};

const Section = ({ title, data, unit, format }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-200 mb-3">{title}</h3>
    <ul className="space-y-2">
      {data.map((item, idx) => {
        const name = item.metric?.namespace || item.metric?.container || `Item ${idx}`;
        const value = item.value?.[1] || "0";
        return (
          <li
            key={name}
            className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-sm text-gray-300"
          >
            <span className="font-medium text-white">{name}</span>:{" "}
            {format ? format(value) : `${value} ${unit}`}
          </li>
        );
      })}
    </ul>
  </div>
);

const StickySection = ({ title, data, format }) => (
  <div className="max-h-80 overflow-y-auto pr-2 border border-gray-700 rounded-xl bg-gray-800 shadow">
    <div className="sticky top-0 z-10 bg-gray-800 p-3 border-b border-gray-700">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <ul className="p-3 space-y-2">
      {data.map((item, idx) => {
        const name = item.metric?.container || item.metric?.namespace || `Item ${idx}`;
        const value = item.value?.[1] || "0";
        return (
          <li
            key={name}
            className="text-sm text-gray-300 bg-gray-900 border border-gray-700 p-2 rounded-md"
          >
            <span className="font-medium text-white">{name}</span>: {format ? format(value) : value}
          </li>
        );
      })}
    </ul>
  </div>
);

export default Overview;
