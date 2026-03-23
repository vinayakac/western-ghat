import { useNavigate } from 'react-router-dom';
import { TreePine, Home, Building2, FileText } from 'lucide-react';

const TYPES = [
  {
    value: 'land_sale',
    label: 'Land for Sale',
    description: 'Prime plots and agricultural land for permanent ownership',
    Icon: TreePine,
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    count: '320+ listings',
    image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    value: 'room_rent',
    label: 'Room for Rent',
    description: 'Furnished and unfurnished rooms for short or long-term stay',
    Icon: Home,
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    count: '180+ listings',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    value: 'land_rent',
    label: 'Land for Rent',
    description: 'Flexible land rental for farming, storage or temporary use',
    Icon: TreePine,
    bg: 'bg-green-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
    count: '95+ listings',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    value: 'commercial_rent',
    label: 'Commercial Rent',
    description: 'Shops, offices and commercial spaces for your business',
    Icon: Building2,
    bg: 'bg-orange-50',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-700',
    count: '140+ listings',
    image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    value: 'lease',
    label: 'Lease Properties',
    description: 'Long-term lease agreements for residential and commercial use',
    Icon: FileText,
    bg: 'bg-teal-50',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
    count: '75+ listings',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function PropertyTypesSection() {
  const navigate = useNavigate();

  const getPathForType = (type: string) => {
    if (type === 'land_sale') return '/land';
    if (type === 'room_rent' || type === 'land_rent' || type === 'commercial_rent') {
      return `/rent?type=${type}`;
    }
    // Lease stays in the general properties listing.
    return `/properties?type=${type}`;
  };

  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, #f0f7f0 0%, #f4f9f4 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#c9a84c] font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2240] mt-2 mb-4">Explore Property Categories</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Whether you're looking to buy, rent, or lease — we have the right property for every need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {TYPES.map(({ value, label, description, Icon, iconBg, iconColor, count, image }) => (
            <button
              key={value}
              onClick={() => navigate(getPathForType(value))}
              className="group text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={image}
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className={`absolute bottom-3 left-3 w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#0a2240] text-sm mb-1 group-hover:text-[#c9a84c] transition-colors">{label}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-2">{description}</p>
                <span className="text-[#c9a84c] text-xs font-semibold">{count}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
