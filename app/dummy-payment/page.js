"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './DummyPayment.module.css';
import { IoClose } from "react-icons/io5";
import Navbar from '../components/Navbar';

export default function DummyPayment() {
  console.log('Styles object:', styles);
  // State declarations for managing payment flow and UI
  const [upiId, setUpiId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [isValidUpi, setIsValidUpi] = useState(true);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(''); // State for the username
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  // Initial setup effect: Authentication check and payment ID generation
  useEffect(() => {
    // Verify user authentication and retrieve username from localStorage
    const getUserFromStorage = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.name) {
          setUsername(user.name);
          setAuthChecked(true);
        } else {
          router.replace('/login');
        }
      } else {
        router.replace('/login');
      }
    };

    // Generate unique payment ID using crypto
    const generatePaymentId = () => {
      const array = new Uint8Array(8);
      crypto.getRandomValues(array);
      const hexString = Array.from(array)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      setPaymentId(hexString);
      sessionStorage.setItem('currentPaymentId', hexString);
    };

    getUserFromStorage();
    generatePaymentId();
  }, [router]);

  // Navigation protection effect: Handle page refresh and back navigation
  useEffect(() => {
    // Prevent accidental page refresh
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    // Show confirmation popup when user tries to navigate away
    const handlePopState = () => {
      setShowConfirmPopup(true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.href);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [paymentId, router]);

  // UPI validation helper function
  const validateUpiId = (upi) => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    return upiRegex.test(upi);
  };

  // Event handlers for user interactions
  const handleUpiChange = (e) => {
    const value = e.target.value.trim();
    setUpiId(value);
    setIsValidUpi(value ? validateUpiId(value) : true);
  };

  // API integration: Save payment status to backend
  const savePaymentStatus = async (status) => {
    try {
      // Determine subscription status as a string
      const subscribed = status === 'success' ? 'yes' : 'no';

      const response = await fetch('http://localhost:3001/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_id: paymentId,
          user_id: username,
          status: status,
          amount: 499,
          created_at: new Date().toISOString(),
          subscribed: subscribed
        }),
      });

      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to save payment status');
      }

      return responseData;
    } catch (error) {
      console.error('Error saving payment status:', error.message);
      throw error;
    }
  };

  // Payment processing handler
  const handlePayment = async () => {
    // Simulate payment processing with 50% success rate
    setLoading(true);
    console.log(`Processing payment with ID: ${paymentId}`);

    try {
      setTimeout(async () => {
       // const isSuccess = Math.random() > 0.5;
       const isSuccess = Math.random() > 0.5;
        const status = isSuccess ? 'success' : 'failed';
        
        try {
          await savePaymentStatus(status);
          setLoading(false);
          
          if (isSuccess) {
            router.push('/services');
          } else {
            router.push(`/payment-failed?paymentId=${paymentId}`);
          }
        } catch (error) {
          setLoading(false);
          // Handle the error appropriately, maybe show an error message to the user
          console.error('Payment processing failed:', error);
          router.push(`/payment-failed?paymentId=${paymentId}`);
        }
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error('Payment processing failed:', error);
      router.push(`/payment-failed?paymentId=${paymentId}`);
    }
  };

  // Navigation popup handlers
  const handlePopupAction = async (confirmed) => {
    setShowConfirmPopup(false);
    if (confirmed) {
      try {
        await savePaymentStatus('cancelled');
        // Force navigation using replace to avoid history stack issues
        router.replace(`/payment-failed?paymentId=${paymentId}`);
      } catch (error) {
        console.error('Error handling popup action:', error);
        // Still navigate even if saving status fails
        router.replace(`/payment-failed?paymentId=${paymentId}`);
      }
    } else {
      window.history.pushState(null, '', window.location.href);
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(true);
  };

  // Authentication check render
  if (!authChecked) {
    return (
      <div className={styles.loginPromptContainer}>
        <div className={styles.loginPrompt}>
          <h2 className={styles.loginPromptText}>Please Login First</h2>
          <p className={styles.loginPromptSubtext}>You need to be logged in to access this page</p>
          <button 
            className={styles.loginButton}
            onClick={() => router.replace('/login')}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Main component render
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.heading}>Enter UPI ID</h1>
            <div className={styles.cancelIcon} onClick={handleCancel}>
              <IoClose size={24} color="red" />
            </div>
          </div>
          <input
            type="text"
            placeholder="example@upi"
            value={upiId}
            onChange={handleUpiChange}
            className={`${styles.input} ${!isValidUpi && upiId ? styles.error : ''}`}
          />
          {!isValidUpi && upiId && (
            <p className={styles.errorText}>Please enter a valid UPI ID</p>
          )}
          <button
            className={`${styles.button} ${loading ? styles.loading : ''}`}
            onClick={handlePayment}
            disabled={!upiId || loading || !isValidUpi}
          >
            {loading ? 'Processing...' : 'Pay ₹499'}
          </button>
          <p className={styles.paymentId}>Payment ID: {paymentId}</p>
        </div>
        
        {showConfirmPopup && (
          <div className={styles.overlay}>
            <div className={styles.popup}>
              <div className={styles.popupHeader}>
                <h2>Confirm Navigation</h2>
                <div className={styles.closeIcon} onClick={() => handlePopupAction(false)}>
                  <IoClose size={20} />
                </div>
              </div>
              <div className={styles.popupContent}>
                <p>Are you sure you want to leave? This will cancel your payment.</p>
              </div>
              <div className={styles.popupActions}>
                <button 
                  className={`${styles.popupButton} ${styles.cancelButton}`}
                  onClick={() => handlePopupAction(false)}
                >
                  Stay Here
                </button>
                <button 
                  className={`${styles.popupButton} ${styles.confirmButton}`}
                  onClick={() => handlePopupAction(true)}
                >
                  Leave Page
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
