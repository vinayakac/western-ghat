import { Link, useLocation } from 'react-router-dom';
import { MapPin, Ruler, Bed, Bath, Heart } from 'lucide-react';
import { Property } from '../types/property';
import { formatPrice, getPropertyTypeLabel, getPropertyTypeBadgeColor, getCoverImage } from '../utils/format';

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  const location = useLocation();

  const rawFrom = `${location.pathname}${location.search}`;
  // If user clicked from the homepage, treat it as "Properties" flow.
  const from = location.pathname === '/' ? '/properties' : rawFrom;
  const breadcrumbParent =
    location.pathname === '/rent'
      ? 'Rent'
      : location.pathname === '/land'
        ? 'Land for Sale'
        : location.pathname === '/'
          ? 'Top Picks'
          : 'Properties';

  const image = getCoverImage(property);

  return (
    <Link
      to={`/properties/${property.id}`}
      state={{ from, breadcrumbParent }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getPropertyTypeBadgeColor(property.type)}`}>
          {getPropertyTypeLabel(property.type)}
        </span>
        {property.featured && (
          <span className="absolute top-3 right-3 bg-[#c9a84c] text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        )}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow transition-all hover:scale-110"
          aria-label="Save property"
        >
          <Heart className="w-4 h-4 text-gray-500 hover:text-red-500" />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-[#0a2240] text-base leading-snug group-hover:text-[#c9a84c] transition-colors line-clamp-2">
            {property.title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#c9a84c]" />
          <span className="truncate">{property.address}, {property.city}</span>
        </div>

        {property.description && (
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
            {property.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-gray-500 text-xs mb-4">
          {property.area && (
            <span className="flex items-center gap-1">
              <Ruler className="w-3.5 h-3.5" />
              {property.area.toLocaleString()} {property.area_unit}
            </span>
          )}
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {property.bathrooms} Baths
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-[#c9a84c] font-bold text-lg leading-none">
              {formatPrice(property.price, property.price_period)}
            </p>
            {property.price_period && property.price_period !== 'total' && (
              <p className="text-gray-400 text-xs mt-0.5">Starting price</p>
            )}
          </div>
          <span className="text-[#0a2240] text-sm font-semibold group-hover:text-[#c9a84c] transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
