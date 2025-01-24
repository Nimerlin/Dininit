"use client";
import Link from 'next/link';
import styles from './Subscription.module.css';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function Subscription() {
  const router = useRouter();
  
  const handleProceed = () => {
    router.push('/dummy-payment'); // Redirect to the dummy payment page
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>Subscription Plan</h1>
          <p className={styles.price}>₹499 / month</p>
          <p className={styles.description}>
            Unlock all features and premium content with this subscription plan.
          </p>
         
            <button className={styles.buyButton} onClick={handleProceed}>Buy Now</button>
          
        </div>
      </div>
    </>
  );
}
