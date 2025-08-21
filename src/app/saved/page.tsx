"use client";

import { useState, useEffect } from "react";
import PropertyCard from "../../components/PropertyCard";
import MobileBottomNav from "../../components/MobileBottomNav";
import { getSavePageProperties } from "./action";

export type IProperties = {
  _id: string;
  title: string;
  ownerId: string;
  location: string;
  type: string;
  rent: string;
  rooms: string;
  bathrooms: string;
  area: string;
  description: string;
  features: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export default function SavedProperties() {
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [savedPropertiesData, setSavedPropertiesData] = useState<IProperties[]>(
    []
  );

  useEffect(() => {
    const saved = localStorage.getItem("savedProperties");
    if (saved) {
      const savedIds = JSON.parse(saved);

      setSavedProperties(savedIds);
    }
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = (await getSavePageProperties({
          ids: savedProperties,
        })) as { success: boolean; data: IProperties[] };
        if (data.success) {
          setSavedPropertiesData(data.data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [savedProperties]);

  const removeSavedProperty = (propertyId: string) => {
    const updatedSaved = savedProperties.filter((id) => id !== propertyId);
    setSavedProperties(updatedSaved);
    localStorage.setItem("savedProperties", JSON.stringify(updatedSaved));

    const updatedData = savedPropertiesData.filter(
      (property) => property._id !== propertyId
    );
    setSavedPropertiesData(updatedData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-0">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-8">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            Saved Properties
          </h1>
          <p className="text-sm md:text-lg text-purple-100">
            Your favorite properties in one place
          </p>
        </div>
      </div>

      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          {savedPropertiesData.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-heart-line text-4xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No saved properties yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start browsing properties and save your favorites by clicking
                the heart icon
              </p>
              <a
                href="/properties"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 cursor-pointer"
              >
                Browse Properties
                <i className="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {savedPropertiesData.length} Saved{" "}
                  {savedPropertiesData.length === 1 ? "Property" : "Properties"}
                </h2>
                <button
                  onClick={() => {
                    setSavedProperties([]);
                    setSavedPropertiesData([]);
                    localStorage.removeItem("savedProperties");
                  }}
                  className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Clear All
                </button>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPropertiesData.map((property) => (
                  <div key={property._id} className="relative group">
                    <PropertyCard property={property} />
                    <button
                      onClick={() => removeSavedProperty(property._id)}
                      className="absolute top-4 right-4 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                    >
                      <i className="ri-close-line text-sm"></i>
                    </button>
                  </div>
                ))}
              </div>

              {/* Mobile Grid */}
              <div className="md:hidden grid grid-cols-2 gap-3">
                {savedPropertiesData.map((property) => (
                  <div key={property._id} className="relative group">
                    <PropertyCard property={property} isMobile={true} />
                    <button
                      onClick={() => removeSavedProperty(property._id)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      <i className="ri-close-line text-xs"></i>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <MobileBottomNav />
    </div>
  );
}
