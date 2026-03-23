import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { SITE_CONFIG } from '../lib/config';

export interface SiteSettings {
  site_name: string;
  tagline: string;
  phone: string;
  phone_raw: string;
  email: string;
  address: string;
  whatsapp_text: string;
  business_hours: string;
  logo_url: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  youtube_url: string;
}

const DEFAULT: SiteSettings = {
  site_name: SITE_CONFIG.name,
  tagline: SITE_CONFIG.tagline,
  phone: SITE_CONFIG.phone,
  phone_raw: SITE_CONFIG.phoneRaw,
  email: SITE_CONFIG.email,
  address: SITE_CONFIG.address,
  whatsapp_text: SITE_CONFIG.whatsappText,
  business_hours: SITE_CONFIG.hours,
  logo_url: '',
  facebook_url: SITE_CONFIG.social.facebook,
  twitter_url: SITE_CONFIG.social.twitter,
  instagram_url: SITE_CONFIG.social.instagram,
  youtube_url: SITE_CONFIG.social.youtube,
};

let cache: SiteSettings | null = null;
const listeners: Array<(s: SiteSettings) => void> = [];

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(cache || DEFAULT);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) { setSettings(cache); setLoading(false); return; }

    listeners.push(setSettings);

    supabase.from('site_settings').select('key, value').then(({ data }) => {
      const map: Partial<SiteSettings> = {};
      (data || []).forEach(({ key, value }: { key: string; value: string }) => {
        (map as Record<string, string>)[key] = value;
      });
      const merged: SiteSettings = { ...DEFAULT, ...map };
      cache = merged;
      listeners.forEach(fn => fn(merged));
      setLoading(false);
    });

    return () => {
      const idx = listeners.indexOf(setSettings);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }, []);

  return { settings, loading };
}
