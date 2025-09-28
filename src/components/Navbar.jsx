// src/components/Navbar.jsx

import React from 'react';
import { Bell, LogOut, User } from 'lucide-react'; // <-- Import the User icon
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isProfilePage = location.pathname === '/profile';

  function handleLogout() {
    navigate('/login');
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-6 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-md border-b border-gray-700 shadow-lg"
    >
      <Link
        to="/home"
        className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
      >
        uNIEte
      </Link>

      <div className="flex items-center gap-4">
        {!isProfilePage && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Notifications"
              className="p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/60 transition-colors"
            >
              <Bell size={20} className="text-gray-300" />
            </motion.button>

            {/* v-- NEW PROFILE BUTTON --v */}
            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Profile"
                className="p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/60 transition-colors"
              >
                <User size={20} className="text-gray-300" />
              </motion.button>
            </Link>
            {/* ^-- END OF NEW BUTTON --^ */}
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          aria-label="Logout"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-red-500/20"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </motion.button>
      </div>
    </motion.nav>
  );
}