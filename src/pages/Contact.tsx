import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useSEO } from "../hooks/useSEO";
import { useSiteSettings } from "../hooks/useSiteSettings";

export default function Contact() {
  const { settings } = useSiteSettings();
  const [form, setForm] = useState({
    name: "",
    email: "",
    // Keep phone locked to +91 prefix for Indian numbers.
    phone: "+91",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const formatPhoneWith91Prefix = (value: string) => {
    // Keep digits only.
    const digits = value.replace(/\D/g, "");
    // If user pasted/typed with country code, strip leading '91' from the digits.
    const rest = digits.startsWith("91") ? digits.slice(2) : digits;
    // Indian local numbers are 10 digits (excluding +91).
    const cappedRest = rest.slice(0, 10);
    // Keep state as "+91" followed by digits (no space) to match pattern.
    return cappedRest.length ? `+91${cappedRest}` : "+91";
  };

  useSEO({
    title: "Contact Us",
    description:
      "Get in touch with WesternProperties. We're here to help you find the perfect property. Call, email, or WhatsApp us today.",
    keywords:
      "contact western properties, real estate enquiry, property consultation India",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Ensure we store as "+91" + 10 local digits.
    const normalizedPhone = form.phone.replace(/\s+/g, "");
    const { error: err } = await supabase.from("enquiries").insert({
      property_id: null,
      name: form.name,
      email: form.email,
      phone: normalizedPhone,
      message: form.message,
    });

    if (err) setError("Failed to send message. Please try again.");
    else setSuccess(true);
    setLoading(false);
  };

  const INFO = [
    { Icon: MapPin, label: "Address", value: settings.address },
    {
      Icon: Phone,
      label: "Phone",
      value: settings.phone,
      href: `tel:${settings.phone_raw}`,
    },
    {
      Icon: Mail,
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    { Icon: Clock, label: "Business Hours", value: settings.business_hours },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#c9a84c] font-semibold text-sm uppercase tracking-wider">
            We'd Love to Hear from You
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0a2240] mt-2 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Have a question about a property or need expert guidance? Our team
            is ready to help you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            {INFO.map(({ Icon, label, value, href }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-5 shadow-sm flex items-start gap-4"
              >
                <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2240] text-sm mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-gray-600 text-sm hover:text-[#c9a84c] transition-colors whitespace-pre-line"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-gray-600 text-sm whitespace-pre-line">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <a
              href={`https://wa.me/${settings.phone_raw}?text=${encodeURIComponent(settings.whatsapp_text)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25d366] hover:bg-[#1ebe5c] text-white p-4 rounded-2xl font-semibold transition-all hover:shadow-lg"
            >
              <svg
                className="w-5 h-5 fill-white flex-shrink-0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
            {success ? (
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0a2240] mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-500 mb-6">
                  Thank you for reaching out. Our team will get back to you
                  within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setForm({ name: "", email: "", phone: "+91", message: "" });
                  }}
                  className="bg-[#0a2240] hover:bg-[#0d2f57] text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-[#0a2240] mb-6">
                  Send Us a Message
                </h2>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Your full name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            phone: formatPhoneWith91Prefix(e.target.value),
                          })
                        }
                        placeholder="+91 9876543210"
                        inputMode="numeric"
                        pattern="^\\+91\\d{10}$"
                        title="Enter a valid +91 phone number (10 digits)"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Tell us what you're looking for..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#c9a84c] hover:bg-[#b8963e] disabled:opacity-60 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
