import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-xs backdrop-saturate-150 flex items-center justify-between px-8 py-2 border-b border-black/10">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-2xl font-extrabold text-violet-700 tracking-tight">InstaviZ</h1>
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <Link 
          href="/"
          className="relative text-base font-medium text-gray-700 hover:text-violet-700 transition duration-200 
            before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-violet-700 before:transition-all before:duration-300 hover:before:w-full"
          >
          Dashboard
        </Link>
        <Link 
          href="/ourplans"
          className="relative text-base font-medium text-gray-700 hover:text-violet-700 transition duration-200 
            before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-violet-700 before:transition-all before:duration-300 hover:before:w-full"
        >
          Pricing
        </Link>
        <Link 
          href="/login"
          className="relative text-base font-medium text-gray-700 hover:text-violet-700 transition duration-200
            before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-violet-700 before:transition-all before:duration-300 hover:before:w-full"
        >
          Login
        </Link>
        <Link 
          href="/signup"
          className="relative text-base font-medium text-white bg-violet-700 hover:bg-violet-800 rounded px-3 py-1.5 transition duration-200"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}
