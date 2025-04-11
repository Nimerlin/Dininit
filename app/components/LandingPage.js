'use client';

import AnimatedSection from "./AnimatedSection";
import Header from "./landingPage/Header";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styles from './LandingPage.module.css'; // Import the CSS module
import gsap from "gsap"; // GSAP for animations


export default function LandingPage() {
  useEffect(() => {
    // GSAP animations for LandingPage sections
    gsap.fromTo(`.${styles.aboutSection}`, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
    gsap.fromTo(`.${styles.gettingStartedSection}`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, delay: 0.5 });
    gsap.fromTo(`.${styles.contactSection}`, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1 });

    // Animating the boxes with images and text
    gsap.fromTo(`.${styles.box}`, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, delay: 1 });
  }, []);

  return (
    <div className="text-white">
      {/* Header Section */}
      <Header />

      {/* About Section */}
      <section className={`min-h-screen py-16 ${styles.aboutSection}`}>
        <AnimatedSection className="about-section">
          <h2 className="text-4xl font-semibold text-center mb-8">About Dinenit</h2>
          <p className="text-lg max-w-3xl mx-auto text-center mb-6">
            Dinenit is an open-source monitoring tool for tracking your systems, servers, and applications. Visualize real-time performance metrics, receive alerts, and optimize your infrastructure effortlessly.
          </p>
          
          {/* Boxes with Animated GIFs and Text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {/* Box 1 */}
            <div className={`bg-white p-4 rounded-lg shadow-lg text-center hover:scale-105 transform transition-all duration-300 max-w-xs mx-auto ${styles.box}`}>
              <div className="w-full flex justify-center items-center mb-4">
                <Image src="/anim/computer.gif" alt="System Monitoring" width={80} height={80} />
              </div>
              <h3 className="text-xl font-semibold mb-4">System Monitoring</h3>
              <p className="text-lg">Keep an eye on your systems in real time with detailed metrics.</p>
            </div>

            {/* Box 2 */}
            <div className={`bg-white p-4 rounded-lg shadow-lg text-center hover:scale-105 transform transition-all duration-300 max-w-xs mx-auto ${styles.box}`}>
              <div className="w-full flex justify-center items-center mb-4">
                <Image src="/anim/cloud-network.gif" alt="Alert Notifications" width={80} height={80} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Alert Notifications</h3>
              <p className="text-lg">Receive instant notifications for critical issues and take action.</p>
            </div>

            {/* Box 3 */}
            <div className={`bg-white p-4 rounded-lg shadow-lg text-center hover:scale-105 transform transition-all duration-300 max-w-xs mx-auto ${styles.box}`}>
              <div className="w-full flex justify-center items-center mb-4">
                <Image src="/anim/laptop.gif" alt="Data Visualization" width={80} height={80} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Data Visualization</h3>
              <p className="text-lg">Visualize performance metrics with beautiful charts and graphs.</p>
            </div>

            {/* Box 4 */}
            <div className={`bg-white p-4 rounded-lg shadow-lg text-center hover:scale-105 transform transition-all duration-300 max-w-xs mx-auto ${styles.box}`}>
              <div className="w-full flex justify-center items-center mb-4">
                <Image src="/anim/diagram.gif" alt="Performance Optimization" width={80} height={80} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Performance Optimization</h3>
              <p className="text-lg">Optimize your infrastructure with detailed insights and recommendations.</p>
            </div>

            {/* Box 5 */}
            <div className={`bg-white p-4 rounded-lg shadow-lg text-center hover:scale-105 transform transition-all duration-300 max-w-xs mx-auto ${styles.box}`}>
              <div className="w-full flex justify-center items-center mb-4">
                <Image src="/anim/presentation.gif" alt="Infrastructure Monitoring" width={80} height={80} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Infrastructure Monitoring</h3>
              <p className="text-lg">Monitor servers, databases, and applications for optimal performance.</p>
            </div>

            {/* Box 6 */}
            <div className={`bg-white p-4 rounded-lg shadow-lg text-center hover:scale-105 transform transition-all duration-300 max-w-xs mx-auto ${styles.box}`}>
              <div className="w-full flex justify-center items-center mb-4">
                <Image src="/anim/settings.gif" alt="Resource Optimization" width={80} height={80} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Resource Optimization</h3>
              <p className="text-lg">Maximize your resources with intelligent optimization techniques.</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className={`min-h-screen bg-gradient-to-r from-teal-600 to-blue-600 py-16 ${styles.gettingStartedSection}`}>
        <AnimatedSection className="getting-started-section">
          <h2 className="text-4xl font-semibold text-center mb-6 text-white">Getting Started with Dinenit</h2>
          <p className="text-lg max-w-3xl mx-auto text-center mb-6">
            Setting up Dinenit is easy! Just follow the simple steps and you'll be up and running in no time. Start monitoring your systems and applications like a pro.
          </p>
          <Link href="#contact">
            <button className="bg-neon-pink py-3 px-8 text-2xl rounded-lg hover:bg-teal-700 transition-all">
              Learn More
            </button>
          </Link>
        </AnimatedSection>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`min-h-screen bg-blue-dark py-16 ${styles.contactSection}`}>
        <AnimatedSection className="contact-section">
          <h2 className="text-4xl font-semibold text-center mb-6">Contact Us</h2>
          <p className="text-lg max-w-3xl mx-auto text-center mb-6">
            Have questions? Get in touch with us. We’re here to assist you.
          </p>
          <Link href="mailto:support@dinenit.com">
            <button className="bg-teal py-3 px-8 text-2xl rounded-lg hover:bg-teal-700 transition-all">
              Get in Touch
            </button>
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
