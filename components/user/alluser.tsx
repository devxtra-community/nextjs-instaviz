"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import axiosAdmin from "@/lib/axiosAdmin";

export default function AllUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 24;

  const getUsers = async (currentPage: number) => {
    try {
      setLoading(true);

      const res = await axiosAdmin.get("/admin/user/allusers", {
        params: { page: currentPage }
      });

      const usersData = res.data.users || [];

      const formatted = usersData.map((u: any) => ({
        _id: u._id,
        name: u.name || "Guest User",
        email: u.email || `guest-${u._id}@noemail.com`,
        avatar: u.picture || u.avatar || u.profilePicture || "",
      }));

      setUsers(formatted);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Fetch error:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers(page);
  }, [page]);

  // Filter only the 24 users on the page
  const filteredUsers = searchTerm
    ? users.filter((u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 md:px-8 bg-[#F9FAFB]">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">All Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            Page {page} of {totalPages}
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#AD49E1]/50"
          />
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AD49E1]"></div>
          <p className="mt-4 text-gray-500 text-sm">Loading users...</p>
        </div>
      ) : (
        <>
          {/* No results */}
          {filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm">
              <div className="text-gray-400 mb-4"><Search size={48} /></div>
              <p className="text-gray-500 text-lg">No users found.</p>
            </div>
          ) : (
            
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {filteredUsers.map((u) => (
                  <Link key={u._id} href={`/admin/user/allusers/${u._id}`}>
                    <div className="flex flex-col items-center text-center hover:scale-105 transition-transform">

                      {/* Avatar */}
                      <div className="relative mb-2 h-20 w-20">
                        {u.avatar ? (
                          <Image
                            src={u.avatar}
                            alt={u.name}
                            width={80}
                            height={80}
                            className="rounded-full object-cover ring-2 ring-[#AD49E1]/20 shadow-md"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center rounded-full bg-[#AD49E1]/10 ring-2 ring-[#AD49E1]/20 shadow-md">
                            <span className="text-[#AD49E1] font-semibold text-2xl">
                              {u.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Name + email */}
                      <p className="font-semibold text-[#931FD1] text-sm">
                        {u.name.length > 14 ? u.name.slice(0, 14) + "…" : u.name}
                      </p>

                      <p className="text-[10px] text-gray-500 max-w-[110px] break-words">
                        {u.email.length > 22 ? u.email.slice(0, 22) + "…" : u.email}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination buttons */}
              <div className="flex justify-center items-center gap-4 mt-8">

                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                    page === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white border shadow hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft size={16} /> Prev
                </button>

                <span className="font-medium text-gray-700">
                  Page {page} / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                    page === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#AD49E1] text-white hover:bg-[#9b34d1]"
                  }`}
                >
                  Next <ChevronRight size={16} />
                </button>

              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
