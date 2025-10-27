export function Sidebar() {
  return (
    <aside className="w-64 bg-violet-700 text-white flex flex-col py-6 px-5 shadow-lg min-h-screen">
      <div className="font-bold text-2xl mb-6 tracking-tight">File Upload</div>
      <button className="bg-white text-violet-700 px-6 py-2 rounded mb-4 font-semibold">Upload</button>
      <div className="text-xs text-white/80 mt-8">Menu</div>
      {/* Add menu items/icons */}
    </aside>
  );
}