// src/components/Post.jsx
import React from "react";
import { motion } from "framer-motion";

const Post = React.memo(({ post }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="p-5 rounded-2xl bg-gray-900/70 border border-purple-700/40
                 shadow-[0_0_20px_rgba(109,40,217,0.25)] backdrop-blur-md"
    >
      {/* Post header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.avatar}
          alt={post.user}
          className="w-10 h-10 rounded-full border border-purple-500/50"
        />
        <div>
          <p className="font-medium text-gray-100">{post.user}</p>
          <p className="text-xs text-gray-400">
            {post.club} · {post.time}
          </p>
        </div>
      </div>

      {/* Post image */}
      <img
        src={post.image}
        alt={post.caption}
        className="w-full h-56 object-cover rounded-xl mb-3"
      />

      {/* Caption */}
      <p className="text-sm text-gray-200 mb-3">{post.caption}</p>

      {/* Actions */}
      <div className="flex space-x-6 text-sm text-gray-400">
        <button className="hover:text-purple-400">❤️ {post.likes}</button>
        <button className="hover:text-purple-400">💬 {post.comments}</button>
      </div>
    </motion.div>
  );
});

export default Post;