function RecommendationBlock({ title, items, goToProfile }) {
  const handleConnect = (e, item) => {
    e.stopPropagation(); // prevent navigating to profile when clicking Connect
    alert(`You sent a connection request to ${item.name}!`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
      <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">{title}</div>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center justify-between rounded-xl bg-gray-900/40 backdrop-blur-md border border-gray-700 px-4 py-3 hover:border-purple-500 cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => goToProfile(item)}
          >
            <div className="flex items-center gap-3 min-w-0">
              <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full border-2 border-purple-500" />
              <div className="flex-1 min-w-0">
                <span className="text-white font-semibold truncate block">{item.name}</span>
                {item.desc && <span className="text-gray-400 text-sm truncate block">{item.desc}</span>}
                {item.status && <span className="text-green-400 text-sm truncate block">{item.status}</span>}
              </div>
            </div>

            <button
              onClick={(e) => handleConnect(e, item)}
              className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-sm text-white transition"
            >
              Connect
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
