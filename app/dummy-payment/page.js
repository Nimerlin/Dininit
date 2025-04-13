"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './DummyPayment.module.css';
import { IoClose } from "react-icons/io5";
import Navbar from '../components/Navbar';

export default function DummyPayment() {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [isValidUpi, setIsValidUpi] = useState(true);

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isValidCard, setIsValidCard] = useState(true);

  const [paymentId, setPaymentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [authChecked, setAuthChecked] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const [price, setPrice] = useState('499');
  const router = useRouter();

  useEffect(() => {
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

    const generatePaymentId = () => {
      const array = new Uint8Array(8);
      crypto.getRandomValues(array);
      const hexString = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
      setPaymentId(hexString);
      sessionStorage.setItem('currentPaymentId', hexString);
    };

    const extractPrice = () => {
      const url = new URL(window.location.href);
      setPrice(url.searchParams.get('price') || '499');
    };

    getUserFromStorage();
    generatePaymentId();
    extractPrice();
  }, [router]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

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

  const validateUpiId = (upi) => /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(upi);
  const validateCardDetails = () => {
    return (
      /^\d{16}$/.test(cardNumber.replace(/\s/g, '')) &&
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) &&
      /^\d{3}$/.test(cvv)
    );
  };

  const formatCardNumber = (num) =>
    num.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (val) => {
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  };

  const handleUpiChange = (e) => {
    const value = e.target.value.trim();
    setUpiId(value);
    setIsValidUpi(value ? validateUpiId(value) : true);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setIsValidCard(true);
    setIsValidUpi(true);
  };

  const savePaymentStatus = async (status) => {
    try {
      const subscribed = status === 'success' ? 'yes' : 'no';

      const response = await fetch('http://localhost:3001/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_id: paymentId,
          user_id: username,
          status,
          amount: parseInt(price, 10),
          created_at: new Date().toISOString(),
          subscribed
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to save payment');
    } catch (err) {
      console.error('Error saving payment status:', err.message);
      throw err;
    }
  };

  const handlePayment = async () => {
    if (paymentMethod === 'card' && !validateCardDetails()) {
      setIsValidCard(false);
      return;
    }

    if (paymentMethod === 'upi' && !validateUpiId(upiId)) {
      setIsValidUpi(false);
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      const isSuccess = Math.random() > 0.5;
      const status = isSuccess ? 'success' : 'failed';

      try {
        await savePaymentStatus(status);
        router.push(isSuccess ? '/services' : `/payment-failed?paymentId=${paymentId}`);
      } catch {
        router.push(`/payment-failed?paymentId=${paymentId}`);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const handlePopupAction = async (confirmed) => {
    setShowConfirmPopup(false);
    if (confirmed) {
      await savePaymentStatus('cancelled');
      router.replace(`/payment-failed?paymentId=${paymentId}`);
    } else {
      window.history.pushState(null, '', window.location.href);
    }
  };

  const isPayDisabled = loading || 
    (paymentMethod === 'upi' && (!upiId || !validateUpiId(upiId))) ||
    (paymentMethod === 'card' && !validateCardDetails());

  if (!authChecked) {
    return (
      <div className={styles.loginPromptContainer}>
        <div className={styles.loginPrompt}>
          <h2 className={styles.loginPromptText}>Please Login First</h2>
          <button className={styles.loginButton} onClick={() => router.replace('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>Select Payment Method</h1>
            <div className={styles.cancelIcon} onClick={() => setShowConfirmPopup(true)}>
              <IoClose size={24} color="red" />
            </div>
          </div>

          <div className={styles.tabGroup}>
            <button
              className={`${styles.tab} ${paymentMethod === 'upi' ? styles.activeTab : ''}`}
              onClick={() => handlePaymentMethodChange('upi')}
            >
              UPI
            </button>
            <button
              className={`${styles.tab} ${paymentMethod === 'card' ? styles.activeTab : ''}`}
              onClick={() => handlePaymentMethodChange('card')}
            >
              Card
            </button>
          </div>

          {paymentMethod === 'upi' ? (
            <>
              <input
                type="text"
                placeholder="example@upi"
                value={upiId}
                onChange={handleUpiChange}
                className={`${styles.input} ${!isValidUpi && upiId ? styles.error : ''}`}
              />
              {!isValidUpi && <p className={styles.errorText}>Invalid UPI ID</p>}
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Card Number"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className={`${styles.input} ${!isValidCard ? styles.error : ''}`}
              />
              <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                className={`${styles.input} ${!isValidCard ? styles.error : ''}`}
              />
              <input
                type="password"
                placeholder="CVV"
                maxLength={3}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className={`${styles.input} ${!isValidCard ? styles.error : ''}`}
              />
              {!isValidCard && <p className={styles.errorText}>Invalid Card Details</p>}
            </>
          )}

          <button
            className={`${styles.button} ${loading ? styles.loading : ''}`}
            onClick={handlePayment}
            disabled={isPayDisabled}
          >
            {loading ? 'Processing...' : `Pay ₹${price}`}
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
                <button className={`${styles.popupButton} ${styles.cancelButton}`} onClick={() => handlePopupAction(false)}>
                  Stay Here
                </button>
                <button className={`${styles.popupButton} ${styles.confirmButton}`} onClick={() => handlePopupAction(true)}>
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
