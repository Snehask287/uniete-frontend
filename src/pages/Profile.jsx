import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = {
  accent: '#802BB1',
  accentLight: '#9D6DE5',
};

export default function Profile() {
  const [user, setUser] = useState({
    name: 'Sathvika',
    bio: 'Excited to be part of NIE community!',
    interests: ['Coding', 'Hiking', 'Dance'],
    achievements: ['Winner, SIH 2025', 'Lead, Coding Club', 'Best Speaker Award 2024'],
    friends: '356',
    posts: '47'
  });

  const [posts, setPosts] = useState([
    { 
      id: 1, 
      author: 'Sathvika', 
      content: 'Looking forward to the tech fest!', 
      timestamp: '2 hours ago',
      likes: 42,
      comments: 7,
      image: null
    },
    { 
      id: 2, 
      author: 'Coding Club', 
      content: 'Hackathon results are out, congratulations winners!', 
      timestamp: '1 day ago',
      likes: 128,
      comments: 23,
      image: '/images/slide2.jpg'
    },
  ]);

  // Edit modal
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  // Add Post modal
  const [openPost, setOpenPost] = useState(false);
  const [postCaption, setPostCaption] = useState('');
  const [postImgFile, setPostImgFile] = useState(null);
  const [postImgPreview, setPostImgPreview] = useState(null);
  const imgInputRef = useRef(null);

  // Open edit
  function onEdit() {
    setEditData({...user});
    setOpenEdit(true);
  }

  // Save edit
  function handleSaveEdit(e) {
    e.preventDefault();
    setUser({...editData});
    setOpenEdit(false);
  }

  // Add post
  function handleAddPost(e) {
    e.preventDefault();
    if (!postCaption && !postImgFile) return;
    const url = postImgPreview;
    setPosts([
      {
        id: Date.now(),
        author: user.name,
        content: postCaption,
        image: url,
        timestamp: 'Just now',
        likes: 0,
        comments: 0
      },
      ...posts,
    ]);
    setOpenPost(false);
    setPostCaption('');
    setPostImgFile(null);
    setPostImgPreview(null);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) {
      setPostImgFile(null);
      setPostImgPreview(null);
      return;
    }
    setPostImgFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPostImgPreview(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen flex flex-col text-gray-200 overflow-x-hidden relative">
      {/* Starry Background - Fixed to cover entire page */}
      <div className="fixed inset-0 -z-10 starry-background"></div>
      
      <Navbar />
      
      <div className="flex flex-1 pt-16 min-h-screen">
        <Sidebar />
        
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Profile Header */}
            <div className="rounded-2xl bg-gray-900/40 backdrop-blur-md border border-gray-700 shadow-xl p-8 mb-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* Profile Picture */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-4xl border-4 border-gray-700">
                    {user.name.charAt(0)}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </motion.div>

                {/* Profile Info */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                    {user.name}
                  </h1>
                  <p className="text-lg text-gray-300 mb-4">{user.bio}</p>
                  
                  {/* Stats - Updated with Friends only */}
                  <div className="flex justify-center lg:justify-start gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{user.posts}</div>
                      <div className="text-gray-400 text-sm">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{user.friends}</div>
                      <div className="text-gray-400 text-sm">Friends</div>
                    </div>
                  </div>

                  {/* Interests */}
                  {user.interests.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                      {user.interests.map((interest, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 text-purple-300 text-sm font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex lg:flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onEdit}
                    className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 hover:from-purple-700 hover:to-indigo-700 transition-all"
                  >
                    Edit Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setOpenPost(true)}
                    className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30 hover:from-purple-600 hover:to-indigo-600 transition-all"
                  >
                    Add Post
                  </motion.button>
                </div>
              </div>

              {/* Achievements */}
              {user.achievements.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-3">Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {user.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/40">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span className="text-gray-200">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Posts Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6">
                Posts
              </h2>
              
              {posts.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-lg">No posts to display yet.</p>
                  <p className="text-sm">Share your first post to get started!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl bg-gray-900/40 backdrop-blur-md border border-gray-700 shadow-lg overflow-hidden"
                    >
                      {/* Post Header */}
                      <div className="flex items-center gap-3 p-4 border-b border-gray-700">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{post.author}</div>
                          <div className="text-xs text-gray-400">{post.timestamp}</div>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="p-4">
                        {post.image && (
                          <img
                            src={post.image}
                            alt="Post"
                            className="w-full max-w-md rounded-lg mb-3 border border-gray-600"
                          />
                        )}
                        <p className="text-gray-200">{post.content}</p>
                      </div>

                      {/* Post Actions */}
                      <div className="px-4 py-3 border-t border-gray-700 flex justify-between text-gray-400">
                        <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{post.likes}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          <span>{post.comments}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          <span>Share</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {openEdit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.form
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onSubmit={handleSaveEdit}
              className="bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-2xl p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6">
                Edit Profile
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={e => setEditData(d => ({ ...d, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={editData.bio}
                    onChange={e => setEditData(d => ({ ...d, bio: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Interests (comma separated)</label>
                  <input
                    type="text"
                    value={editData.interests?.join(', ')}
                    onChange={e => setEditData(d => ({ ...d, interests: e.target.value.split(',').map(it => it.trim()) }))}
                    className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Achievements (one per line)</label>
                  <textarea
                    value={editData.achievements?.join('\n')}
                    onChange={e => setEditData(d => ({ ...d, achievements: e.target.value.split('\n').filter(Boolean) }))}
                    className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Friends</label>
                  <input
                    type="text"
                    value={editData.friends}
                    onChange={e => setEditData(d => ({ ...d, friends: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={() => setOpenEdit(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Post Modal */}
      <AnimatePresence>
        {openPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.form
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onSubmit={handleAddPost}
              className="bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-2xl p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6">
                Create Post
              </h2>
              
              <div className="space-y-4">
                <div>
                  <textarea
                    value={postCaption}
                    onChange={e => setPostCaption(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full p-4 bg-gray-800/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Add Image</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="file"
                      accept="image/*"
                      ref={imgInputRef}
                      onChange={handleImageChange}
                      className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    />
                    {postImgPreview && (
                      <img src={postImgPreview} alt="Preview" className="w-16 h-16 rounded object-cover border-2 border-purple-500" />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={() => setOpenPost(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50"
                  disabled={!postCaption && !postImgFile}
                >
                  Post
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}