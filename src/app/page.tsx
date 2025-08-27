"use client";

import { useState, useCallback, useEffect } from "react";

import SearchFilters from "../components/SearchFilters";
import MobileBottomNav from "../components/MobileBottomNav";
import dynamic from "next/dynamic";
import Loading from "./loading";
import { getHomePageProperties } from "./actions";

const PropertyGrid = dynamic(() => import("../components/PropertyGrid"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Home() {
  const [filteredLocation, setFilteredLocation] = useState("All Areas");
  const [filteredType, setFilteredType] = useState("All Types");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [properties, setProperties] = useState([]);

  const handlePriceRangeChange = useCallback((min: number, max: number) => {
    setPriceRange({ min, max });
  }, []);
  useEffect(() => {
    async function fetchData() {
      const data = await getHomePageProperties();
      setProperties(data);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-0 flex flex-col">
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-8">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 leading-tight">
            Find Your Perfect
            <span className="block text-yellow-300">Rental Home</span>
          </h1>
          <p className="text-sm md:text-lg text-purple-100 mb-4">
            Premium properties in Khulna
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <SearchFilters
          onLocationChange={setFilteredLocation}
          onTypeChange={setFilteredType}
          onPriceRangeChange={handlePriceRangeChange}
        />
      </div>

      <section className="py-8 md:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
              Featured Properties in Khulna
            </h2>
            <p className="text-sm md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the best rental properties carefully selected for your
              comfort and lifestyle needs.
            </p>
          </div>

          <PropertyGrid
            properties={properties}
            filteredLocation={filteredLocation}
            filteredType={filteredType}
            priceRange={priceRange}
          />
        </div>
      </section>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
