// src/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/Modal"; // Import the new Modal component
import "./StarryBackground.css";

export default function Signup() {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // New state for modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State for modal message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "student") {
      // Check for password match
      if (formData.password !== formData.confirmPassword) {
        setModalMessage("Passwords do not match. Please try again.");
        setShowModal(true);
        return;
      }

      // Check for college email domain
      const emailRegex = /@nie\.ac\.in$/;
      if (!emailRegex.test(formData.email)) {
        setModalMessage("Impostor alert! Just Kidding... but fr, drop that @nie.ac.in email and prove you're squad. We’re vibin’ and waitin'");
        setShowModal(true);
        return;
      }
    }

    console.log("Signup Data:", { role, ...formData });
    alert(`${role} signup successful ✅`);
    navigate("/");
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
                   p-6 lg:p-10 relative z-10"
      >
        {/* Left Side: Signup Form Card */}
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
              uNIEte Signup
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Create your account and join the community ✨
            </p>

            {/* Role Toggle */}
            <div className="flex mb-6 bg-gray-700/60 rounded-xl p-1 border border-gray-600">
              <button
                onClick={() => setRole("student")}
                type="button"
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
                type="button"
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  role === "club"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/30 scale-105"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/40"
                }`}
              >
                Club
              </button>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {role === "student" ? (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg
                               focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none
                               placeholder-gray-500 transition hover:border-purple-400"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="College Email (@nie.ac.in)"
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg
                               focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none
                               placeholder-gray-500 transition hover:border-purple-400"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg
                               focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none
                               placeholder-gray-500 transition hover:border-purple-400"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg
                               focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none
                               placeholder-gray-500 transition hover:border-purple-400"
                  required
                />
                {/* Dropdown for Branch */}
                <select
                  name="branch"
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-800 text-gray-500 border border-gray-600 rounded-lg
                               focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none
                               transition hover:border-purple-400"
                  required
                >
                  <option value="" disabled selected>
                    Select your Branch
                  </option>
                  <option value="cs" className="text-white">CS</option>
                  <option value="cs-aiml" className="text-white">CS-AIML</option>
                  <option value="is" className="text-white">IS</option>
                  <option value="ec" className="text-white">EC</option>
                  <option value="civil" className="text-white">Civil</option>
                  <option value="mech" className="text-white">Mech</option>
                </select>
                {/* Dropdown for Year */}
                <select
                  name="year"
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-800 text-gray-500 border border-gray-600 rounded-lg
                               focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none
                               transition hover:border-purple-400"
                  required
                >
                  <option value="" disabled selected>
                    Select your Year
                  </option>
                  <option value="1" className="text-white">1</option>
                  <option value="2" className="text-white">2</option>
                  <option value="3" className="text-white">3</option>
                  <option value="4" className="text-white">4</option>
                </select>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="clubName"
                  placeholder="Club Name"
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg
                               focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none
                               placeholder-gray-500 transition hover:border-purple-400"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Club Email"
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg
                               focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none
                               placeholder-gray-500 transition hover:border-purple-400"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg
                               focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none
                               placeholder-gray-500 transition hover:border-purple-400"
                  required
                />
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg
                           font-semibold shadow-lg shadow-purple-500/40 transition-all duration-300
                           hover:from-purple-700 hover:to-indigo-700"
            >
              Sign Up as {role === "student" ? "Student" : "Club"}
            </motion.button>
          </form>

          {/* Link back to login */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <a
              href="/"
              className="relative font-semibold hover:text-purple-400 transition duration-200 group"
            >
              Login
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-purple-400 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
          </p>
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
              Create Your Account. <br /> Find Your People.
            </h3>
            <p className="text-lg text-gray-300">
              Connect with your campus community. Join exciting clubs, find new projects, and discover events tailored for you.
            </p>
            <p className="text-sm font-light text-gray-400 italic">
              It all starts here.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* The Modal is rendered conditionally */}
      <AnimatePresence>
        {showModal && (
          <Modal message={modalMessage} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
}