"use client";

import { useEffect, useState } from "react";

import SearchFilters from "../../components/SearchFilters";
import PropertyGrid from "../../components/PropertyGrid";
import MobileBottomNav from "../../components/MobileBottomNav";
import Footer from "../../components/Footer";
import { getHomePageProperties } from "../actions";

export default function PropertiesPage() {
  const [filteredLocation, setFilteredLocation] = useState("All Areas");
  const [filteredType, setFilteredType] = useState("All Types");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [properties, setProperties] = useState([]);
  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };
  useEffect(() => {
    async function fetchData() {
      const data = await getHomePageProperties();

      setProperties(data);
    }
    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-0 flex flex-col">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-8">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            Browse All Properties
          </h1>
          <p className="text-sm md:text-lg text-purple-100">
            Find your perfect rental home in Khulna
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
          <PropertyGrid
            properties={properties}
            filteredLocation={filteredLocation}
            filteredType={filteredType}
            priceRange={priceRange}
          />
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
