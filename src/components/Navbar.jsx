import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="p-2 rounded-lg bg-primary/10">
            <HeartPulse className="h-5 w-5 text-primary" />
          </div>
          <span className="font-semibold text-lg tracking-tight">
            CardioCare
          </span>
        </Link>

        {/* Links */}
        <div className="flex gap-8 text-sm font-medium">
          <Link
            to="/assess"
            className="text-slate-700 transition-colors hover:text-primary"
          >
            Assess Risk
          </Link>
          <Link
            to="/technical"
            className="text-slate-700 transition-colors hover:text-primary"
          >
            Technical
          </Link>
          <Link
            to="/about"
            className="text-slate-700 transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link 
            to="/faq"
            className="text-slate-700 transition-colors hover:text-primary"
          >
            FAQ
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
