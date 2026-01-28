import React from "react";
import { NavLink } from "react-router-dom";
import { Search, Bell, MessageSquare, Command } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Application Offer", path: "/recruitment" },
  { label: "Employee Payroll", path: "/payroll" },
  { label: "Day-Off Request", path: "/requests" },
  { label: "Time Tracker", path: "/tracker" },
];

export const TopNav = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 px-6 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between sticky top-0 z-50 transition-all duration-300"
    >
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20 group-hover:scale-105 transition-transform">
            <Command className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            PeoplePulse
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
                  isActive
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white shadow-sm border border-slate-200/60 rounded-lg -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-12 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-sm w-64 focus:bg-white focus:ring-2 focus:ring-primary-100 focus:border-primary-200 outline-none transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <span className="text-[10px] font-medium text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-white">
              ⌘K
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-slate-100 p-0.5 border border-slate-200 shadow-sm cursor-pointer hover:ring-2 hover:ring-slate-100 transition-all">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=compress&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

