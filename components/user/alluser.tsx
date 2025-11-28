"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import axiosAdmin from "@/lib/axiosAdmin";

export default function AllUsers() {
  const [alluser, setalluser] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const alluserstopage = async () => {
    try {
      const responsedata = await axiosAdmin.get("/admin/user/allusers");

      const users = responsedata.data.alluser.map((u: any) => ({
        _id: u._id,
        name: u.name || "Guest User",
        email: u.email || `guest-${u._id}@noemail.com`,
        avatar: u.picture || "",
      }));

      setalluser(users);
    } catch (err) {
      console.log("error fetching users:", err);
    }
  };

  useEffect(() => {
    alluserstopage();
  }, []);

  const filteredUsers = alluser.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 md:px-8">

      {/* Header + Search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          All Users
        </h1>

        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="absolute left-3 top-2.5 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#AD49E1]/50"
          />
        </div>
      </div>

      {/* User List */}
{filteredUsers.length === 0 ? (
  <div className="text-center text-gray-500 mt-10">No users found.</div>
) : (
  <div
    className="
      grid 
      grid-cols-2 
      gap-x-3 gap-y-8
      sm:grid-cols-3 
      md:grid-cols-4 
      lg:grid-cols-5 
      xl:grid-cols-6
    "
  >
    {filteredUsers.map((u, i) => (
      <Link key={i} href={`/admin/user/allusers/${u._id}`}>
        <div className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform">

          {/* Avatar */}
          <div className="relative mb-2 h-14 w-14 sm:h-20 sm:w-20">
            {u.avatar ? (
              <Image
                src={u.avatar}
                alt={u.name}
                width={80}
                height={80}
                className="h-full w-full rounded-full object-cover ring-2 ring-[#AD49E1]/20 shadow-md"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center rounded-full bg-[#AD49E1]/10 ring-2 ring-[#AD49E1]/20 shadow-md">
                <span className="text-[#AD49E1] font-semibold text-lg sm:text-2xl">
                  {u.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="space-y-0.5">
            <p className="font-semibold text-[#931fd1] leading-tight text-sm">
              {u.name.length > 12 ? u.name.slice(0, 12) + "…" : u.name}
            </p>

            <p className="text-[10px] text-gray-500 leading-tight break-words max-w-[100px]">
              {u.email}
            </p>
          </div>
        </div>
      </Link>
    ))}
  </div>
)}

    </div>
  );
}
