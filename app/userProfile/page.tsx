"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfilePage() {
  const router = useRouter();

  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("/user.jpg");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [devices, setDevices] = useState([
    {
      id: "1",
      device: "MacBook Pro",
      browser: "Chrome",
      os: "macOS",
      ip: "192.168.0.45",
      lastActive: "10 mins ago",
      current: true,
    },
    {
      id: "2",
      device: "Samsung S23",
      browser: "Chrome Mobile",
      os: "Android",
      ip: "192.168.0.91",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: "3",
      device: "Office Desktop",
      browser: "Edge",
      os: "Windows 11",
      ip: "103.91.44.12",
      lastActive: "Yesterday",
      current: false,
    },
  ]);
  const logoutDevice = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
    toast.success("Logged out from device");
  };

  const logoutAllDevices = () => {
    setDevices((prev) => prev.filter((d) => d.current));
    toast.success("Logged out from all other devices");
  };


  useEffect(() => {
    const googleToken = localStorage.getItem("token");
    const normalToken = localStorage.getItem("accessToken");

    const finalToken = googleToken || normalToken;
    if (!finalToken) return router.push("/login");

    try {
      const decoded: any = jwtDecode(finalToken);
      const id = decoded?.id || decoded?.googleId || decoded?.userId;
      if (id) setUserId(id.toString());
    } catch {
      toast.error("Invalid session");
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const res = await axiosInstance.get(`/user/${userId}`);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        if (res.data?.user?.picture) setProfilePic(res.data.user.picture);
      } catch {
        toast.error("Failed to load profile details");
      }
    })();
  }, [userId]);

  const handleProfileUpdate = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";

    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const res = await axiosInstance.put("/user/upload", {
            userId,
            image: reader.result as string,
          });

          setProfilePic(res.data.imageUrl);
          toast.success("Profile updated!");
        } catch {
          toast.error("Upload failed");
        }
      };

      reader.readAsDataURL(file);
    };

    input.click();
  };

  const updatePassword = async () => {
    if (!oldPassword || !newPassword) return toast.error("Both fields required");

    try {
      const res = await axiosInstance.post("/user/newpassword", {
        userId,
        oldPassword,
        newPassword,
      });

      toast.success(res.data.message);
      setIsChangingPassword(false);
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update");
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.clear();
      toast.success("Logged out");
      router.push("/home");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen p-6 flex justify-center dotted-bg">
      <div className="w-full max-w-6xl flex gap-8 flex-col md:flex-row">
        
        <div className="flex-1 border rounded-2xl p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6 text-gray-900">
            Profile & Account Settings
          </h2>

          <div className="flex items-center gap-4 border p-4 rounded-xl mb-6">
            <Image
              src={profilePic}
              alt="Profile"
              width={70}
              height={70}
              className="rounded-full border"
            />
            <div>
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-gray-500 text-sm">{email}</p>
            </div>
          </div>
          <button
            onClick={handleProfileUpdate}
            className="px-4 py-2 rounded-full bg-violet-600 text-white text-sm hover:bg-violet-700 transition"
          >
            Update Profile Picture
          </button>

          <div className="mt-8">
            <button
              className="text-sm text-red-500 underline"
              onClick={() => setIsChangingPassword(true)}
            >
              Change password
            </button>

            {isChangingPassword && (
              <div className="mt-4 space-y-3">
                <input
                  type="password"
                  placeholder="Old password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="password"
                  placeholder="New password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsChangingPassword(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updatePassword}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-10 w-full py-2 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition"
          >
            Logout
          </button>
        </div>

        {/* LOGGED-IN DEVICES */}
        <div className="flex-1 border rounded-2xl p-6 bg-white/80 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Logged in devices</h3>

          <button
            onClick={logoutAllDevices}
            className="px-3 py-1.5 rounded-full text-xs bg-red-50 text-red-600 border border-red-200 mb-4 hover:bg-red-100 transition"
          >
            Logout from all other devices
          </button>

          <div className="space-y-4">
            {devices.map((d) => (
              <div key={d.id} className="border p-4 rounded-xl">
                <p className="font-semibold">{d.device}</p>
                <p className="text-sm text-gray-600">
                  {d.browser} • {d.os}
                </p>
                <p className="text-xs text-gray-500">IP: {d.ip}</p>
                <p className="text-xs text-gray-400">Last active: {d.lastActive}</p>

                {!d.current && (
                  <button
                    onClick={() => logoutDevice(d.id)}
                    className="mt-3 px-3 py-1 rounded-full bg-red-500 text-white text-xs hover:bg-red-600 transition"
                  >
                    Logout this device
                  </button>
                )}

                {d.current && (
                  <p className="mt-2 text-xs font-medium text-green-600">
                    ✓ Current device
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
