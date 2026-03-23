import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, List, Home } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";
import { useProperties, PropertyFilters } from "../hooks/useProperties";
import { useSEO } from "../hooks/useSEO";

type RentType = "room_rent" | "land_rent" | "commercial_rent";
type RentFilter = "all" | RentType;

const RENT_FILTER_TYPES: Array<{ value: "" | RentType; label: string }> = [
  { value: "", label: "All Rent" },
  { value: "room_rent", label: "Room Rent" },
  { value: "land_rent", label: "Land Rent" },
  { value: "commercial_rent", label: "Commercial Rent" },
];

export default function Rent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");

  const [activeType, setActiveType] = useState<RentFilter>(
    (searchParams.get("type") as RentFilter) || "all",
  );

  const [filters, setFilters] = useState<PropertyFilters>({
    search: searchParams.get("search") || "",
    city: searchParams.get("city") || "",
  });

  const { properties: allProperties, loading, error } = useProperties(filters);

  /* 🔑 Filter only rent properties */
  const properties = allProperties.filter((p) => {
    if (activeType === "all") {
      return ["room_rent", "land_rent", "commercial_rent"].includes(p.type);
    }
    return p.type === activeType;
  });

  useSEO({
    title: "Properties for Rent",
    description:
      "Browse rooms, land, and commercial properties for rent across India.",
    keywords:
      "room for rent India, land rent, commercial rent, rental properties",
  });

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.city) params.set("city", filters.city);

    if (activeType !== "all") {
      params.set("type", activeType);
    }

    setSearchParams(params, { replace: true });
  }, [filters, activeType]);

  const getTitle = () => {
    switch (activeType) {
      case "room_rent":
        return "Rooms for Rent";
      case "land_rent":
        return "Land for Rent";
      case "commercial_rent":
        return "Commercial for Rent";
      default:
        return "Properties for Rent";
    }
  };

  return (
    <main
      className="min-h-screen pt-24 pb-16"
      style={{
        background: "linear-gradient(135deg, #f0f7f0 0%, #f4f9f4 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0a2240] mb-2">
            {getTitle()}
          </h1>

          <p className="text-gray-500">
            {loading
              ? "Loading..."
              : `${properties.length} propert${
                  properties.length === 1 ? "y" : "ies"
                } found`}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <SearchFilters
            filters={{
              ...filters,
              type: activeType === "all" ? "" : activeType,
            }}
            propertyTypes={RENT_FILTER_TYPES}
            onChange={(updated) => {
              setFilters(updated);

              if (updated.type) {
                setActiveType(updated.type as RentType);
              } else {
                setActiveType("all");
              }
            }}
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">View:</span>

            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg ${
                view === "grid"
                  ? "bg-[#0a2240] text-white"
                  : "bg-white text-gray-500 border border-gray-200"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg ${
                view === "list"
                  ? "bg-[#0a2240] text-white"
                  : "bg-white text-gray-500 border border-gray-200"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div
            className={`grid gap-6 ${
              view === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-2xl aspect-[4/5] animate-pulse"
              />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#0a2240] mb-2">
              No Rental Listings Found
            </h3>
            <p className="text-gray-500">Try adjusting your search filters.</p>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              view === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 max-w-3xl"
            }`}
          >
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
