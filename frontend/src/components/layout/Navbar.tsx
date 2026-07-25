import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            HireSense-AI
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-sm text-slate-600">
            Welcome 👋
          </span>

          <button
  onClick={() => navigate("/history")}
  className="rounded-xl bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
>
  History
</button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;