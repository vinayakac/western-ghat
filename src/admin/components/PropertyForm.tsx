import { useState, FormEvent } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Property, PropertyType, PROPERTY_TYPE_LABELS } from '../../types/property';

interface Props {
  property: Property | null;
  onClose: () => void;
  onSaved: () => void;
}

const AMENITY_OPTIONS = ['WiFi', 'Parking', 'Water Supply', 'Electricity', 'Boundary Wall', 'Road Access', 'Garden', 'Security', 'Swimming Pool', 'Gym'];

const EMPTY: Partial<Property> = {
  title: '', description: '', type: 'land_sale', price: 0, price_period: 'total',
  area: 0, area_unit: 'sqft', bedrooms: null, bathrooms: null,
  address: '', city: '', state: 'Goa', country: 'India', zip_code: '',
  featured: false, available: true, whatsapp_number: '', cover_image: '',
  amenities: [], agent_name: '', agent_phone: '', agent_email: '', video_url: '',
};

export default function PropertyForm({ property, onClose, onSaved }: Props) {
  const [form, setForm] = useState<Partial<Property>>(property ? { ...property } : { ...EMPTY });
  const [images, setImages] = useState<string[]>(
    property?.property_images?.map(i => i.url) || []
  );
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof Property, value: unknown) => setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      title: form.title, description: form.description, type: form.type,
      price: Number(form.price), price_period: form.price_period,
      area: form.area ? Number(form.area) : null, area_unit: form.area_unit,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
      address: form.address, city: form.city, state: form.state,
      country: form.country, zip_code: form.zip_code,
      featured: form.featured, available: form.available,
      whatsapp_number: form.whatsapp_number, cover_image: form.cover_image,
      amenities: form.amenities, agent_name: form.agent_name,
      agent_phone: form.agent_phone, agent_email: form.agent_email,
      video_url: form.video_url, updated_at: new Date().toISOString(),
    };

    let propertyId = property?.id;

    if (property?.id) {
      const { error: err } = await supabase.from('properties').update(payload).eq('id', property.id);
      if (err) { setError(err.message); setLoading(false); return; }
    } else {
      const { data, error: err } = await supabase.from('properties').insert(payload).select('id').single();
      if (err || !data) { setError(err?.message || 'Failed to create'); setLoading(false); return; }
      propertyId = data.id;
    }

    if (propertyId) {
      await supabase.from('property_images').delete().eq('property_id', propertyId);
      if (images.length > 0) {
        await supabase.from('property_images').insert(
          images.map((url, i) => ({ property_id: propertyId, url, sort_order: i }))
        );
      }
    }

    setLoading(false);
    onSaved();
  };

  const addImage = () => {
    if (newImage.trim()) { setImages(i => [...i, newImage.trim()]); setNewImage(''); }
  };

  const Input = ({ label, name, type = 'text', required = false, className = '' }: {
    label: string; name: keyof Property; type?: string; required?: boolean; className?: string;
  }) => (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}{required && ' *'}</label>
      <input
        type={type}
        required={required}
        value={(form[name] as string | number) ?? ''}
        onChange={e => set(name, e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center p-4 pt-8">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-[#0a2240] text-lg">{property ? 'Edit Property' : 'Add New Property'}</h2>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400"><X className="w-5 h-5" /></button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Property Title" name="title" required className="sm:col-span-2" />
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Type *</label>
                <select
                  required
                  value={form.type}
                  onChange={e => set('type', e.target.value as PropertyType)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                >
                  {Object.entries(PROPERTY_TYPE_LABELS).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Price Period</label>
                <select
                  value={form.price_period ?? 'total'}
                  onChange={e => set('price_period', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                >
                  <option value="total">Total</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="per_sqft">Per Sqft</option>
                </select>
              </div>
              <Input label="Price (₹)" name="price" type="number" required />
              <Input label="Area" name="area" type="number" />
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Area Unit</label>
                <select
                  value={form.area_unit}
                  onChange={e => set('area_unit', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                >
                  {['sqft', 'sqm', 'acre', 'guntha', 'hectare', 'cents'].map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <Input label="Bedrooms" name="bedrooms" type="number" />
              <Input label="Bathrooms" name="bathrooms" type="number" />
              <Input label="Address" name="address" required className="sm:col-span-2" />
              <Input label="City" name="city" required />
              <Input label="State" name="state" required />
              <Input label="ZIP Code" name="zip_code" />
              <Input label="WhatsApp Number" name="whatsapp_number" />
              <Input label="Cover Image URL" name="cover_image" className="sm:col-span-2" />
              <Input label="Video URL" name="video_url" className="sm:col-span-2" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={4}
                value={form.description ?? ''}
                onChange={e => set('description', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {AMENITY_OPTIONS.map(a => {
                  const active = (form.amenities || []).includes(a);
                  return (
                    <button
                      type="button"
                      key={a}
                      onClick={() => set('amenities', active
                        ? (form.amenities || []).filter(x => x !== a)
                        : [...(form.amenities || []), a]
                      )}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${active ? 'bg-[#c9a84c] text-white border-[#c9a84c]' : 'border-gray-200 text-gray-600 hover:border-[#c9a84c]'}`}
                    >{a}</button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Gallery Images</label>
              <div className="space-y-2 mb-3">
                {images.map((url, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                    <img src={url} alt="" className="w-8 h-8 object-cover rounded-lg flex-shrink-0" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    <span className="text-xs text-gray-600 flex-1 truncate">{url}</span>
                    <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newImage}
                  onChange={e => setNewImage(e.target.value)}
                  placeholder="Paste image URL..."
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addImage(); } }}
                />
                <button type="button" onClick={addImage} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl text-sm">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-100">
              <Input label="Agent Name" name="agent_name" />
              <Input label="Agent Phone" name="agent_phone" />
              <Input label="Agent Email" name="agent_email" />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.available ?? true} onChange={e => set('available', e.target.checked)} className="w-4 h-4 accent-[#c9a84c]" />
                <span className="text-sm text-gray-700">Available / Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured ?? false} onChange={e => set('featured', e.target.checked)} className="w-4 h-4 accent-[#c9a84c]" />
                <span className="text-sm text-gray-700">Featured on Homepage</span>
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={loading} className="flex-1 bg-[#c9a84c] hover:bg-[#b8963e] disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2">
                {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (property ? 'Save Changes' : 'Add Property')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
