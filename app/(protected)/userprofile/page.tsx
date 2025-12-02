"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Settings } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function ProfilePage() {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  async function getsession() {
    const logged = await axiosInstance.get("/auth/getAllSessions");
    console.log(logged.data);
    setDevices(logged.data.sessions);
  }
  useEffect(() => {
    getsession();
  }, []);
  useEffect(() => {
    const id = localStorage.getItem("sessionId");
    setCurrentSessionId(id);
  }, []);

  function parseUserAgent(ua: string) {
    let os = "Unknown OS";
    let device = "Unknown Device";
    let browser = "Unknown Browser";

    if (ua.includes("Windows NT")) os = "Windows";
    else if (ua.includes("Macintosh")) os = "macOS";
    else if (ua.includes("Android") && ua.includes("Mobile")) os = "Android";
    else if (ua.includes("iPhone")) os = "iPhone";

    if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari") && !ua.includes("Chrome"))
      browser = "Safari";

    if (os === "Windows") device = "Windows PC";
    else if (os === "macOS") device = "MacBook / iMac";
    else if (os === "Android") device = "Android Phone";
    else if (os === "iPhone") device = "iPhone";

    return { device, browser, os };
  }

  const router = useRouter();

  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("/user.jpg");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [devices, setDevices] = useState<any[]>([]);

  const logoutDevice = async (id: string) => {
    console.log("clicked logoutdevice", id);
    const currentSessionId = localStorage.getItem("sessionId");

    try {
      const resp = await axiosInstance.post("/auth/logoutDevice", {
        sessionId: id,
        currentSessionId: currentSessionId,
      });
      console.log(resp.data);

      getsession();
      toast.success("Logged out from this device");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to logout device");
    }
  };

  const logoutAllDevices = async () => {
    console.log("in logoutAll Devices");
    try {
      const currentSessionId = localStorage.getItem("sessionId");

      if (!currentSessionId) {
        toast.error("No session found");
        return;
      }

      const resp = await axiosInstance.post("/auth/logoutAllDevices", {
        currentSessionId,
      });

      toast.success(resp.data.message);
      getsession();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to logout devices");
    }
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
    if (!oldPassword || !newPassword)
      return toast.error("Both fields required");

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
      toast.warning(err?.response?.data?.message || "Failed to update");
    }
  };
  //comment
  const handleLogout = async () => {
    try {
      const id = localStorage.getItem("sessionId");

      if (id) {
        await axiosInstance.post("/auth/logoutDevice", {
          sessionId: id,
          currentSessionId: id,
        });
      }

      localStorage.clear();
      toast.success("Logged out");
      router.push("/home");
    } catch (err) {
      toast.error("Logout failed");
    }
  };
  const switchPassword = () => {
    if (isChangingPassword == true) {
      setIsChangingPassword(false);
    } else {
      setIsChangingPassword(true);
    }
  };
  return (
    <div className="min-h-screen p-6 flex justify-center bg-dot-fade ">
      <Navbar />
      <div className="w-full max-w-6xl pt-15 flex gap-8 flex-col md:flex-row">
        <div className="flex-1 border rounded-2xl p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Profile & Account Settings
          </h2>

          <div className="flex items-center  gap-4 border p-4 rounded-xl mb-6">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <Image
                src={profilePic}
                alt="Profile"
                width={70}
                height={70}
                className="rounded-full border"
              />
            </div>
            <div className=" flex flex-col gap-1">
              <p className="logo font-semibold text-lg">{name}</p>
              <p className="text-gray-500 text-sm subtitle tracking-widest ">
                {email}
              </p>
              <p className=" md:hidden border border-gray-300 mt-1 text-gray-600 handwriting text-sm w-18 p-1 text-center rounded-2xl bg-gray-200">
                Premium
              </p>
            </div>
            <p className="hidden md:block ml-15 border border-gray-300  text-gray-600 handwriting text-sm p-2 rounded-2xl bg-gray-200">
              Premium
            </p>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={handleProfileUpdate}
              className="px-4 py-2 rounded-full primarybg tracking-wider text-white text-sm hoverBg transition cursor-pointer"
            >
              Update Profile Picture
            </button>
            <Settings size={26} className="cursor-pointer" color="gray" />
          </div>

          <div className="mt-8">
            <button
              className="text-md text-red-500 cursor-pointer handwriting tracking-wider hover:underline"
              onClick={() => switchPassword()}
            >
              Change password
            </button>

            {isChangingPassword && (
              <div className="mt-4 space-y-3">
                <input
                  type="password"
                  placeholder="Old password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-purple-400  outline-none"
                />
                <input
                  type="password"
                  placeholder="New password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-purple-400  outline-none"
                />

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setIsChangingPassword(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 cursor-pointer text-gray-700 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updatePassword}
                    className="px-4 py-2 rounded-lg primarybg hoverBg cursor-pointer text-white text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="mt-10 w-full py-2 rounded-lg text-white primarybg hoverBg font-semibold hover:bg-red-200 transition cursor-pointer"
          >
            Logout
          </button>
        </div>

        <div className="flex-1 border rounded-2xl p-6 bg-white/80 backdrop-blur-sm ">
          <h3 className="text-lg font-bold mb-4 tracking-wider logo">
            Logged in Devices
          </h3>

          <button
            onClick={logoutAllDevices}
            className="px-4 py-1.5 rounded-xl text-sm  text-white primarybg border mb-6 hoverBg cursor-pointer transition"
          >
            Logout from all other devices
          </button>

          <div className="space-y-4">
            {devices.map((d) => {
              const { device, browser, os } = parseUserAgent(d.userAgent);
              const isCurrent = d._id === currentSessionId;

              return (
                <div
                  key={d._id}
                  className="border p-4 rounded-xl flex flex-col gap-2"
                >
                  <p className="font-bold text-lg">{device}</p>

                  <p className="text-sm text-gray-500 subtitle tracking-wider">
                    {browser} • {os}
                  </p>

                  <p className="text-xs text-gray-500">IP: {d.ip}</p>

                  <p className="text-sm text-red-400 handwriting tracking-wide ">
                    Last active: {new Date(d.lastActiveAt).toLocaleString()}
                  </p>

                  {isCurrent ? (
                    <p className="mt-1 text-xs font-medium text-green-600">
                      ✓ Current device
                    </p>
                  ) : (
                    <button
                      onClick={() => logoutDevice(d._id)}
                      className="mt-3 px-3 py-1 rounded-full bg-red-500 text-white text-xs hover:bg-red-600 transition"
                    >
                      Logout this device
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
//comment