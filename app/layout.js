// layout.js
"use client"; // Add this to mark the file as a client component

import { Inter } from "next/font/google";
import "./globals.css";
import BottomBar from "./components/BottomBar";
import Header from "./components/Header";
import styles from './styles.module.css';
import { useEffect } from "react";
import gsap from "gsap"; // Import GSAP for animations

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    // GSAP Animation for the main container
    gsap.fromTo(".main-container", { opacity: 0 }, { opacity: 1, duration: 1.5, delay: 0.3 });
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.bodyBackground}`}>
        <main className="main-container min-h-screen flex flex-col max-w-screen-xl mx-auto">
          
          {/* Header at the top */}
            <Header />
            {/* Content Area */}
            <div className="content-area overflow-y-auto p-4 lg:p-10">
              {children}
            </div>

            {/* Bottom Bar */}
          <BottomBar />  {/* Add the BottomBar here */}
          
        </main>
      </body>
    </html>
  );
}
