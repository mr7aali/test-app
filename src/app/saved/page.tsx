"use client";

import { useState, useEffect } from "react";
import PropertyCard from "../../components/PropertyCard";
import MobileBottomNav from "../../components/MobileBottomNav";

const sampleProperties = [
  {
    _id: "1",
    title: "Office Unit Rent",
    location: "Nirala",
    type: "Office",
    rent: 25000,
    rooms: 3,
    bathrooms: 2,
    area: "1200 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Modern%20luxury%20office%20space%20interior%20with%20spacious%20work%20areas%2C%20contemporary%20furniture%2C%20large%20windows%20with%20natural%20light%2C%20elegant%20conference%20room%20and%20reception%20area%2C%20premium%20finishes%20and%20sophisticated%20design%20elements%2C%20professional%20business%20photography&width=400&height=300&seq=prop-office-1&orientation=landscape",
    features: ["Conference Room", "Parking", "Security", "Generator"],
    images: [],
  },
  {
    _id: "2",
    title: "Bachelor Apartment",
    location: "Sonadanga",
    type: "Bachelor",
    rent: 12000,
    rooms: 1,
    bathrooms: 1,
    area: "600 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Cozy%20bachelor%20studio%20apartment%20with%20modern%20minimalist%20design%2C%20compact%20living%20space%20with%20bed%2C%20study%20area%2C%20kitchenette%2C%20warm%20lighting%20and%20contemporary%20furniture%2C%20efficient%20space%20utilization%2C%20professional%20real%20estate%20photography&width=400&height=300&seq=prop-bach-2&orientation=landscape",
    features: ["Furnished", "WiFi", "AC", "Kitchen"],
    images: [],
  },
  {
    _id: "7",
    title: "Family Apartment",
    location: "Boyra",
    type: "Family",
    rent: 28000,
    rooms: 3,
    bathrooms: 2,
    area: "1300 sq ft",
    image:
      "https://readdy.ai/api/search-image?query=Beautiful%20family%20apartment%20with%20spacious%20living%20areas%2C%20modern%20kitchen%2C%20comfortable%20bedrooms%2C%20balcony%20with%20city%20view%2C%20contemporary%20interior%20design%2C%20natural%20lighting%20and%20premium%20finishes&width=400&height=300&seq=prop-fam-7&orientation=landscape",
    features: ["Balcony", "Parking", "Security", "Generator"],
    images: [],
  },
];

export default function SavedProperties() {
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [savedPropertiesData, setSavedPropertiesData] = useState<
    typeof sampleProperties
  >([]);

  useEffect(() => {
    // Load saved properties from localStorage
    const saved = localStorage.getItem("savedProperties");
    if (saved) {
      const savedIds = JSON.parse(saved);
      setSavedProperties(savedIds);

      // Filter properties that are saved
      const savedData = sampleProperties.filter((property) =>
        savedIds.includes(property._id)
      );
      setSavedPropertiesData(savedData);
    }
  }, []);

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
