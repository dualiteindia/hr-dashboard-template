import React from 'react';
import { TopNav } from './TopNav';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      <TopNav />
      <main className="p-6 max-w-[1600px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
