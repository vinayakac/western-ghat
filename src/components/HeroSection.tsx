import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const PROPERTY_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'land_sale', label: 'Land for Sale' },
  { value: 'room_rent', label: 'Room for Rent' },
  { value: 'land_rent', label: 'Land for Rent' },
  { value: 'commercial_rent', label: 'Commercial Rent' },
  { value: 'lease', label: 'Lease' },
];


const SLIDES = [
  {
    image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1920',
    label: 'Open Land with Greenery',
    subtitle: 'Vast open plots surrounded by lush greenery — ideal for your dream home or investment',
  },
  {
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920',
    label: 'Coastal Resort Properties',
    subtitle: 'Beachfront and coastal land near stunning resorts — premium locations for high returns',
  },
  {
    image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1920',
    label: 'Large Premium Properties',
    subtitle: 'Expansive estates and large plots with unmatched privacy and natural surroundings',
  },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (type) params.set('type', type);
    navigate(`/properties?${params.toString()}`);
  };

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-[#071829]/75 via-[#0a2240]/60 to-[#071829]/85" />

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9a84c' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='4' cy='4' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((slide, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-8 h-2 bg-[#c9a84c]' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={slide.label}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 hover:bg-[#c9a84c]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/20 hover:border-[#c9a84c]"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 hover:bg-[#c9a84c]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/20 hover:border-[#c9a84c]"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="inline-flex items-center gap-2 bg-[#c9a84c]/15 border border-[#c9a84c]/40 text-[#c9a84c] rounded-full px-5 py-2 text-sm font-semibold mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 bg-[#c9a84c] rounded-full animate-pulse" />
          {SLIDES[current].label}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 tracking-tight">
          Find Your Perfect
          <span className="block mt-1" style={{ color: '#c9a84c', textShadow: '0 0 60px rgba(201,168,76,0.4)' }}>
            Dream Property
          </span>
        </h1>

        <p className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {SLIDES[current].subtitle}
        </p>

        <form
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl max-w-3xl mx-auto flex flex-col sm:flex-row gap-2 border border-white/20"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by city, location, or keyword..."
              className="w-full pl-12 pr-4 py-3.5 text-gray-800 focus:outline-none text-sm bg-transparent"
            />
          </div>
          <div className="relative sm:w-48">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full appearance-none bg-gray-50 rounded-xl pl-4 pr-8 py-3.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c9a84c] cursor-pointer"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <button
            type="submit"
            className="bg-[#c9a84c] hover:bg-[#b8963e] text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg whitespace-nowrap"
          >
            Search
          </button>
        </form>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce z-10">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}
