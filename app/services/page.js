"use client"; // Ensure this is treated as a client-side component

import { useRouter } from 'next/navigation'; // Import the useRouter hook from next/navigation
import ServersMonitor from '../components/Services/ServersMonitor';
import MicroservicesMonitor from '../components/Services/MicroservicesMonitor';
import KubernetesMonitor from '../components/Services/KubernetesMonitor';
import styles from './styles/Services.module.css';
import Navbar from '../components/Navbar';

export default function Services() {
   const router = useRouter(); // Now you can use the router here

  return (
    <div className={styles.container}>
      <div>
        <Navbar/>
        <div className={styles.lightGreyBackground} style={{ marginTop: '20px' }}>
        <h1 className={styles.title}>Services Monitoring</h1>
          <div className={styles.greyBox}>
            <div className={styles.cardGrid}>
              <div className={`${styles.card} ${styles.greyBackground}`} onClick={() => router.push('/services/docker')}>
                  <MicroservicesMonitor />
              </div>
              <div className={`${styles.card} ${styles.greyBackground}`} onClick={() => router.push('/services/docker')}>
                  <KubernetesMonitor />
              </div>
              <div className={`${styles.card} ${styles.greyBackground}`} onClick={() => router.push('/services/docker')}>
                  <ServersMonitor />
              </div>
          </div>
        </div>
        </div>
        
        
      </div>
      
    </div>
  );
}
