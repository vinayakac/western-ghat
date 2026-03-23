import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Phone } from "lucide-react";
import { SITE_CONFIG } from "../lib/config";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Properties", path: "/properties" },
  { label: "Land for Sale", path: "/land" },
  { label: "Rent", path: "/rent" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isTransparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent ? "bg-transparent" : "bg-[#0a2240] shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#c9a84c] rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-xl leading-none block">
                Western
              </span>
              <span className="text-[#c9a84c] font-semibold text-sm leading-none tracking-wider uppercase">
                Properties
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path.split("?")[0] &&
                  !link.path.includes("?")
                    ? "text-[#c9a84c] bg-white/10"
                    : "text-white/90 hover:text-[#c9a84c] hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="flex items-center gap-2 text-white/90 hover:text-[#c9a84c] transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              {SITE_CONFIG.phone}
            </a>
            <Link
              to="/contact"
              className="bg-[#c9a84c] hover:bg-[#b8963e] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg"
            >
              Get in Touch
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#0a2240] border-t border-white/10">
          <nav className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-3 text-white/90 hover:text-[#c9a84c] hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10 mt-2">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="flex items-center gap-2 px-4 py-3 text-white/90 text-sm"
              >
                <Phone className="w-4 h-4" />
                {SITE_CONFIG.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
