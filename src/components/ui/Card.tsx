import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noHover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, noHover = false, onClick }) => {
  return (
    <motion.div
      whileHover={!noHover ? { y: -4, boxShadow: "0 12px 40px -8px rgba(0, 0, 0, 0.08)" } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        "bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden",
        "transition-colors duration-300",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
