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
      const responsedata = await axiosAdmin.get("/admin/alluserspage");
      console.log("inside response", responsedata.data.alluser);

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
    <div className="min-h-screen p-6 md:p-8">
   
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">All Users</h1>

        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#AD49E1]/40"
          />
        </div>
      </div>

      {/* User List */}
      {filteredUsers.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No users found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8">
          {filteredUsers.map((u, i) => (
            <Link key={i} href={`/admin/user/allusers/${u._id}`}>
              <div className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform">
                <div className="relative mb-3 h-16 w-16">
                  {u.avatar ? (
                    <Image
                      src={u.avatar}
                      alt={u.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-[#AD49E1]/20 shadow-md"
                    />
                  ) : (
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#AD49E1]/10 ring-2 ring-[#AD49E1]/20 shadow-md">
                      <span className="text-[#AD49E1] font-semibold text-xl">
                        {u.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <p className="font-semibold text-[#931fd1] leading-tight">{u.name}</p>
                  <p className="text-xs text-gray-500 leading-tight">{u.email}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

