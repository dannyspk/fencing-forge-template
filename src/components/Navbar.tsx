import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = ["Services", "Projects", "About", "Contact"];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-lg font-bold tracking-tight text-primary">
          FENCECO.
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
          <button className="h-10 px-6 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-all hover:brightness-110 active:scale-[0.98]">
            Get a Quote
          </button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-6 space-y-4">
          {links.map((l) => (
            <a key={l} href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
          <button className="w-full h-10 bg-primary text-primary-foreground rounded-md text-sm font-medium">
            Get a Quote
          </button>
        </div>
      )}
    </nav>
  );
};
