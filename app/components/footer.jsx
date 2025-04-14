import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Importing social icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-semibold text-indigo-400 mb-4">About</h3>
          <p className="text-gray-400">
          Dinenit is a modern, open-source monitoring platform for developers and sysadmins. Track real-time metrics, analyze system health, receive smart alerts, and visualize everything in beautiful, customizable dashboards.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-2xl font-semibold text-indigo-400 mb-4">Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-indigo-500 transition-colors">Home</a></li>
            <li><a href="#features" className="hover:text-indigo-500 transition-colors">Features</a></li>
            <li><a href="#about" className="hover:text-indigo-500 transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-indigo-500 transition-colors">Contact</a></li>
            <li><a href="#pricing" className="hover:text-indigo-500 transition-colors">Pricing</a></li> 
          </ul>
        </div>

        {/* Social Section with React Icons */}
        <div>
          <h3 className="text-2xl font-semibold text-indigo-400 mb-4">Social</h3>
          <div className="flex space-x-4 text-2xl text-gray-400">
            <a href="https://facebook.com" className="hover:text-indigo-500 transition-colors" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" className="hover:text-indigo-500 transition-colors" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" className="hover:text-indigo-500 transition-colors" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" className="hover:text-indigo-500 transition-colors" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-2xl font-semibold text-indigo-400 mb-4">Services</h3>
          <ul className="space-y-2">
            <li><a href="/service1" className="hover:text-indigo-500 transition-colors">Monitoring</a></li>
            <li><a href="/service2" className="hover:text-indigo-500 transition-colors">Support Chat</a></li>
            <li><a href="/service3" className="hover:text-indigo-500 transition-colors">System Analysis</a></li>
            <li><a href="/service4" className="hover:text-indigo-500 transition-colors">First Run</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8">
        <a href="#try-now" className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all">
          Try Now
        </a>
      </div>
      
      <div className="text-center text-gray-400 mt-6">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
