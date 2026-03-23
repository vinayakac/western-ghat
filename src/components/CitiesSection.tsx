import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CityData {
  city: string;
  state: string;
  count: number;
  image: string;
}

const CITY_IMAGES: Record<string, string> = {
  Calangute: 'https://images.pexels.com/photos/1533720/pexels-photo-1533720.jpeg?auto=compress&cs=tinysrgb&w=600',
  Panaji: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=600',
  Mapusa: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600',
  Ponda: 'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=600',
  Assagao: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Vasco da Gama': 'https://images.pexels.com/photos/290597/pexels-photo-290597.jpeg?auto=compress&cs=tinysrgb&w=600',
  Margao: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600',
  Porvorim: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600',
  default: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=600',
};

export default function CitiesSection() {
  const navigate = useNavigate();
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('properties')
      .select('city, state')
      .eq('available', true)
      .then(({ data }) => {
        if (!data) { setLoading(false); return; }
        const counts: Record<string, { state: string; count: number }> = {};
        data.forEach(({ city, state }) => {
          if (!counts[city]) counts[city] = { state, count: 0 };
          counts[city].count++;
        });
        const list: CityData[] = Object.entries(counts)
          .map(([city, { state, count }]) => ({
            city,
            state,
            count,
            image: CITY_IMAGES[city] || CITY_IMAGES.default,
          }))
          .sort((a, b) => b.count - a.count);
        setCities(list);
        setLoading(false);
      });
  }, []);

  if (!loading && cities.length === 0) return null;

  return (
    <section className="py-20 bg-[#071829]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[#c9a84c] font-semibold text-sm uppercase tracking-wider">Explore by Location</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Properties in Cities</h2>
            <p className="text-white/50 mt-2 max-w-lg text-sm">
              Discover verified properties across India's most sought-after coastal and inland cities.
            </p>
          </div>
          <button
            onClick={() => navigate('/properties')}
            className="hidden sm:flex items-center gap-2 text-[#c9a84c] hover:text-white font-semibold text-sm transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white/5 rounded-2xl aspect-[3/2] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map((c) => (
              <button
                key={c.city}
                onClick={() => navigate(`/properties?city=${encodeURIComponent(c.city)}`)}
                className="group relative rounded-2xl overflow-hidden aspect-[3/2] cursor-pointer"
              >
                <img
                  src={c.image}
                  alt={c.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071829]/90 via-[#071829]/40 to-transparent group-hover:from-[#071829]/95 transition-all duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#c9a84c] flex-shrink-0" />
                    <h3 className="text-white font-bold text-base leading-tight">{c.city}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs">{c.state}</span>
                    <span className="bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {c.count} {c.count === 1 ? 'property' : 'properties'}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-white/0 group-hover:text-white/80 transition-all text-xs font-medium">
                    <span>Browse properties</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#c9a84c]/40 rounded-2xl transition-all duration-300" />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
