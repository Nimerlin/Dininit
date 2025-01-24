"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ServersMonitor from '../components/Services/ServersMonitor';
import MicroservicesMonitor from '../components/Services/MicroservicesMonitor';
import KubernetesMonitor from '../components/Services/KubernetesMonitor';
import styles from './styles/Services.module.css';
import Navbar from '../components/Navbar';

export default function Services() {
  // Hooks
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Authentication Effect
  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        console.log("Stored user:", storedUser);
        
        if (!storedUser) {
          router.replace('/login');
          return;
        }

        const user = JSON.parse(storedUser);
        
        const response = await fetch('http://localhost:3001/api/verify-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.name
          })
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(`API returned unexpected content type: ${contentType}`);
        }

        const data = await response.json();
        console.log("Subscription check response:", data);
        
        if (data.subscribed === 'no') {
          console.log("User not subscribed, redirecting to payment");
          router.replace('/payment');
          return;
        }
        setAuthChecked(true);
      } catch (err) {
        console.error("Error:", err.message || err);
        setError('Authentication failed. Please try logging in again.');
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    getUserFromStorage();
  }, [router]);

  // Loading and Error States
  if (isLoading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>{error}</div>;
  if (!authChecked) return null;

  // Main Render
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.lightGreyBackground} style={{ marginTop: '20px' }}>
        <h1 className={styles.title}>Services Monitoring</h1>
        <div className={styles.greyBox}>
          <div className={styles.cardGrid}>
            <div 
              className={`${styles.card} ${styles.greyBackground}`} 
              onClick={() => router.push('/services/docker')}
            >
              <MicroservicesMonitor />
            </div>
            <div 
              className={`${styles.card} ${styles.greyBackground}`} 
              onClick={() => router.push('/services/docker')}
            >
              <KubernetesMonitor />
            </div>
            <div 
              className={`${styles.card} ${styles.greyBackground}`} 
              onClick={() => router.push('/services/docker')}
            >
              <ServersMonitor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
