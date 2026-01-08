import { Link, useLocation } from "react-router-dom";
import { HeartPulse, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: "/assess", label: "Assess Risk" },
    { path: "/technical", label: "Technical" },
    { path: "/about", label: "About" },
    { path: "/faq", label: "FAQ" },
  ];

  const NavLinks = ({ mobile = false }) => (
    <>
      {links.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`relative px-4 py-2 transition-colors duration-200 ${
              isActive ? "text-primary font-medium" : "text-muted-foreground font-medium hover:text-primary"
            } ${mobile ? "text-lg w-full text-center" : "text-sm"}`}
            onClick={() => mobile && setIsOpen(false)}
          >
            {isActive && !mobile && (
              <motion.span
                layoutId="activeNav"
                className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {/* Mobile specific active background (no sliding animation usually better for lists, or consistent) 
                For mobile let's just use simple background class if active for simplicity/performance 
             */}
            {isActive && mobile && (
               <span className="absolute inset-0 bg-primary/10 rounded-lg -z-10" />
            )}
            {link.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <img src="/logo.png" alt="CardioCare Logo" className="h-7 w-7 object-contain" />
          <span className="font-semibold text-2xl tracking-tight text-foreground">
            CardioCare
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
          <ModeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <img src="/logo.png" alt="CardioCare Logo" className="h-6 w-6 object-contain" />
                  CardioCare
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
