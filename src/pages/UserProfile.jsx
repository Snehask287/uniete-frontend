import { useLocation, useParams, useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state?.item;

  const handleConnect = () => {
    alert(`You sent a connection request to ${item?.name || name}!`);
  };

 const handleChat = () => {
  navigate("/chats", { state: { user: item } });
};

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">
      <div className="p-6 max-w-3xl mx-auto w-full">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
        >
          ← Back
        </button>

        <div className="bg-gray-900/50 p-8 rounded-2xl shadow-lg border border-gray-700">
          <div className="flex items-center gap-6">
            <img
              src={item?.img || "/avatars/default.png"}
              alt={name}
              className="w-28 h-28 rounded-full border-4 border-purple-500"
            />
            <div>
              <h1 className="text-4xl font-bold text-white">{item?.name || name}</h1>
              {item?.desc && <p className="text-gray-400 mt-2">{item.desc}</p>}
              {item?.status && <p className="text-green-400 mt-2">{item.status}</p>}
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleConnect}
              className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
            >
              Connect
            </button>
            <button
              onClick={handleChat}
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
