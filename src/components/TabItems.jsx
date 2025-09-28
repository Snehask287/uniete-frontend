// src/components/TabItems.jsx
import { motion } from "framer-motion";
import { clubs, tribes, friends } from "../data/content"; // Import the data

const TabItems = ({ activeTab, handleItemClick }) => {
  let data = [];
  let type = "";

  switch (activeTab) {
    case "clubs":
      data = clubs;
      type = "club";
      break;
    case "tribes":
      data = tribes;
      type = "tribe";
      break;
    case "friends":
      data = friends;
      type = "friend";
      break;
    default:
      data = [];
      type = "";
  }

  return (
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {data.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.06 }}
          className="min-w-[220px] flex-shrink-0 p-5 rounded-2xl
                     bg-gray-900/70 border border-purple-700/40
                     shadow-[0_0_25px_rgba(109,40,217,0.35)]
                     backdrop-blur-md cursor-pointer"
          onClick={() => handleItemClick(type, item.name)}
        >
          <div className="flex items-center gap-3 mb-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 rounded-full border border-purple-500/50"
            />
            <h3 className="font-semibold text-gray-100 text-lg">{item.name}</h3>
          </div>
          {type !== "friend" ? (
            <span className="text-sm text-gray-400">{item.members} members</span>
          ) : (
            <span className="text-sm text-gray-400">
              Interests: {item.interests.join(", ")}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default TabItems;