import { useEffect } from 'react';

interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

const SITE_NAME = 'WesternProperties';
const DEFAULT_DESCRIPTION =
  'Find your dream property with WesternProperties. Browse land for sale, rooms for rent, commercial spaces, and leased properties across prime locations.';
const DEFAULT_KEYWORDS =
  'property, real estate, land for sale, rooms for rent, commercial rent, lease, western properties';
const DEFAULT_IMAGE = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200';

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setOgMeta(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useSEO(options: SEOOptions = {}) {
  useEffect(() => {
    const title = options.title ? `${options.title} | ${SITE_NAME}` : SITE_NAME;
    const description = options.description || DEFAULT_DESCRIPTION;
    const keywords = options.keywords || DEFAULT_KEYWORDS;
    const ogImage = options.ogImage || DEFAULT_IMAGE;
    const ogUrl = options.ogUrl || window.location.href;

    document.title = title;
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', 'index, follow');
    setMeta('author', SITE_NAME);

    setOgMeta('og:title', title);
    setOgMeta('og:description', description);
    setOgMeta('og:image', ogImage);
    setOgMeta('og:url', ogUrl);
    setOgMeta('og:type', 'website');
    setOgMeta('og:site_name', SITE_NAME);

    setOgMeta('twitter:card', 'summary_large_image');
    setOgMeta('twitter:title', title);
    setOgMeta('twitter:description', description);
    setOgMeta('twitter:image', ogImage);

    if (options.canonical) setCanonical(options.canonical);
  }, [options.title, options.description, options.ogImage, options.ogUrl]);
}
