import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { NearbyPlace, NEARBY_CATEGORY_ICONS, NEARBY_CATEGORY_LABELS } from '../types/property';

interface Props {
  places: NearbyPlace[];
}

const CATEGORY_ORDER = [
  'school', 'college', 'hospital', 'beach', 'bus_stop',
  'train_station', 'airport', 'shopping_mall', 'restaurant', 'park', 'temple', 'bank'
];

const PREVIEW_COUNT = 2;

function CategoryCard({ category, places }: { category: string; places: NearbyPlace[] }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = places.length > PREVIEW_COUNT;
  const visible = expanded ? places : places.slice(0, PREVIEW_COUNT);

  return (
    <div className="bg-gray-50 hover:bg-amber-50/50 rounded-xl p-4 transition-colors border border-transparent hover:border-amber-100">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{NEARBY_CATEGORY_ICONS[category as keyof typeof NEARBY_CATEGORY_ICONS]}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#0a2240] text-sm">
            {NEARBY_CATEGORY_LABELS[category as keyof typeof NEARBY_CATEGORY_LABELS]}
          </h3>
          {places.length > 1 && (
            <span className="text-[10px] text-gray-400">{places.length} nearby</span>
          )}
        </div>
      </div>
      <ul className="space-y-2">
        {visible.map((place) => (
          <li key={place.id} className="flex items-center justify-between text-sm gap-2">
            <span className="text-gray-700 truncate">{place.name}</span>
            <span className="text-[#c9a84c] font-medium text-xs bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full flex-shrink-0">
              {place.distance}
            </span>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#0a2240] hover:text-[#c9a84c] transition-colors w-full"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              Show all {places.length}
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default function NearbyPlaces({ places }: Props) {
  if (places.length === 0) return null;

  const grouped = places.reduce((acc, place) => {
    if (!acc[place.category]) acc[place.category] = [];
    acc[place.category].push(place);
    return acc;
  }, {} as Record<string, NearbyPlace[]>);

  const categories = CATEGORY_ORDER.filter((c) => grouped[c]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0a2240]">Nearby Places</h2>
        <span className="text-sm text-gray-400">{places.length} landmark{places.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((category) => (
          <CategoryCard key={category} category={category} places={grouped[category]} />
        ))}
      </div>
    </div>
  );
}
