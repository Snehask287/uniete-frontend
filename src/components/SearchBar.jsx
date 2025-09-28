import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-[calc(100vh-64px)] bg-white shadow-lg p-6 gap-6 sticky top-16">
      {/* Quick Navigation */}
      <div className="flex flex-col gap-4 text-gray-700 font-semibold">
        <button
          onClick={() => navigate("/")}
          className="text-left hover:text-[#802BB1] transition"
        >
          🏠 Home
        </button>
        <button
          onClick={() => navigate("/clubs")}
          className="text-left hover:text-[#802BB1] transition"
        >
          🎭 Clubs
        </button>
        <button
          onClick={() => navigate("/tribes")}
          className="text-left hover:text-[#802BB1] transition"
        >
          🌐 Tribes
        </button>
        <button
          onClick={() => navigate("/friends")}
          className="text-left hover:text-[#802BB1] transition"
        >
          👥 Friends
        </button>
        <button
          onClick={() => navigate("/settings")}
          className="text-left hover:text-[#802BB1] transition"
        >
          ⚙️ Settings
        </button>
      </div>
    </aside>
  );
}
