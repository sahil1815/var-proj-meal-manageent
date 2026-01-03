import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({screen, setScreen}) => {
  return (
    <section className="min-h-dvh bg-gray-100 flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-gray-700 mb-4 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Welcome to
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Hall Automation System
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-xl md:text-2xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Skip the line and grab your meal token with ease. A smarter, faster way to ensure your tomorrow's feast is ready when you are.
        </motion.p>

        {/* Call to Action Button */}
        <motion.button
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen("studentLogin")}
        >
          Student Login
        </motion.button>

        {/* Optional decorative element: Animated underline or icon */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
