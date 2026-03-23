import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Clock,
} from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";

export default function Footer() {
  const { settings } = useSiteSettings();

  const SOCIAL = [
    { Icon: Facebook, href: settings.facebook_url, label: "Facebook" },
    { Icon: Twitter, href: settings.twitter_url, label: "Twitter" },
    { Icon: Instagram, href: settings.instagram_url, label: "Instagram" },
    { Icon: Youtube, href: settings.youtube_url, label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-[#0a2240] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {settings.logo_url ? (
                <img
                  src={settings.logo_url}
                  alt={settings.site_name}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <div className="w-9 h-9 bg-[#c9a84c] rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <span className="text-white font-bold text-xl leading-none block">
                  Western
                </span>
                <span className="text-[#c9a84c] font-semibold text-sm leading-none tracking-wider uppercase">
                  Properties
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              {settings.tagline ||
                "Your trusted partner in finding the perfect property across Goa and India."}
            </p>
            {SOCIAL.length > 0 && (
              <div className="flex gap-3">
                {SOCIAL.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 bg-white/10 hover:bg-[#c9a84c] rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Property Types
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Land for Sale", path: "/land" },
                { label: "Room for Rent", path: "/rent?type=room_rent" },
                { label: "Land for Rent", path: "/rent?type=land_rent" },
                {
                  label: "Commercial Rent",
                  path: "/rent?type=commercial_rent",
                },
                { label: "Lease Properties", path: "/properties?type=lease" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-white/60 hover:text-[#c9a84c] text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "All Properties", path: "/properties" },
                {
                  label: "Featured Properties",
                  path: "/properties?featured=true",
                },
                { label: "Contact Us", path: "/contact" },
                { label: "Privacy Policy", path: "/privacy-policy" },
                { label: "Terms & Conditions", path: "/terms-and-conditions" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-white/60 hover:text-[#c9a84c] text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  {settings.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${settings.phone_raw}`}
                  className="flex items-center gap-3 text-white/60 hover:text-[#c9a84c] text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                  {settings.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 text-white/60 hover:text-[#c9a84c] text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Business Hours</p>
                  <p className="text-white/80 text-sm whitespace-pre-line">
                    {settings.business_hours}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {settings.site_name}. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link
              to="/privacy-policy"
              className="text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
