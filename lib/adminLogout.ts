import axiosAdmin from "@/lib/axiosAdmin";

export async function adminLogout() {
  try {
    localStorage.removeItem("adminAccessToken");
    document.cookie = "accessToken=; path=/; max-age=0";
    await axiosAdmin.post("/admin/logout");
    window.location.href = "/admin/login";
  } catch (err) {
    console.log("Logout error:", err);
    window.location.href = "/admin/login";
  }
}
