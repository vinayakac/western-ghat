import { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  propertyId: string;
  propertyTitle: string;
  onClose: () => void;
}

export default function EnquiryModal({ propertyId, propertyTitle, onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: err } = await supabase.from('enquiries').insert({
      property_id: propertyId,
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message || `Interested in: ${propertyTitle}`,
    });

    if (err) {
      setError('Failed to send enquiry. Please try again.');
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-[#0a2240] mb-2">Enquiry Sent!</h3>
            <p className="text-gray-500 mb-6">
              Thank you! Our agent will contact you within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="bg-[#0a2240] hover:bg-[#0d2f57] text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-[#0a2240] mb-1">Send Enquiry</h3>
            <p className="text-gray-500 text-sm mb-6 line-clamp-1">About: {propertyTitle}</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us more about what you're looking for..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c9a84c] hover:bg-[#b8963e] disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Enquiry
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
