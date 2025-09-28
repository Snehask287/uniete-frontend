import { Heart, MessageCircle } from "lucide-react";

export default function PostCard({ post }) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <img src={post.img} alt="Post" className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{post.author}</h3>
        <p className="text-gray-600 text-sm mt-1">{post.content}</p>
        <div className="flex gap-6 mt-3 text-gray-600">
          <button className="flex items-center gap-1 hover:text-red-500 transition">
            <Heart size={18} /> Like
          </button>
          <button className="flex items-center gap-1 hover:text-primary transition">
            <MessageCircle size={18} /> Comment
          </button>
        </div>
      </div>
    </div>
  );
}
