
'use client';

import { useState } from 'react';
import PriceRangeFilter from './PriceRangeFilter';

interface SearchFiltersProps {
  onLocationChange: (location: string) => void;
  onTypeChange: (type: string) => void;
  onPriceRangeChange?: (min: number, max: number) => void;
}

const khulnaAreas = [
  'All Areas',
  'Nirala',
  'Sonadanga',
  'Khan Jahan Ali Road',
  'Gollamari',
  'Doulatpur',
  'Khalishpur',
  'Boyra',
  'Phultala',
  'Rupsha',
  'Digholia'
];

const propertyTypes = [
  'All Types',
  'Family',
  'Bachelor',
  'Office',
  'Shop',
  'Studio',
  'Apartment'
];

export default function SearchFilters({ onLocationChange, onTypeChange, onPriceRangeChange }: SearchFiltersProps) {
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [selectedType, setSelectedType] = useState('All Types');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setLocationDropdownOpen(false);
    onLocationChange(location);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setTypeDropdownOpen(false);
    onTypeChange(type);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    if (onPriceRangeChange) {
      onPriceRangeChange(min, max);
    }
  };

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:block bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 mx-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <i className="ri-map-pin-line w-4 h-4 inline-flex items-center justify-center mr-2"></i>
              Location in Khulna
            </label>
            <button
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="w-full px-4 py-3 text-left bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-white">{selectedLocation}</span>
                <i className={`ri-arrow-down-s-line transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`}></i>
              </div>
            </button>
            
            {locationDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                {khulnaAreas.map((area) => (
                  <button
                    key={area}
                    onClick={() => handleLocationSelect(area)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer text-gray-900 dark:text-white"
                  >
                    {area}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Type Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <i className="ri-home-line w-4 h-4 inline-flex items-center justify-center mr-2"></i>
              Property Type
            </label>
            <button
              onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
              className="w-full px-4 py-3 text-left bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-white">{selectedType}</span>
                <i className={`ri-arrow-down-s-line transition-transform ${typeDropdownOpen ? 'rotate-180' : ''}`}></i>
              </div>
            </button>
            
            {typeDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeSelect(type)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer text-gray-900 dark:text-white"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="relative">
            <PriceRangeFilter onPriceRangeChange={handlePriceRangeChange} />
          </div>
        </div>

        {/* Desktop Filter Tags */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {propertyTypes.slice(1).map((type) => (
              <button
                key={type}
                onClick={() => handleTypeSelect(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedType === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4 mx-4 -mt-6 relative z-10">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Location Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="w-full px-2 py-2 text-left bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-900 dark:text-white truncate">{selectedLocation}</span>
                <i className={`ri-arrow-down-s-line text-xs transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`}></i>
              </div>
            </button>
            
            {locationDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                {khulnaAreas.map((area) => (
                  <button
                    key={area}
                    onClick={() => handleLocationSelect(area)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer text-xs text-gray-900 dark:text-white"
                  >
                    {area}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Type Dropdown */}
          <div className="relative">
            <button
              onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
              className="w-full px-2 py-2 text-left bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-900 dark:text-white truncate">{selectedType}</span>
                <i className={`ri-arrow-down-s-line text-xs transition-transform ${typeDropdownOpen ? 'rotate-180' : ''}`}></i>
              </div>
            </button>
            
            {typeDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeSelect(type)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer text-xs text-gray-900 dark:text-white"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="relative">
            <PriceRangeFilter onPriceRangeChange={handlePriceRangeChange} />
          </div>
        </div>

        {/* Mobile Filter Tags */}
        <div className="flex flex-wrap gap-1">
          {propertyTypes.slice(1, 5).map((type) => (
            <button
              key={type}
              onClick={() => handleTypeSelect(type)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedType === type
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
