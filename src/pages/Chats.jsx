import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";


// Demo data
const DEMO_FRIENDS = [
  { id: 1, name: "Swathi", avatar: "👩‍💻", status: "online" },
  { id: 2, name: "Spandana", avatar: "👩‍🎨", status: "away" },
  { id: 3, name: "Sneha", avatar: "👩‍🍳", status: "offline" },
];

const DEMO_GROUPS_INITIAL = [
  { id: 101, name: "Coding Club", members: ["You", "Swathi"], avatar: "💻", lastActive: "2 min ago" },
  { id: 102, name: "Hiking Tribe", members: ["You", "Spandana"], avatar: "⛰️", lastActive: "1 hour ago" },
  { id: 103, name: "Music", members: ["You", "Sneha"], avatar: "🎵", lastActive: "5 min ago" },
];

// Chat background pattern
const ChatBackground = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
       style={{ backgroundImage: `radial-gradient(circle at 25px 25px, rgba(74, 74, 74, 0.2) 2%, transparent 2%),
                                 radial-gradient(circle at 75px 75px, rgba(74, 74, 74, 0.2) 2%, transparent 2%)`,
                backgroundSize: '100px 100px',
                backgroundPosition: '0 0, 50px 50px' }} />
);

// Hook to manage chats
const useChats = () => {
  const [chats, setChats] = useState({
    101: [
      { id: 1, from: "Swathi", text: "Hey! How's the project going?", timestamp: "10:30 AM" },
      { id: 2, from: "You", text: "Going great! Almost finished with the UI", timestamp: "10:31 AM" },
      { id: 3, from: "Swathi", text: "Awesome! Can't wait to see it 🚀", timestamp: "10:32 AM" },
    ],
    102: [
      { id: 1, from: "Spandana", text: "Hiking this weekend?", timestamp: "09:15 AM" },
      { id: 2, from: "You", text: "Yes! What time should we meet?", timestamp: "09:20 AM" },
    ],
  });
  

  const [groups, setGroups] = useState(DEMO_GROUPS_INITIAL);
  const [friends] = useState(DEMO_FRIENDS);

  const addMessage = useCallback((chatId, message) => {
    setChats(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), { ...message, id: Date.now() + Math.random(), timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
    }));
  }, []);

  const createGroup = useCallback((groupData) => {
    const newGroup = { ...groupData, id: Math.max(0, ...groups.map(g => g.id)) + 1, lastActive: "Just now", avatar: "👥" };
    setGroups(prev => [...prev, newGroup]);
    return newGroup.id;
  }, [groups]);

  return { chats, groups, friends, addMessage, createGroup };
};

// ChatBubble
const ChatBubble = ({ message, isOwn }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className={`flex flex-col max-w-xs lg:max-w-md ${isOwn ? "ml-auto items-end" : "items-start"}`}
  >
    <div className={`px-4 py-2 rounded-2xl shadow-lg ${isOwn ? "bg-[#802BB1] text-white rounded-br-md" : "bg-white dark:bg-gray-800 text-black dark:text-white rounded-bl-md border border-gray-200 dark:border-gray-700"}`}>
      {!isOwn && <div className="text-xs font-medium opacity-80 mb-1">{message.from}</div>}
      <div className="break-words">{message.text}</div>
      <div className={`text-xs opacity-60 mt-1 ${isOwn ? 'text-right' : ''}`}>{message.timestamp}</div>
    </div>
  </motion.div>
);

