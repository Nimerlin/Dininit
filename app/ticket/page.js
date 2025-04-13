"use client"; // Ensure it's treated as a client component

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from './ticket.module.css'; // Import CSS Module
import Navbar from '../components/Navbar'; // Import Navbar component

export default function TicketPage() {
  // State variables
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add authentication state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    attachment: null,
    ticket_number: '', // Initially empty
    user: 'Nilesh' // Added user
  });

  // Check if user is authenticated
  useEffect(() => {
    const userString = localStorage.getItem('user'); // Retrieve user from local storage
    if (userString) {
      const user = JSON.parse(userString); // Parse the JSON string
      setIsAuthenticated(true);
      setFormData(prevData => ({ ...prevData, user: user.name })); // Set only the name in formData
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate the ticket number before sending the request
    const ticketNumber = `DINIT${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${Math.floor(Math.random() * 1000)}`;
    
    // Update formData with the generated ticket number
    const updatedFormData = { ...formData, ticket_number: ticketNumber };

    try {
      const response = await fetch('http://localhost:3001/api/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData), // Use updated formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      setSubmitStatus({ type: 'success', message: `Your ticket number is: ${ticketNumber}` });
      resetForm();
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to submit ticket. Please try again.' });
    }
    setIsSubmitting(false);
  };

  // Function to reset the form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      attachment: null,
      ticket_number: '', // Reset to empty
      user: 'Nilesh' // Keep user as 'Nilesh'
    });
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  if (!isAuthenticated) {
    return <div className={styles.loginMessage}> 404 !!!!! Please log in to access this page.</div>; // Render styled message if not authenticated
  }

  return (
    <>
      <Navbar /> {/* Add Navbar component here */}
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Raise a Ticket</h1>
          <p className={styles.subtitle}>Submit your request and we'll get back to you as soon as possible.</p>

          {submitStatus && (
            <div className={`${styles.status} ${styles[submitStatus.type]}`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Ticket Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Brief description of the issue"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category">Category*</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                <option value="it">IT Support</option>
                <option value="hr">HR</option>
                <option value="facilities">Facilities</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="priority">Priority Level*</label>
              <div className={styles.radioGroup}>
                {['low', 'medium', 'high', 'critical'].map((priority) => (
                  <label key={priority} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      checked={formData.priority === priority}
                      onChange={handleInputChange}
                    />
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Please provide detailed information about your issue"
                rows={5}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="attachment">Attachment</label>
              <input
                type="file"
                id="attachment"
                name="attachment"
                onChange={(e) => setFormData({...formData, attachment: e.target.files[0]})}
                className={styles.fileInput}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button 
                type="button" 
                onClick={resetForm}
                className={styles.resetButton}
              >
                Reset
              </button>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}