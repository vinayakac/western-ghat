import { useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import {
  MapPin, Ruler, Bed, Bath, Mail,
  ChevronRight, Calendar, CheckCircle, ArrowLeft, Phone, Building2
} from 'lucide-react';
import { SITE_CONFIG } from '../lib/config';
import PropertyGallery from '../components/PropertyGallery';
import NearbyPlaces from '../components/NearbyPlaces';
import EnquiryModal from '../components/EnquiryModal';
import SocialShare from '../components/SocialShare';
import { useProperty } from '../hooks/useProperties';
import { useSEO } from '../hooks/useSEO';
import { formatPrice, getPropertyTypeLabel, getPropertyTypeBadgeColor, getCoverImage } from '../utils/format';

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state || {}) as {
    from?: string;
    breadcrumbParent?: 'Properties' | 'Rent' | 'Land for Sale' | string;
  };
  const { property, loading, error } = useProperty(id || '');
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useSEO({
    title: property?.title,
    description: property?.description || undefined,
    ogImage: property ? getCoverImage(property) : undefined,
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-24" style={{ background: 'linear-gradient(135deg, #f0f7f0 0%, #f4f9f4 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-6 py-8">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-[520px] bg-gray-200 rounded-2xl" />
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              <div className="h-48 bg-gray-200 rounded-2xl" />
              <div className="h-40 bg-gray-200 rounded-2xl" />
            </div>
            <div className="h-80 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f0f7f0 0%, #f4f9f4 100%)' }}>
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0a2240] mb-2">Property Not Found</h2>
          <p className="text-gray-500 mb-6">This property may no longer be available.</p>
          <button
            onClick={() => navigate('/properties')}
            className="bg-[#0a2240] hover:bg-[#0d2f57] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  const images = property.property_images || [];
  const nearby = property.property_nearby_places || [];
  const listPath = typeof locationState.from === 'string' && locationState.from.length > 0
    ? locationState.from
    : '/properties';

  const fallbackBreadcrumbParent =
    property.type === 'land_sale'
      ? 'Land for Sale'
      : (property.type === 'room_rent' ||
          property.type === 'land_rent' ||
          property.type === 'commercial_rent')
        ? 'Rent'
        : 'Properties';

  const breadcrumbParentLabel = locationState.breadcrumbParent || fallbackBreadcrumbParent;

  const whatsappNumber = property.whatsapp_number?.replace(/\D/g, '') || SITE_CONFIG.phoneRaw;
  const whatsappMsg = `Hi! I am interested in your property: ${property.title}. Please share more details.`;
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;


  return (
    <main className="min-h-screen pt-20 pb-16" style={{ background: 'linear-gradient(135deg, #f0f7f0 0%, #f4f9f4 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 py-4 mb-2">
          <Link to="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={listPath} className="hover:text-[#c9a84c] transition-colors">{breadcrumbParentLabel}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-700 truncate max-w-[200px]">{property.title}</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPropertyTypeBadgeColor(property.type)}`}>
                {getPropertyTypeLabel(property.type)}
              </span>
              {property.featured && (
                <span className="bg-[#c9a84c] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a2240] leading-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-2">
              <MapPin className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
              <span>{property.address}, {property.city}, {property.state}</span>
            </div>
          </div>
          <div className="sm:text-right flex-shrink-0">
            <p className="text-3xl font-bold text-[#c9a84c]">
              {formatPrice(property.price, property.price_period)}
            </p>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1 sm:justify-end">
              <Calendar className="w-3.5 h-3.5" />
              Listed {new Date(property.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>

        <div className="mb-8">
          {(images.length > 0 || property.video_url) ? (
            <PropertyGallery
              images={images}
              title={property.title}
              videoUrl={property.video_url}
            />
          ) : property.cover_image ? (
            <div className="rounded-2xl overflow-hidden h-96">
              <img src={property.cover_image} alt={property.title} className="w-full h-full object-cover" />
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 pb-6 border-b border-gray-100">
                {property.area && (
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Ruler className="w-5 h-5 text-[#c9a84c] mx-auto mb-1" />
                    <p className="font-bold text-[#0a2240] text-sm">{property.area.toLocaleString()} {property.area_unit}</p>
                    <p className="text-gray-400 text-xs">Total Area</p>
                  </div>
                )}
                {property.bedrooms != null && (
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Bed className="w-5 h-5 text-[#c9a84c] mx-auto mb-1" />
                    <p className="font-bold text-[#0a2240] text-sm">{property.bedrooms}</p>
                    <p className="text-gray-400 text-xs">Bedrooms</p>
                  </div>
                )}
                {property.bathrooms != null && (
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Bath className="w-5 h-5 text-[#c9a84c] mx-auto mb-1" />
                    <p className="font-bold text-[#0a2240] text-sm">{property.bathrooms}</p>
                    <p className="text-gray-400 text-xs">Bathrooms</p>
                  </div>
                )}
                {property.city && (
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-[#c9a84c] mx-auto mb-1" />
                    <p className="font-bold text-[#0a2240] text-sm">{property.city}</p>
                    <p className="text-gray-400 text-xs">City</p>
                  </div>
                )}
              </div>

              <h2 className="text-xl font-bold text-[#0a2240] mb-3">About This Property</h2>
              {property.description && (
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
              )}

              {property.amenities && property.amenities.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-[#0a2240] mb-4">Amenities & Features</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {nearby.length > 0 && <NearbyPlaces places={nearby} />}

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#0a2240] mb-1">Share This Property</h2>
                  <p className="text-gray-500 text-sm">Know someone who might be interested?</p>
                </div>
                <SocialShare
                  title={property.title}
                  description={property.description || ''}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <div className="mb-5 pb-5 border-b border-gray-100">
                <p className="text-3xl font-bold text-[#c9a84c] mb-1">
                  {formatPrice(property.price, property.price_period)}
                </p>
                <p className="text-gray-400 text-sm">Enquire for the best deal</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="w-full bg-[#c9a84c] hover:bg-[#b8963e] text-white py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Send Enquiry
                </button>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25d366] hover:bg-[#1ebe5c] text-white py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="w-full border-2 border-[#0a2240] text-[#0a2240] hover:bg-[#0a2240] hover:text-white py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>

            </div>

            <Link
              to={listPath}
              className="flex items-center gap-2 text-[#0a2240] hover:text-[#c9a84c] text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Listings
            </Link>
          </div>
        </div>
      </div>

      {enquiryOpen && (
        <EnquiryModal
          propertyId={property.id}
          propertyTitle={property.title}
          onClose={() => setEnquiryOpen(false)}
        />
      )}
    </main>
  );
}
