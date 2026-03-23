import { useEffect, useState } from 'react';
import { Save, Globe, Phone, Mail, MapPin, Clock, Image, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Setting { key: string; value: string; }

const GROUPS = [
  {
    title: 'Brand & Logo',
    icon: Image,
    fields: [
      { key: 'site_name', label: 'Site Name', type: 'text', placeholder: 'WesternProperties' },
      { key: 'tagline', label: 'Tagline', type: 'text', placeholder: 'Your trusted real estate partner' },
      { key: 'logo_url', label: 'Logo Image URL', type: 'url', placeholder: 'https://your-logo-url.com/logo.png' },
    ],
  },
  {
    title: 'Contact Information',
    icon: Phone,
    fields: [
      { key: 'phone', label: 'Phone Number (Display)', type: 'text', placeholder: '+91 98765 43210' },
      { key: 'phone_raw', label: 'Phone Raw (for links, no spaces)', type: 'text', placeholder: '919876543210' },
      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'info@westernproperties.in' },
      { key: 'whatsapp_text', label: 'WhatsApp Default Message', type: 'text', placeholder: 'Hello! I have a property enquiry.' },
    ],
  },
  {
    title: 'Address & Hours',
    icon: MapPin,
    fields: [
      { key: 'address', label: 'Full Address', type: 'textarea', placeholder: '123 Western Avenue, Goa - 403001' },
      { key: 'business_hours', label: 'Business Hours', type: 'textarea', placeholder: 'Mon – Sat: 9AM – 7PM\nSunday: 10AM – 5PM' },
    ],
  },
  {
    title: 'Social Media Links',
    icon: Globe,
    fields: [
      { key: 'facebook_url', label: 'Facebook URL', type: 'url', placeholder: 'https://facebook.com/yourpage' },
      { key: 'twitter_url', label: 'Twitter / X URL', type: 'url', placeholder: 'https://twitter.com/yourhandle' },
      { key: 'instagram_url', label: 'Instagram URL', type: 'url', placeholder: 'https://instagram.com/yourhandle' },
      { key: 'youtube_url', label: 'YouTube URL', type: 'url', placeholder: 'https://youtube.com/@yourchannel' },
    ],
  },
];

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  facebook_url: Facebook,
  twitter_url: Twitter,
  instagram_url: Instagram,
  youtube_url: Youtube,
  phone: Phone,
  email: Mail,
  address: MapPin,
  business_hours: Clock,
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('site_settings').select('key, value');
    const map: Record<string, string> = {};
    (data || []).forEach((s: Setting) => { map[s.key] = s.value; });
    setSettings(map);
    setLoading(false);
  };

  const handleSaveGroup = async (groupTitle: string, keys: string[]) => {
    setSaving(groupTitle);
    const updates = keys.map(key => ({
      key,
      value: settings[key] || '',
    }));
    for (const update of updates) {
      await supabase.from('site_settings').upsert(update, { onConflict: 'key' });
    }
    setSaving(null);
    setSaved(groupTitle);
    setTimeout(() => setSaved(null), 2000);
  };

  if (loading) {
    return <div className="space-y-4">{[1,2,3,4].map(i => <div key={i} className="bg-white rounded-2xl h-48 animate-pulse" />)}</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0a2240]">Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Control all website content and contact information</p>
      </div>

      <div className="space-y-6">
        {GROUPS.map(({ title, icon: GroupIcon, fields }) => {
          const keys = fields.map(f => f.key);
          const isSaving = saving === title;
          const isSaved = saved === title;

          return (
            <div key={title} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
                <div className="w-8 h-8 bg-[#c9a84c]/10 rounded-lg flex items-center justify-center">
                  <GroupIcon className="w-4 h-4 text-[#c9a84c]" />
                </div>
                <h2 className="font-semibold text-[#0a2240] text-sm">{title}</h2>
              </div>

              <div className="p-6 space-y-4">
                {fields.map(({ key, label, type, placeholder }) => {
                  const Icon = SOCIAL_ICONS[key];
                  return (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">{label}</label>
                      {type === 'textarea' ? (
                        <textarea
                          rows={3}
                          value={settings[key] || ''}
                          onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] resize-none"
                        />
                      ) : (
                        <div className="relative">
                          {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
                          <input
                            type={type}
                            value={settings[key] || ''}
                            onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                            placeholder={placeholder}
                            className={`w-full border border-gray-200 rounded-xl py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="px-6 pb-5 flex justify-end">
                <button
                  onClick={() => handleSaveGroup(title, keys)}
                  disabled={isSaving}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isSaved
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#c9a84c] hover:bg-[#b8963e] text-white'
                  } disabled:opacity-60`}
                >
                  {isSaving ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSaved ? (
                    'Saved!'
                  ) : (
                    <><Save className="w-4 h-4" /> Save {title}</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
