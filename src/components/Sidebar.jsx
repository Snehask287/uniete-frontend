// src/components/Sidebar.jsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  {
    href: '/home',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 11l9-8 9 8" />
        <path d="M4 10v10a2 2 0 002 2h4a2 2 0 002-2h4a2 2 0 002-2V10" />
      </svg>
    ),
  },
  {
    href: '/chats',
    label: 'Chats',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  // {   <-- REMOVED Profile link from here
  //   href: '/profile',
  //   label: 'Profile',
  //   ...
  // },
];


export default function Sidebar() {
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="hidden lg:flex flex-col w-20 fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-900/80 backdrop-blur-md border-r border-gray-700 py-4 z-40"
    >
      {/* Profile Avatar has been REMOVED */}

      {/* Search Button has been REMOVED */}

      {/* Nav Items */}
      <div className="flex flex-col items-center space-y-4 mt-8"> {/* Added mt-8 for spacing */}
        {navItems.map((item) => (
          <div
            key={item.href}
            className="relative group"
            onMouseEnter={() => setActiveTooltip(item.label)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <NavLink
              to={item.href}
              end
              className={({ isActive }) =>
                `flex items-center justify-center p-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
                }`
              }
            >
              {item.icon}
            </NavLink>
             {activeTooltip === item.label && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-gray-900 rounded-lg shadow-lg border border-gray-700 z-50 whitespace-nowrap">
                  <p className="text-white font-medium">{item.label}</p>
                </div>
              )}
          </div>
        ))}
      </div>

      {/* Online Status */}
      <div className="mt-auto flex justify-center pb-4">
        <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-gray-900"></div>
      </div>
    </motion.nav>
    
    // The entire Search Modal has been REMOVED
  );
}