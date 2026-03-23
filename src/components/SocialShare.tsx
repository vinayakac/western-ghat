import { Share2, Facebook, Twitter, Linkedin, Link, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface Props {
  url?: string;
  title: string;
  description?: string;
}

export default function SocialShare({ url, title, description = '' }: Props) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const platforms = [
    {
      name: 'Facebook',
      Icon: Facebook,
      color: 'hover:bg-[#1877f2] hover:text-white',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Twitter',
      Icon: Twitter,
      color: 'hover:bg-[#1da1f2] hover:text-white',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'LinkedIn',
      Icon: Linkedin,
      color: 'hover:bg-[#0a66c2] hover:text-white',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'WhatsApp',
      Icon: MessageCircle,
      color: 'hover:bg-[#25d366] hover:text-white',
      href: `https://wa.me/?text=${encodeURIComponent(`${title}\n${description}\n${shareUrl}`)}`,
    },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
        <Share2 className="w-4 h-4" />
        Share:
      </span>
      <div className="flex items-center gap-1.5">
        {platforms.map(({ name, Icon, color, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${name}`}
            className={`w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 transition-all ${color}`}
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
        <button
          onClick={copyLink}
          aria-label="Copy link"
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#0a2240] hover:text-white transition-all relative group"
        >
          <Link className="w-4 h-4" />
          {copied && (
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#0a2240] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
