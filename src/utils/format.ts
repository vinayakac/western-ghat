import { PropertyType, PricePeriod, PROPERTY_TYPE_LABELS } from '../types/property';

export function formatPrice(price: number, period?: PricePeriod | null): string {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

  if (!period || period === 'total') return formatted;
  if (period === 'monthly') return `${formatted}/mo`;
  if (period === 'yearly') return `${formatted}/yr`;
  if (period === 'per_sqft') return `${formatted}/sqft`;
  return formatted;
}

export function getPropertyTypeLabel(type: PropertyType): string {
  return PROPERTY_TYPE_LABELS[type] || type;
}

export function getPropertyTypeBadgeColor(type: PropertyType): string {
  const colors: Record<PropertyType, string> = {
    land_sale: 'bg-amber-100 text-amber-800',
    room_rent: 'bg-blue-100 text-blue-800',
    land_rent: 'bg-green-100 text-green-800',
    commercial_rent: 'bg-orange-100 text-orange-800',
    lease: 'bg-teal-100 text-teal-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + '...';
}

export function getCoverImage(property: {
  cover_image?: string | null;
  property_images?: { url: string; sort_order: number }[];
}): string {
  if (property.cover_image) return property.cover_image;
  if (property.property_images && property.property_images.length > 0) {
    const sorted = [...property.property_images].sort((a, b) => a.sort_order - b.sort_order);
    return sorted[0].url;
  }
  return 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800';
}
