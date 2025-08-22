import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import { Bookmark, MapPin, Door, Drop, Star } from "@lucid/react";
import { IProperties } from "@/app/saved/page";
import { Bookmark, DoorClosed, Droplet, MapPin, Star } from "lucide-react";

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
  images: string[];
  features: string[];
}

interface PropertyCardProps {
  property: IProperties | Property;
  isMobile?: boolean;
}

export default function PropertyCard({
  property,
  isMobile = false,
}: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedProperties = localStorage.getItem("savedProperties");
    if (savedProperties) {
      const savedIds = JSON.parse(savedProperties);
      setIsSaved(savedIds.includes(property._id));
    }
  }, [property._id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const savedProperties = localStorage.getItem("savedProperties");
    let savedIds = savedProperties ? JSON.parse(savedProperties) : [];
    savedIds = isSaved
      ? savedIds.filter((id: string) => id !== property._id)
      : [...savedIds, property._id];
    localStorage.setItem("savedProperties", JSON.stringify(savedIds));
    setIsSaved(!isSaved);
  };

  const getConsistentDate = () => {
    const baseDate = new Date("2024-01-01");
    const daysToAdd = (1 * 7) % 30;
    const targetDate = new Date(
      baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000
    );
    return targetDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const imageSrc =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images[0]
      : property.images[0] || "/fallback-image.jpg";

  if (isMobile) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="relative h-32 overflow-hidden">
          {imageSrc && (
            <Image
              fill
              src={imageSrc}
              alt={property.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
              {property.type}
            </span>
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={toggleSave}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isSaved
                  ? "bg-blue-600 text-white"
                  : "bg-white/80 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              <Bookmark
                className="w-3 h-3"
                fill={isSaved ? "currentColor" : "none"}
                stroke="currentColor"
              />
            </button>
            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-amber-400">
              <Star className="w-3 h-3 text-white" fill="currentColor" />
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="text-xs truncate">{property.location}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
            <span>{property.rooms}R</span>
            <span>{property.bathrooms}B</span>
            <span>{getConsistentDate()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
              ৳{(Number(property.rent) / 1000).toFixed(0)}k
            </span>
            <Link href={`/property/${property._id}`}>
              <button className="px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap">
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        {imageSrc && (
          <Image
            fill
            src={imageSrc}
            alt={property.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-full">
            {property.type}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={toggleSave}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
              isSaved
                ? "bg-blue-600 text-white"
                : "bg-white/80 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            <Bookmark
              className="w-4 h-4"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
            />
          </button>
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-amber-400">
            <Star className="w-4 h-4 text-white" fill="currentColor" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {property.title}
        </h3>
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <DoorClosed className="w-4 h-4 mr-1" />
              <span>{property.rooms} Rooms</span>
            </div>
            <div className="flex items-center">
              <Droplet className="w-4 h-4 mr-1" />
              <span>{property.bathrooms} Baths</span>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            To-let: {getConsistentDate()}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {property.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-lg"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ৳{property.rent.toLocaleString()}
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">
              /month
            </span>
          </div>
          <Link href={`/property/${property._id}`}>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
