import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, Award, Leaf } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import PropertyTypesSection from '../components/PropertyTypesSection';
import CitiesSection from '../components/CitiesSection';
import PropertyCard from '../components/PropertyCard';
import SellPropertyModal from '../components/SellPropertyModal';
import { useFeaturedProperties } from '../hooks/useProperties';
import { useSEO } from '../hooks/useSEO';

const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    location: 'Goa',
    rating: 5,
    text: 'Found my dream beachfront plot through WesternProperties. The team was professional and the entire process was seamless. The legal documentation was clean and the handover was smooth. Highly recommend!',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Rented a beautiful commercial space for my boutique in Mapusa through WesternProperties. Great location scouting, fair pricing, and excellent support throughout. Will definitely use them again.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Anil Desai',
    location: 'Pune',
    rating: 5,
    text: 'The best real estate experience I have had. Transparent dealings, no hidden charges, and genuinely premium properties at competitive prices. Their knowledge of Goa\'s coastal belt is unmatched.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

const WHY_US = [
  {
    Icon: Shield,
    title: 'Verified Listings',
    desc: 'Every property is thoroughly verified for legal compliance, title clarity, and NA approvals before listing.',
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    Icon: Clock,
    title: '24/7 Support',
    desc: 'Our dedicated team is available around the clock to answer your queries and guide you through every step.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    Icon: Award,
    title: 'Best Price Guarantee',
    desc: 'We ensure the most competitive pricing with complete transparency, zero hidden costs, and honest valuations.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    Icon: Leaf,
    title: 'Coastal Specialists',
    desc: 'Over 15 years of expertise in Goa\'s coastal and inland real estate markets — from beaches to Western Ghats.',
    color: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
];

export default function Home() {
  const { properties, loading } = useFeaturedProperties();
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useSEO({
    title: 'Buy, Rent & Lease Land, Rooms & Commercial Properties in Goa',
    description:
      'WesternProperties — Goa\'s trusted real estate platform. Verified land for sale, beachfront plots, rooms for rent, commercial spaces, and lease properties across Calangute, Panaji, Margao & more.',
    keywords: 'land for sale Goa, rooms for rent Goa, commercial property Goa, lease property India, beachfront land, WesternProperties',
  });

  return (
    <main>
      <HeroSection />
      <PropertyTypesSection />
      <CitiesSection />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#c9a84c] font-semibold text-sm uppercase tracking-wider">Top Picks</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2240] mt-2">Best Properties for Investment</h2>
              <p className="text-gray-500 text-sm mt-2">Hand-picked listings from our most sought-after locations</p>
            </div>
            <Link
              to="/properties"
              className="hidden sm:flex items-center gap-2 text-[#0a2240] hover:text-[#c9a84c] font-semibold text-sm transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-2xl aspect-[4/5] animate-pulse" />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Leaf className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium mb-1">No featured properties yet</p>
              <p className="text-sm">Check back soon for new listings</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}

          <div className="text-center mt-10 sm:hidden">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 bg-[#0a2240] hover:bg-[#0d2f57] text-white px-8 py-3.5 rounded-xl font-semibold transition-all"
            >
              View All Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(135deg, #f0f7f0 0%, #e8f5e9 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2240] mt-2 mb-3">The WesternProperties Advantage</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Trusted by over 850 happy clients across Goa and India since 2009.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map(({ Icon, title, desc, color, iconColor }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 border border-white">
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className="font-bold text-[#0a2240] mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#c9a84c] font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2240] mt-2">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-gradient-to-br from-[#f0f7f0] to-[#e8f5e9] rounded-2xl p-6 border border-emerald-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#c9a84c] text-[#c9a84c]" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-200"
                  />
                  <div>
                    <p className="font-semibold text-[#0a2240] text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative py-28 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#071829]/90 via-[#0a2240]/88 to-[#0d3320]/85" />
        <div className="absolute inset-0 bg-[#0a2240]/30" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#e8c96a] text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
            List Your Property With Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight drop-shadow-lg">
            Want to Sell Your<br />
            <span className="text-[#c9a84c]" style={{ textShadow: '0 2px 20px rgba(201,168,76,0.5)' }}>Property?</span>
          </h2>
          <p className="text-white/85 text-lg mb-10 max-w-xl mx-auto leading-relaxed drop-shadow">
            List your property with WesternProperties and reach thousands of genuine buyers. Fast, transparent, and hassle-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setEnquiryOpen(true)}
              className="bg-[#c9a84c] hover:bg-[#d4b355] text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:shadow-2xl hover:scale-[1.02] shadow-lg"
            >
              Sell Your Properties
            </button>
            <Link
              to="/properties"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/70 text-white hover:bg-white hover:text-[#0a2240] px-8 py-4 rounded-xl font-semibold text-base transition-all hover:shadow-xl"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>

      {enquiryOpen && (
        <SellPropertyModal onClose={() => setEnquiryOpen(false)} />
      )}
    </main>
  );
}
