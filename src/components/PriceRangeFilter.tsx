"use client";

import { useState } from "react";

interface PriceRangeFilterProps {
  onPriceRangeChange: (min: number, max: number) => void;
  minPrice?: number;
  maxPrice?: number;
}

export default function PriceRangeFilter({
  onPriceRangeChange,
}: // minPrice = 0,
// maxPrice = 100000,
PriceRangeFilterProps) {
  const [minValue, setMinValue] = useState<string>("");
  const [maxValue, setMaxValue] = useState<string>("");

  const handleApply = () => {
    const min = minValue ? parseInt(minValue) || 0 : 0;
    const max = maxValue ? parseInt(maxValue) || 100000 : 100000;
    onPriceRangeChange(min, max);
  };

  const handleReset = () => {
    setMinValue("");
    setMaxValue("");
    onPriceRangeChange(0, 100000);
  };

  return (
    <>
      {/* Desktop Price Filter */}
      <div className="hidden md:block">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <i className="ri-money-dollar-circle-line w-4 h-4 inline-flex items-center justify-center mr-2"></i>
          Price Range
        </label>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Min Price
              </label>
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Max Price
              </label>
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                placeholder="No limit"
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Price Filter */}
      <div className="md:hidden">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Min Price
              </label>
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                placeholder="0"
                className="w-full px-2 py-1.5 text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Max Price
              </label>
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                placeholder="No limit"
                className="w-full px-2 py-1.5 text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
