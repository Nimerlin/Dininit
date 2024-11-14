// pages/services.js

"use client"; // To ensure compatibility with React hooks

import ServersMonitor from '../components/Services/ServersMonitor';
import MicroservicesMonitor from '../components/Services/MicroservicesMonitor';
import KubernetesMonitor from '../components/Services/KubernetesMonitor';
import styles from '../components/Services/styles/Services.module.css';

export default function Services() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Services Monitoring</h1>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <ServersMonitor />
        </div>
        <div className={styles.card}>
          <MicroservicesMonitor />
        </div>
        <div className={styles.card}>
          <KubernetesMonitor />
        </div>
      </div>
    </div>
  );
}
