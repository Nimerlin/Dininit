"use client";
import Link from 'next/link';
import styles from './Subscription.module.css';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function Subscription() {
  const router = useRouter();
  
  const handleProceed = (plan,price) => {
    // Redirect to the dummy payment page with the selected plan
    router.push(`/dummy-payment?plan=${plan}&price=${price}`);
  };

  const plans = [
    { name: "Basic", displayPrice: "₹199 / month", numericPrice: 199, description: "Access to basic features and content." },
    { name: "Standard", displayPrice: "₹499 / month", numericPrice: 499, description: "Unlock all features and premium content." },
    { name: "Premium", displayPrice: "₹999 / month", numericPrice: 999, description: "All features and priority support." }
  ];
  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.container}>
        {plans.map((plan, index) => (
          <div key={index} className={styles.card}>
            <h1>{plan.name} Plan</h1>
            <p className={styles.price}>{plan.displayPrice}</p>
            <p className={styles.description}>{plan.description}</p>
            <button className={styles.buyButton} onClick={() => handleProceed(plan.name,plan.numericPrice)}>Buy Now</button>
          </div>
        ))}
      </div>
    </>
  );
}
