import React from 'react';
import { motion } from 'framer-motion';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ 
        duration: 0.3, 
        ease: [0.4, 0.0, 0.2, 1], // Standard easing
        staggerChildren: 0.05
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};
