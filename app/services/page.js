"use client"; // Ensure this is treated as a client-side component

import { useRouter } from 'next/router'; // Import the useRouter hook
import ServersMonitor from '../components/Services/ServersMonitor';
import MicroservicesMonitor from '../components/Services/MicroservicesMonitor';
import KubernetesMonitor from '../components/Services/KubernetesMonitor';
import styles from '../components/Services/styles/Services.module.css';

export default function Services() {
  const router = useRouter(); // Now you can use the router here

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Services Monitoring</h1>
      <div className={styles.cardGrid}>
        {/* <div className={styles.card} onClick={() => router.push('/servers')}>
          <ServersMonitor />
        </div> */}
        <div className={styles.card} onClick={() => router.push('/docker')}>
          <MicroservicesMonitor />
        </div>
        {/* <div className={styles.card} onClick={() => router.push('/kubernetes')}>
          <KubernetesMonitor />
        </div> */}
      </div>
    </div>
  );
}
