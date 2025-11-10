"use client";
import "../../app/globals.css";
import Image from "next/image";
import { Search } from "lucide-react";

export default function AllUsers() {
  const users = [
    { name: "shanu", email: "shanu@gmail.com", avatar: "/avatars/emilia.jpg" },
    { name: "nadhil", email: "nadhil@gmail.com", avatar: "/avatars/emilia.jpg" },
    { name: "chechu", email: "chechu@.com", avatar: "/avatars/emilia.jpg" },
    { name: "sameer", email: "sameer@.com", avatar: "/avatars/emilia.jpg" },
    { name: "riyas", email: "riyas@gmail.com", avatar: "/avatars/emilia.jpg" },
    { name: "shanu", email: "shanu@gmail.com", avatar: "/avatars/emilia.jpg" },
    { name: "nadhil", email: "nadhil@gmail.com", avatar: "/avatars/emilia.jpg" },
    { name: "chechu", email: "chechu@.com", avatar: "/avatars/emilia.jpg" },
    { name: "sameer", email: "sameer@.com", avatar: "/avatars/emilia.jpg" },
    { name: "riyas", email: "riyas@gmail.com", avatar: "/avatars/emilia.jpg" },
    { name: "shanu", email: "shanu@gmail.com", avatar: "/avatars/emilia.jpg" },
    { name: "nadhil", email: "nadhil@gmail.com", avatar: "/avatars/emilia.jpg" },
    { name: "chechu", email: "chechu@.com", avatar: "/avatars/emilia.jpg" },
    { name: "sameer", email: "sameer@.com", avatar: "/avatars/emilia.jpg" },
    { name: "riyas", email: "riyas@gmail.com", avatar: "/avatars/emilia.jpg" },
    { name: "shanu", email: "shanu@gmail.com", avatar: "/avatars/emilia.jpg" },
    { name: "nadhil", email: "nadhil@gmail.com", avatar: "/avatars/emilia.jpg" },
    { name: "chechu", email: "chechu@.com", avatar: "/avatars/emilia.jpg" },
    { name: "sameer", email: "sameer@.com", avatar: "/avatars/emilia.jpg" },
    { name: "riyas", email: "riyas@gmail.com", avatar: "/avatars/emilia.jpg" },
 
  ];

  return (
    <div className=" min-h-screen p-6 md:p-8">
  
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">All Users</h1>

        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#AD49E1]/40"
          />
        </div>
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8">
        {users.map((u, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="relative mb-3 h-16 w-16">
              <Image
                src={u.avatar}
                alt={u.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-[#AD49E1]/20 shadow-md"
              />
            </div>
            <div className="space-y-0.5">
              <p className="font-semibold text-[#931fd1] leading-tight">{u.name}</p>
              <p className="text-xs text-gray-500 leading-tight">{u.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
