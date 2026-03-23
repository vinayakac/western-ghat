import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PropertyFilters } from "../hooks/useProperties";
import { PropertyType } from "../types/property";

interface Props {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  propertyTypes?: { value: PropertyType | ""; label: string }[];
  hideType?: boolean;
}

const DEFAULT_PROPERTY_TYPES: { value: PropertyType | ""; label: string }[] = [
  { value: "", label: "All Types" },
  { value: "land_sale", label: "Land for Sale" },
  { value: "room_rent", label: "Room for Rent" },
  { value: "land_rent", label: "Land for Rent" },
  { value: "commercial_rent", label: "Commercial Rent" },
  { value: "lease", label: "Lease" },
];

export default function SearchFilters({
  filters,
  onChange,
  propertyTypes = DEFAULT_PROPERTY_TYPES,
  hideType = false,
}: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters = !!(
    filters.city ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.search
  );

  const clearAll = () =>
    onChange({
      search: "",
      type: "",
      city: "",
      minPrice: undefined,
      maxPrice: undefined,
    });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* SEARCH */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search properties..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent"
          />
        </div>

        {/* PROPERTY TYPE DROPDOWN */}
        {!hideType && (
          <select
            value={filters.type || ""}
            onChange={(e) =>
              onChange({
                ...filters,
                type: e.target.value as PropertyType | "",
              })
            }
            className="sm:w-48 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] cursor-pointer"
          >
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        )}

        {/* FILTER BUTTON */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors border ${
            showAdvanced
              ? "bg-[#0a2240] text-white border-[#0a2240]"
              : "border-gray-200 text-gray-600 hover:border-[#c9a84c] hover:text-[#c9a84c]"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>

        {/* CLEAR BUTTON */}
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* ADVANCED FILTERS */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              City
            </label>
            <input
              type="text"
              value={filters.city || ""}
              onChange={(e) => onChange({ ...filters, city: e.target.value })}
              placeholder="Enter city name"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Min Price (₹)
            </label>
            <input
              type="number"
              value={filters.minPrice || ""}
              onChange={(e) =>
                onChange({
                  ...filters,
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="0"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Max Price (₹)
            </label>
            <input
              type="number"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                onChange({
                  ...filters,
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="Any"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
