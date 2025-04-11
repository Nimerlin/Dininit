"use client";
import React, { useEffect, useState } from 'react';
import styles from './view-tickets.module.css'; // Ensure this path is correct
import Navbar from '../components/Navbar';

const TicketsPage = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
   // Add authentication state

    useEffect(() => {
        const userString = localStorage.getItem('user'); // Retrieve user from local storage
        if (userString) {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return; // Only fetch tickets if authenticated

        const fetchTickets = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/view-tickets`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch tickets');
                }

                const data = await response.json();
                const user = JSON.parse(localStorage.getItem('user'));
                const userTickets = data.tickets.filter(ticket => ticket.user === user.name);
                setTickets(userTickets);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <div className={styles.loginMessage}>404 !!!!! Please log in to access this page.</div>; // Render styled message if not authenticated
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Navbar /> {/* Add Navbar component here */}
            <div className={styles.ticketsPage}>
                <h1>Your Tickets</h1>
                <table className={styles.ticketsTable}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Attachment</th>
                            <th>Ticket Number</th>
                            <th>User</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket, index) => (
                            <tr key={ticket.id || index} className={styles.ticketRow}>
                                <td>{ticket.title}</td>
                                <td>{ticket.description}</td>
                                <td>{ticket.category}</td>
                                <td>{ticket.priority}</td>
                                <td>{ticket.attachment ? <a href={ticket.attachment}>View</a> : 'None'}</td>
                                <td>{ticket.ticket_number}</td>
                                <td>{ticket.user}</td>
                                <td>{new Date(ticket.created_at).toLocaleString()}</td>
                                <td> <a href={`/view-tickets/view/?ticket_number=${ticket.ticket_number}`}>View</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TicketsPage;