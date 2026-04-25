import { Droplets, Bell, Search, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = ["Dashboard", "Donors", "Inventory", "Hospitals", "Reports"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blood-red shadow-lg">
            <Droplets className="h-5 w-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-extrabold font-display text-foreground leading-none">Crimson Care</p>
            <p className="text-[11px] text-muted-foreground font-medium">Blood Bank System</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => (
            <button
              key={item}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                i === 0
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <Search className="h-4.5 w-4.5" />
          </button>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blood-red ring-2 ring-card" />
          </button>
          <div className="ml-2 hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blood-pink text-xs font-bold text-white">
            AD
          </div>
          <button
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-card px-4 py-3 space-y-1 animate-fade-in">
          {navItems.map((item, i) => (
            <button
              key={item}
              className={`block w-full text-left rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
