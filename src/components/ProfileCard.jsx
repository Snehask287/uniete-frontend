function PostCard({ post, goToProfile }) {
  const handleConnect = (e) => {
    e.stopPropagation();
    alert(`You sent a connection request to ${post.user.name}!`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-gray-900/40 backdrop-blur-md rounded-2xl mb-8 border border-gray-700 shadow-lg overflow-hidden">
      
      {/* Post Header */}
      <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-800/30 transition-colors" onClick={() => goToProfile(post.user)}>
        <div className="flex items-center gap-3">
          <img src={post.user.img} alt={post.user.name} className="w-12 h-12 rounded-full border-2 border-purple-500 mr-3" />
          <span className="font-bold text-lg text-white">{post.user.name}</span>
        </div>

        <button
          onClick={handleConnect}
          className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-sm text-white transition"
        >
          Connect
        </button>
      </div>

      {/* Post Image */}
      <img src={post.image} alt={post.caption} className="w-full h-80 object-cover" />

      {/* Post Actions */}
      <div className="px-6 py-4 flex justify-between text-gray-400">
        <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">❤️ <span>{post.likes}</span></button>
        <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">💬 <span>{post.comments}</span></button>
        <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">🔗 <span>Share</span></button>
      </div>

      {/* Post Caption */}
      <div className="px-6 pb-4">
        <div className="text-white text-base">
          <span className="font-semibold mr-2">{post.user.name}</span>
          {post.caption}
        </div>
      </div>
    </motion.div>
  );
}
