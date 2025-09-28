import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";      // Your own profile
import UserProfile from "./pages/UserProfile";  // Other people's profile
import Chats from "./pages/Chats";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />

        {/* Your profile */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Other people's profile */}
        <Route path="/user/:name" element={<UserProfile />} />

        <Route path="/chats" element={<Chats />} />
      </Routes>
    </Router>
  );
}

export default App;
