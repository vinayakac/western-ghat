interface Props {
  number?: string;
  message?: string;
}

export default function WhatsAppButton({
  number = "919876543210",
  message = "Hello! I am interested in your properties.",
}: Props) {
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#22c45e] transition-all duration-300 hover:scale-110 shadow-[0_0_40px_rgba(37,211,102,0.55)]">
        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8 text-white"
          fill="currentColor"
        >
          <path d="M16.004 3C8.82 3 3 8.82 3 16.004c0 2.82.902 5.42 2.438 7.54L4 29l5.64-1.48a12.96 12.96 0 006.364 1.62C23.18 29.14 29 23.32 29 16.136 29 8.95 23.18 3 16.004 3zm0 23.18c-1.98 0-3.92-.54-5.6-1.56l-.4-.24-3.34.88.9-3.26-.26-.42A10.16 10.16 0 015.9 16c0-5.56 4.52-10.08 10.08-10.08S26.06 10.44 26.06 16 21.56 26.18 16 26.18zm5.54-7.54c-.3-.16-1.78-.88-2.06-.98-.28-.1-.48-.16-.68.16s-.78.98-.96 1.18c-.18.2-.36.22-.66.08-.3-.16-1.26-.46-2.4-1.46-.88-.78-1.48-1.74-1.66-2.04-.18-.3-.02-.46.14-.62.14-.14.3-.36.46-.54.16-.18.22-.3.34-.5.12-.2.06-.38-.02-.54-.08-.16-.68-1.64-.94-2.24-.24-.58-.48-.5-.66-.5h-.56c-.18 0-.46.06-.7.34-.24.28-.92.9-.92 2.2s.94 2.56 1.06 2.74c.14.18 1.84 2.8 4.46 3.92.62.26 1.1.42 1.48.54.62.2 1.18.18 1.62.1.5-.08 1.78-.72 2.04-1.42.26-.7.26-1.3.18-1.42-.08-.12-.28-.2-.58-.36z" />
        </svg>

        {/* Notification Dot */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></span>
      </div>

      {/* Tooltip */}
      <span className="absolute right-20 top-1/2 -translate-y-1/2 bg-[#0a2240] text-white text-xs px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg pointer-events-none">
        Chat on WhatsApp
      </span>
    </a>
  );
}
