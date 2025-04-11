'use client';
import Header from "./Header";
import Aboutsection from "./about";
import DetailsPage from "./details";
import Navbar from '../Navbar';
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap"; // GSAP for animations
import Footer from "../footer";
import { Pricing } from "./pricing";
import ContactForm from "./contactForm";

export default function LandingPage() {
  return (
    <div className="text-white">
      <Navbar className="sticky top-0 z-50" />
      
      {/* Main content container with consistent padding */}
      <div className="container mx-auto px-4 space-y-24">
        {/* Each section wrapped with consistent spacing */}
        <section className="mb-24">
          <Header />
        </section>

        <section id="about" className="mb-24">
          <Aboutsection />
        </section>

        <section id="features" className="mb-24">
          <DetailsPage />
        </section>

        <section id="pricing" className="mb-24">
          <Pricing />
        </section>

        <section id="contact" className="mb-24">
          <ContactForm />
        </section>
      </div>

      <Footer />
    </div>
  );
}
