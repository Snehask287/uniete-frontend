import React from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'


export default function FAB() {
return (
<Link to="/create" className="fixed right-6 bottom-6 bg-[#1E3A8A] text-white p-4 rounded-full shadow-lg hover:scale-105">
<PlusCircle size={24} />
</Link>
)
}