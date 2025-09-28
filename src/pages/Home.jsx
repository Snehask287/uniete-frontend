import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const slides = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
];

const clubRecommendations = [
  { name: 'Coding Club', desc: 'Tech wizards & hackathon lovers', img: '/avatars/club1.png', username: 'coding-club' },
  { name: 'Music Society', desc: 'Jam sessions & open mics', img: '/avatars/club2.png', username: 'music-society' },
  { name: 'Hiking Tribe', desc: 'Adventure in the wild!', img: '/avatars/club3.png', username: 'hiking-tribe' },
];

const friendRecommendations = [
  { name: 'Swathi', status: 'Online', img: '/avatars/friend1.png', username: 'swathi' },
  { name: 'Sneha', status: 'Active now', img: '/avatars/friend2.png', username: 'sneha' },
  { name: 'Rahul', status: 'Away', img: '/avatars/friend3.png', username: 'rahul' },
];

const tribeRecommendations = [
  { name: 'Tech Enthusiasts', desc: 'For all tech lovers', img: '/avatars/tribe1.png', username: 'tech-tribe' },
  { name: 'Art Circle', desc: 'Express your creativity', img: '/avatars/tribe2.png', username: 'art-circle' },
  { name: 'Sports Squad', desc: 'Stay active & competitive', img: '/avatars/tribe3.png', username: 'sports-squad' },
];

const postsFeed = [
  { id: 1, user: { name: 'Sneha', img: '/avatars/friend2.png', username: 'sneha' }, image: '/images/slide1.jpg', caption: 'Morning gig at NIE!', likes: 42, comments: 7 },
  { id: 2, user: { name: 'Coding Club', img: '/avatars/club1.png', username: 'coding-club' }, image: '/images/slide2.jpg', caption: 'Hackathon fever! Join in.', likes: 28, comments: 12 },
];

/* ---------------- RECOMMENDATION BLOCK ---------------- */
function RecommendationBlock({ title, items, goToProfile }) {
  const handleConnect = (e, item) => {
    e.stopPropagation();
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

/* ---------------- POST CARD ---------------- */
function PostCard({ post, goToProfile }) {
  const handleConnect = (e) => {
    e.stopPropagation();
    alert(`You sent a connection request to ${post.user.name}!`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-gray-900/40 backdrop-blur-md rounded-2xl mb-8 border border-gray-700 shadow-lg overflow-hidden">
      
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

      <img src={post.image} alt={post.caption} className="w-full h-80 object-cover" />

      <div className="px-6 py-4 flex justify-between text-gray-400">
        <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">❤️ <span>{post.likes}</span></button>
        <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">💬 <span>{post.comments}</span></button>
        <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">🔗 <span>Share</span></button>
      </div>

      <div className="px-6 pb-4">
        <div className="text-white text-base">
          <span className="font-semibold mr-2">{post.user.name}</span>
          {post.caption}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- HOME PAGE ---------------- */
export default function Home() {
  const [slide, setSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const nextSlide = () => setSlide((slide + 1) % slides.length);
  const prevSlide = () => setSlide((slide - 1 + slides.length) % slides.length);

  const allUsers = [...friendRecommendations, ...clubRecommendations, ...tribeRecommendations];

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 0) {
      const results = allUsers.filter((u) =>
        u.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const goToProfile = (item) => {
    navigate(`/user/${item.username}`, { state: { item } });
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#802BB1', '#9D6DE5', '#6D28D9', '#3B82F6']
    });
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-200 overflow-x-hidden relative">
      <div className="starry-background fixed inset-0 -z-10"></div>
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen lg:ml-20">

          {/* SEARCH BAR */}
          <div className="p-4 flex justify-center relative z-20 mt-16">
            <div className="relative w-full max-w-2xl">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search friends, clubs, tribes..."
                className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded-lg mt-2 overflow-hidden shadow-lg z-50">
                  {searchResults.map((user) => (
                    <div
                      key={user.username}
                      onClick={() => {
                        goToProfile(user);
                        setSearchTerm('');
                        setSearchResults([]);
                      }}
                      className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 transition"
                    >
                      <img src={user.img} alt={user.name} className="w-8 h-8 rounded-full border-2 border-purple-500" />
                      <span className="text-white">{user.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* HERO & SLIDES */}
          <div className="flex-1 flex items-center justify-center h-[calc(100vh-64px)] min-h-[640px] px-12 gap-12 relative z-10">
            <motion.section initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 flex flex-col justify-center max-w-2xl">
              <h1 className="text-6xl font-extrabold mb-4 leading-tight">
                Welcome to <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">uNIEte</span>!
              </h1>
              <h2 className="text-3xl font-semibold mb-6 text-gray-300">The campus is yours.<br />Start vibin', squad-style.</h2>
              <p className="text-lg leading-relaxed max-w-lg text-gray-400 mb-8">
                Find your <span className="font-bold text-green-400">tribe</span>, join <span className="font-bold text-pink-400">clubs</span>, chat, and make <span className="font-bold text-purple-400">memories</span>—all in one place.<br />
                NIE's best kept secret for real ones only.
              </p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={triggerConfetti} className="px-12 py-4 rounded-lg text-white font-extrabold text-lg w-fit bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/40 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
                Let's uNIEte Now
              </motion.button>
            </motion.section>

            <motion.section initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex-1 flex items-center justify-center relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-900/30 backdrop-blur-sm">
                <img src={slides[slide]} alt={`Slide ${slide + 1}`} className="w-[500px] h-[350px] object-cover" />
                <button onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-gray-800/70 rounded-full w-12 h-12 flex items-center justify-center shadow transition-all duration-300 hover:scale-110">‹</button>
                <button onClick={() => setSlide((slide + 1) % slides.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-gray-800/70 rounded-full w-12 h-12 flex items-center justify-center shadow transition-all duration-300 hover:scale-110">›</button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {slides.map((_, idx) => (
                    <button key={idx} onClick={() => setSlide(idx)} className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === slide ? 'bg-purple-500 scale-125' : 'bg-gray-500 hover:bg-gray-400'}`} />
                  ))}
                </div>
              </div>
            </motion.section>
          </div>

          {/* FEED & RECOMMENDATIONS */}
          <div className="flex max-w-7xl mx-auto w-full p-8 justify-center items-start gap-12 relative z-10">
            <div className="flex-1 max-w-2xl">
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6">Recent Posts</motion.h2>
              {postsFeed.map(post => <PostCard key={post.id} post={post} goToProfile={goToProfile} />)}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="w-80 shrink-0 sticky top-24">
              <RecommendationBlock title="Recommended Clubs" items={clubRecommendations} goToProfile={goToProfile} />
              <RecommendationBlock title="Recommended Tribes" items={tribeRecommendations} goToProfile={goToProfile} />
              <RecommendationBlock title="People You May Know" items={friendRecommendations} goToProfile={goToProfile} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
