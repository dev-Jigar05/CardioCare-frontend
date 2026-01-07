import { Link } from "react-router-dom";
import { HeartPulse, Github } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: Brand */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="CardioCare Logo" className="h-12 w-12 object-contain" />
            <span className="font-bold text-2xl tracking-tight text-foreground">
              CardioCare
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Empowering you with early cardiovascular risk insights through advanced machine learning.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Quick Links</h3>
          <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <Link to="/assess" className="hover:text-primary transition-colors hover:underline underline-offset-4">
              Assess Risk
            </Link>
            <Link to="/technical" className="hover:text-primary transition-colors hover:underline underline-offset-4">
              Technical Details
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors hover:underline underline-offset-4">
              About Project
            </Link>
            <Link to="/faq" className="hover:text-primary transition-colors hover:underline underline-offset-4">
              FAQ
            </Link>
          </nav>
        </div>

        {/* Column 3: Legal & Social */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Connect</h3>
          <div className="flex flex-col space-y-4">
             <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
             >
                <Github className="h-4 w-4" />
                <span>View on GitHub</span>
             </a>
             <p className="text-sm text-muted-foreground/80">
                &copy; {new Date().getFullYear()} CardioCare Project. <br />
                All rights reserved.
             </p>
          </div>
        </div>
      </div>
      

    </footer>
  );
}

export default Footer;
