// src/components/Modal.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Blurry Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.8, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: -20 }}
        className="relative z-10 w-full max-w-sm rounded-lg bg-gray-800 p-6 text-center text-gray-200 shadow-xl border border-purple-600"
      >
        <p className="mb-4 text-lg font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="rounded-md bg-purple-600 px-6 py-2 font-bold text-white transition hover:bg-purple-700"
        >
          OK
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Modal;