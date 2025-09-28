import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./StarryBackground.css"; // We'll create this file

export default function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields ✅");
      return;
    }
    navigate("/home", { state: { role, email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-gray-200 overflow-hidden relative">
      {/* Starry background container */}
      <div className="starry-background absolute inset-0 z-0"></div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col lg:flex-row w-full max-w-5xl rounded-3xl overflow-hidden
                   bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md
                   shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-gray-700
                   p-6 lg:p-10 relative z-10" // Added z-index to ensure content is on top
      >
        {/* Left Side: Login Form Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full lg:w-1/2 p-8 lg:p-12 bg-gray-900/40 rounded-2xl
                     shadow-[0_0_25px_rgba(0,0,0,0.5)] border border-purple-700/50
                     relative overflow-hidden group"
          style={{
            borderImageSlice: 1,
            borderImageSource: 'linear-gradient(to bottom right, #6D28D9, #3B82F6)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                uNIEte
              </span>
            </div>

            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
              uNIEte Login
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Connect with your community 🎓
            </p>

            <div className="flex mb-6 bg-gray-700/60 rounded-xl p-1 border border-gray-600">
              <button
                onClick={() => setRole("student")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  role === "student"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/30 scale-105"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/40"
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setRole("club")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  role === "club"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/30 scale-105"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/40"
                }`}
              >
                Club
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg
                           focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none
                           placeholder-gray-500 transition hover:border-purple-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-5 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg
                           focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none
                           placeholder-gray-500 transition hover:border-purple-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg
                           font-semibold shadow-lg shadow-purple-500/40 transition-all duration-300
                           hover:from-purple-700 hover:to-indigo-700"
              >
                Login
              </motion.button>
            </form>

            <div className="flex justify-between mt-6 text-sm text-gray-400">
              <a
                href="#"
                className="relative hover:text-purple-400 transition-colors duration-200 group"
              >
                Forgot Password?
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-purple-400 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
              <a
                href="/signup"
                className="relative font-semibold hover:text-purple-400 transition-colors duration-200 group"
              >
                Sign Up
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-purple-400 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Description */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center items-center text-center text-gray-200"
        >
          <div className="space-y-6 max-w-lg">
            <h3 className="text-4xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Unleash Your Potential, Together
            </h3>
            <p className="text-lg text-gray-300">
              Join clubs, collaborate on projects, and share experiences. Find your people, shape your future.
            </p>
            <p className="text-sm font-light text-gray-400 italic">
              uNIEte: Where community thrives.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}