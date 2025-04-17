// "use client";
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import styles from './view.module.css'; // Import the CSS module
// import Navbar from '../../components/Navbar'; // Ensure the path to Navbar is correct

// const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

// const TicketDetailPage = () => {
//     const searchParams = useSearchParams();
//     const ticket_number = searchParams.get("ticket_number");

//     const [ticket, setTicket] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchTicket = async () => {
//             try {
//                 const response = await fetch(`${apiBaseUrl}/view-tickets?ticket_number=${ticket_number}`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error("Failed to fetch ticket");
//                 }

//                 const data = await response.json();

//                 // Filter to find the ticket with matching ticket_number
//                 const matchedTicket = data.tickets.find(t => t.ticket_number === ticket_number);

//                 setTicket(matchedTicket);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (ticket_number) {
//             fetchTicket();
//         }
//     }, [ticket_number]);

//     if (loading) return <div className={styles.loading}>Loading...</div>;
//     if (error) return <div className={styles.error}>Error: {error}</div>;
//     if (!ticket) return <div className={styles.noTicket}>No ticket found.</div>;

//     return (
//         <>
//             <Navbar /> {/* Add Navbar component here */}
//             <div className={styles.ticketDetailContainer}>
//                 <h1 className={styles.ticketDetailHeader}>Ticket Detail's</h1>
//                 <table className={styles.ticketDetailTable}>
//                     <tbody>
//                         <tr>
//                             <th>Title</th>
//                             <td>{ticket.title}</td>
//                         </tr>
//                         <tr>
//                             <th>Description</th>
//                             <td>{ticket.description}</td>
//                         </tr>
//                         <tr>
//                             <th>Category</th>
//                             <td>{ticket.category}</td>
//                         </tr>
//                         <tr>
//                             <th>Priority</th>
//                             <td>{ticket.priority}</td>
//                         </tr>
//                         <tr>
//                             <th>User</th>
//                             <td>{ticket.user}</td>
//                         </tr>
//                         <tr>
//                             <th>Created At</th>
//                             <td>{new Date(ticket.created_at).toLocaleString()}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// };

// export default TicketDetailPage;

"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from './view.module.css';
import Navbar from '../../components/Navbar';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

function TicketDetailContent() {
  const searchParams = useSearchParams();
  const ticket_number = searchParams.get("ticket_number");

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/view-tickets?ticket_number=${ticket_number}`);
        const data = await response.json();
        const matchedTicket = data.tickets.find(t => t.ticket_number === ticket_number);
        setTicket(matchedTicket);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (ticket_number) fetchTicket();
  }, [ticket_number]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!ticket) return <div className={styles.noTicket}>No ticket found.</div>;

  return (
    <>
      <Navbar />
      <div className={styles.ticketDetailContainer}>
        <h1 className={styles.ticketDetailHeader}>Ticket Detail's</h1>
        <table className={styles.ticketDetailTable}>
          <tbody>
            <tr><th>Title</th><td>{ticket.title}</td></tr>
            <tr><th>Description</th><td>{ticket.description}</td></tr>
            <tr><th>Category</th><td>{ticket.category}</td></tr>
            <tr><th>Priority</th><td>{ticket.priority}</td></tr>
            <tr><th>User</th><td>{ticket.user}</td></tr>
            <tr><th>Created At</th><td>{new Date(ticket.created_at).toLocaleString()}</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading ticket details...</div>}>
      <TicketDetailContent />
    </Suspense>
  );
}
