"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import styles from "./PaymentFailed.module.css";

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const paymentId = searchParams.get("paymentId");

  useEffect(() => {
    const getUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          router.replace("/login");
          return;
        }

        const user = JSON.parse(storedUser);
        if (!user?.name) {
          throw new Error("Invalid user data");
        }

        setAuthChecked(true);
      } catch (err) {
        setError("Authentication failed. Please try logging in again.");
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    getUserFromStorage();
  }, [router]);

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  if (!authChecked) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Payment Failed</h1>
        <div className={styles.icon}>❌</div>
        <p className={styles.message}>
          Your payment was cancelled or interrupted.
        </p>
        {paymentId && <p className={styles.paymentId}>Payment ID: {paymentId}</p>}
      </div>
    </div>
  );
}

export default function PaymentFailed() {
  return (
    <Suspense fallback={<div className={styles.container}>Loading...</div>}>
      <PaymentFailedContent />
    </Suspense>
  );
}
