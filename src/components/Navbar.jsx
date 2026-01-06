import { Link } from "react-router-dom";
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

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link
        to="/assess"
        className={`text-muted-foreground hover:text-primary transition-colors ${
          mobile ? "text-lg py-2 font-medium" : "text-sm font-medium"
        }`}
        onClick={() => mobile && setIsOpen(false)}
      >
        Assess Risk
      </Link>
      <Link
        to="/technical"
        className={`text-muted-foreground hover:text-primary transition-colors ${
          mobile ? "text-lg py-2 font-medium" : "text-sm font-medium"
        }`}
        onClick={() => mobile && setIsOpen(false)}
      >
        Technical
      </Link>
      <Link
        to="/about"
        className={`text-muted-foreground hover:text-primary transition-colors ${
          mobile ? "text-lg py-2 font-medium" : "text-sm font-medium"
        }`}
        onClick={() => mobile && setIsOpen(false)}
      >
        About
      </Link>
      <Link
        to="/faq"
        className={`text-muted-foreground hover:text-primary transition-colors ${
          mobile ? "text-lg py-2 font-medium" : "text-sm font-medium"
        }`}
        onClick={() => mobile && setIsOpen(false)}
      >
        FAQ
      </Link>
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
          <img src="/logo.png" alt="CardioCare Logo" className="h-14 w-14 object-contain" />
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
                  <img src="/logo.png" alt="CardioCare Logo" className="h-8 w-8 object-contain" />
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