// ChatListItem
const ChatListItem = ({ item, isActive, onClick, type }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${isActive ? "bg-[#802BB1] text-white shadow-lg" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"}`}
  >
    <div className="flex items-center gap-3">
      <div className="text-2xl">{item.avatar}</div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate">{item.name}</div>
        <div className="text-sm opacity-70 truncate">{type === 'group' ? `${item.members.length} members` : item.status}</div>
      </div>
      {type === 'group' && <div className="text-xs opacity-60">{item.lastActive}</div>}
    </div>
  </motion.button>
);

// CreateGroupModal
const CreateGroupModal = ({ isOpen, onClose, friends, onCreateGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [step, setStep] = useState(1);

  const resetAndClose = () => { setGroupName(""); setSelectedMembers([]); setStep(1); onClose(); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(step === 1){ setStep(2); } 
    else { 
      onCreateGroup({ name: groupName.trim(), members: ["You", ...selectedMembers.map(id => friends.find(f => f.id === id).name )] });
      resetAndClose();
    }
  };

  if (!isOpen) return null;
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <motion.form initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}} onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-[#802BB1] mb-4">{step===1 ? "Create New Group" : "Add Members"}</h2>
        {step===1 ? (
          <input type="text" value={groupName} onChange={(e)=>setGroupName(e.target.value)} placeholder="Enter group name" className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#802BB1]" required autoFocus />
        ) : (
          <div className="mb-6">
            <div className="font-semibold mb-3 text-black dark:text-white">Select Members:</div>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {friends.map(friend => (
                <label key={friend.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                  <input type="checkbox" checked={selectedMembers.includes(friend.id)} onChange={()=>setSelectedMembers(prev=>prev.includes(friend.id)? prev.filter(id=>id!==friend.id) : [...prev,friend.id])} className="w-5 h-5 rounded text-[#802BB1] focus:ring-[#802BB1]" />
                  <span className="text-2xl">{friend.avatar}</span>
                  <span className="flex-1 text-black dark:text-white">{friend.name}</span>
                  <span className={`w-2 h-2 rounded-full ${friend.status==='online'? 'bg-green-500': friend.status==='away'? 'bg-yellow-500':'bg-gray-500'}`}></span>
                </label>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-between gap-3">
          <button type="button" onClick={step===1? resetAndClose : ()=>setStep(1)} className="flex-1 px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">{step===1?"Cancel":"Back"}</button>
          <button type="submit" disabled={step===2 && selectedMembers.length===0} className="flex-1 px-4 py-3 rounded-xl bg-[#802BB1] text-white font-bold hover:bg-[#9D6DE5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{step===1?"Next":"Create Group"}</button>
        </div>
      </motion.form>
    </motion.div>
  );
};

// Main Chats Component
export default function Chats() {
  const [activeChatId, setActiveChatId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { chats, groups, friends, addMessage, createGroup } = useChats();

  // Auto-scroll
  useEffect(()=>{ messagesEndRef.current?.scrollIntoView({behavior:"smooth"}); }, [chats, activeChatId]);

  // Initial chat
   useEffect(() => {
  if (!activeChatId) {
    if (location.state?.user) {
      // Match with friends list
      const friend = friends.find(f => f.name === location.state.user.name);
      if (friend) {
        setActiveChatId(friend.id);
        return;
      }
    }
    // Default fallback
    if (groups.length > 0 || friends.length > 0) {
      setActiveChatId(groups[0]?.id || friends[0]?.id);
    }
  }
}, [groups, friends, activeChatId, location.state]);

  const sendMessage = useCallback((e)=>{
    e.preventDefault();
    if(!messageInput.trim() || !activeChatId) return;
    addMessage(activeChatId,{from:"You",text:messageInput.trim()});
    setMessageInput("");
  },[messageInput, activeChatId, addMessage]);

  const handleCreateGroup = useCallback((groupData)=>{
    const newGroupId = createGroup(groupData);
    setActiveChatId(newGroupId);
    setIsCreateOpen(false);
  },[createGroup]);

  const activeChat = groups.find(g=>g.id===activeChatId) || friends.find(f=>f.id===activeChatId);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Back to Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")}
          className="bg-[#802BB1] hover:bg-[#9D6DE5] text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2"
        >
          <span>←</span>
          <span>Back to Home</span>
        </motion.button>
      </div>

      <div className="flex" style={{height: '100vh'}}>
        {/* Chat Sidebar */}
        <aside className="hidden lg:flex w-80 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 space-y-4">
            <h1 className="text-2xl font-bold text-[#802BB1]">Messages</h1>
            <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={()=>setIsCreateOpen(true)} className="w-full py-3 bg-[#802BB1] hover:bg-[#9D6DE5] text-white rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center gap-2">
              <span>+</span><span>Create Group</span>
            </motion.button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-1">
              <h3 className="px-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Groups ({groups.length})</h3>
              {groups.map(group=>(<ChatListItem key={group.id} item={group} isActive={activeChatId===group.id} onClick={()=>setActiveChatId(group.id)} type="group" />))}
            </div>
            <div className="p-4 space-y-1">
              <h3 className="px-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Friends ({friends.length})</h3>
              {friends.map(friend=>(<ChatListItem key={friend.id} item={friend} isActive={activeChatId===friend.id} onClick={()=>setActiveChatId(friend.id)} type="friend" />))}
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col relative">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-black z-10">
                <div className="text-3xl">{activeChat.avatar}</div>
                <div>
                  <div className="text-xl font-bold text-[#802BB1]">{activeChat.name}</div>
                  {activeChat.members && <div className="text-sm text-gray-600 dark:text-gray-400">{activeChat.members.length} members • {activeChat.lastActive}</div>}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-hidden relative bg-gradient-to-br from-green-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
                <ChatBackground />
                <div className="absolute inset-0 overflow-y-auto p-6 space-y-4">
                  <AnimatePresence mode="popLayout">
                    {(chats[activeChatId]||[]).map(message=><ChatBubble key={message.id} message={message} isOwn={message.from==="You"} />)}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black z-10">
                <form onSubmit={sendMessage} className="p-6">
                  <div className="flex gap-2">
                    <input type="text" value={messageInput} onChange={e=>setMessageInput(e.target.value)} placeholder="Type your message..." className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#802BB1]" />
                    <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} type="submit" disabled={!messageInput.trim()} className="px-6 bg-[#802BB1] text-white rounded-xl font-semibold hover:bg-[#9D6DE5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Send</motion.button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 relative bg-gradient-to-br from-green-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
              <ChatBackground />
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center bg-white/80 dark:bg-black/80 p-8 rounded-2xl backdrop-blur-sm">
                  <div className="text-6xl mb-4">💬</div>
                  <div className="text-xl font-semibold mb-2">No chat selected</div>
                  <div className="text-sm">Select a chat or create a new group to start messaging</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <AnimatePresence>
        <CreateGroupModal isOpen={isCreateOpen} onClose={()=>setIsCreateOpen(false)} friends={friends} onCreateGroup={handleCreateGroup} />
      </AnimatePresence>
    </div>
  );
}