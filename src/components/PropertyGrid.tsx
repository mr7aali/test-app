"use client";

import PropertyCard from "./PropertyCard";

interface Property {
  _id: string;
  title: string;
  location: string;
  type: string;
  rent: number;
  rooms: number;
  bathrooms: number;
  area: string;
  image: string;
  images: string[]; // Optional array of images
  features: string[];
}

interface PropertyGridProps {
  properties: Property[];
  filteredLocation: string;
  filteredType: string;
  priceRange?: { min: number; max: number };
}

export default function PropertyGrid({
  properties,
  filteredLocation,
  filteredType,
  priceRange,
}: PropertyGridProps) {
  // Filter properties based on all criteria
  const filteredProperties = properties.filter((property) => {
    const locationMatch =
      filteredLocation === "All Areas" ||
      property.location === filteredLocation;
    const typeMatch =
      filteredType === "All Types" || property.type === filteredType;
    const priceMatch =
      !priceRange ||
      (property.rent >= priceRange.min && property.rent <= priceRange.max);

    return locationMatch && typeMatch && priceMatch;
  });

  return (
    <div>
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Showing {filteredProperties.length}{" "}
          {filteredProperties.length === 1 ? "property" : "properties"}
          {filteredLocation !== "All Areas" && ` in ${filteredLocation}`}
          {filteredType !== "All Types" && ` • ${filteredType} properties`}
          {priceRange &&
            (priceRange.min > 0 || priceRange.max < 100000) &&
            ` • ৳${priceRange.min.toLocaleString()} - ৳${priceRange.max.toLocaleString()}`}
        </p>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-building-line text-4xl text-gray-400"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No properties found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your filters to see more results
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>

          {/* Mobile Grid */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                isMobile={true}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
