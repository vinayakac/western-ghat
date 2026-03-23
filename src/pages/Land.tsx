import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, List, Leaf } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";
import { useProperties, PropertyFilters } from "../hooks/useProperties";
import { useSEO } from "../hooks/useSEO";

export default function Land() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");

  const [filters, setFilters] = useState<PropertyFilters>({
    search: searchParams.get("search") || "",
    type: "land_sale",
    city: searchParams.get("city") || "",
  });

  const { properties, loading, error } = useProperties({
    ...filters,
    type: "land_sale",
  });

  useSEO({
    title: "Land for Sale",
    description:
      "Browse land for sale across India. Find agricultural land, plots, and open land listings.",
    keywords: "land for sale India, buy land, agricultural land, plots",
  });

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.city) params.set("city", filters.city);

    params.set("type", "land_sale");

    setSearchParams(params, { replace: true });
  }, [filters]);

  return (
    <main
      className="min-h-screen pt-24 pb-16"
      style={{
        background: "linear-gradient(135deg, #f0f7f0 0%, #f4f9f4 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0a2240] mb-2">
            Land for Sale
          </h1>

          <p className="text-gray-500">
            {loading
              ? "Loading..."
              : `${properties.length} propert${
                  properties.length === 1 ? "y" : "ies"
                } found`}
          </p>
        </div>

        {/* SEARCH FILTERS */}
        <div className="mb-6">
          <SearchFilters
            filters={{ ...filters, type: "land_sale" }}
            hideType={true}
            onChange={(updated) =>
              setFilters({ ...updated, type: "land_sale" })
            }
          />
        </div>

        {/* VIEW TOGGLE */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">View:</span>

            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition-colors ${
                view === "grid"
                  ? "bg-[#0a2240] text-white"
                  : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition-colors ${
                view === "list"
                  ? "bg-[#0a2240] text-white"
                  : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
            {error}
          </div>
        )}

        {/* LOADING */}
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
            <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#0a2240] mb-2">
              No Land Listings Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search filters to find more land properties.
            </p>
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
