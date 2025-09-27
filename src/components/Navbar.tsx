import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/actions";
import type { InitState } from "@/interfaces/dataType";

// ------------------------------------------------------------
// Lightweight theme manager for Vite (no next-themes required)
// ------------------------------------------------------------


function ThemeToggle() {
  const dispatch = useDispatch();
  const activeTheme = useSelector((state:InitState) => state.activeTheme);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={()=> dispatch(toggleTheme())}
      className="rounded-full cursor-pointer"
    >
      {activeTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: App Name */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight hover:opacity-90"
          aria-label="Hazari Game Calculator Home"
        >
          Hazari Calculator
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`rounded-xl px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground/90 hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="ml-1 pl-1">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile: Theme + Menu */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <MobileMenu currentPath={location.pathname} />
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ currentPath }: { currentPath: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="rounded-full">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Hazari Calculator</SheetTitle>
        </SheetHeader>
        <div className="mt-4 grid gap-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}