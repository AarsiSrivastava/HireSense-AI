function Navbar() {
  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-500">
          HireSense AI
        </div>

        {/* Navigation Links */}
        <ul className="hidden gap-8 text-slate-300 md:flex">
          <li className="cursor-pointer hover:text-blue-400">Features</li>
          <li className="cursor-pointer hover:text-blue-400">How it Works</li>
          <li className="cursor-pointer hover:text-blue-400">Pricing</li>
          <li className="cursor-pointer hover:text-blue-400">Contact</li>
        </ul>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="rounded-lg px-4 py-2 text-slate-300 hover:text-white">
            Login
          </button>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;