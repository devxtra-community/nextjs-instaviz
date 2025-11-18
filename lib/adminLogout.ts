import axiosAdmin from "@/lib/axiosAdmin";

export async function adminLogout() {
  try {
    // Remove access token from frontend storage
    localStorage.removeItem("adminAccessToken");

    // Tell backend to delete refreshToken cookie + DB entry
    await axiosAdmin.post("/admin/logout");

    // Redirect to login
    window.location.href = "/admin/login";
  } catch (err) {
    console.log("Logout error:", err);
    window.location.href = "/admin/login";
  }
}
