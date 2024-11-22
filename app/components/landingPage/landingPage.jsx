'use client';
import Header from "./Header";
import Aboutsection from "./about";
import DetailsPage from "./details";
import Navbar from '../Navbar';
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap"; // GSAP for animations

export default function LandingPage() {
  return (
    <div className="text-white">
      {/* Header Section */}

      <Navbar />
      <Header />

      <Aboutsection/>   

      <DetailsPage/> 


    </div>
  );
}
