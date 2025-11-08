"use client";

import Image from "next/image";
import { Search } from "lucide-react";

export default function AllUsers() {
  const users = [
    { name: "Emilia Clarke", email: "emilia@technext.com", avatar: "/avatars/emilia.jpg" },
    { name: "Kit Harington", email: "kit@harvard.edu", avatar: "/avatars/kit.jpg" },
    { name: "Sophie Turner", email: "sophie@mit.edu", avatar: "/avatars/sophie.jpg" },
    { name: "Peter Dinklage", email: "peter@mit.edu", avatar: "/avatars/peter.jpg" },
    { name: "Nikolaj Coster", email: "nikolaj@archery.mit", avatar: "/avatars/nikolaj.jpg" },
    { name: "Isaac Hempstead", email: "isaac@asymptones.org", avatar: "/avatars/isaac.jpg" },
    { name: "Alfie Allen", email: "alfie@braintrust.com", avatar: "/avatars/alfie.jpg" },
    { name: "Iain Glen", email: "iain@gsas.org", avatar: "/avatars/iain.jpg" },
    { name: "Liam Cunningham", email: "liam@caving.mit", avatar: "/avatars/liam.jpg" },
    { name: "John Bradley", email: "john@chessclub.com", avatar: "/avatars/john.jpg" },
    { name: "Rory McCann", email: "rory@chamber.org", avatar: "/avatars/rory.jpg" },
    { name: "Joe Dempsie", email: "joe@clubchem.edu", avatar: "/avatars/joe.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Header + Search */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-black tracking-tight">
          All Users
        </h1>

        {/* Search bar (UI only) */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#AD49E1]/40"
          />
        </div>
      </div>

      {/* Users grid — compact cards, 6 per row on xl */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8">
        {users.map((u, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-3 h-16 w-16">
              <Image
                src={u.avatar}
                alt={u.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-[#AD49E1]/20 shadow-md"
              />
            </div>

            {/* Name + Email */}
            <div className="space-y-0.5">
              <p className="font-semibold text-[#AD49E1] leading-tight">
                {u.name}
              </p>
              <p className="text-xs text-gray-500 leading-tight">{u.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
