'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <div 
      className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://readdy.ai/api/search-image?query=Luxury%20modern%20residential%20buildings%20with%20glass%20facades%20and%20elegant%20architecture%20in%20Khulna%20Bangladesh%2C%20premium%20apartment%20complexes%20with%20beautiful%20landscaping%20and%20contemporary%20design%2C%20upscale%20urban%20living%20spaces%20with%20sophisticated%20lighting%20and%20clean%20minimalist%20aesthetic%2C%20professional%20real%20estate%20photography%20style&width=1200&height=600&seq=hero-bg-1&orientation=landscape')`
      }}
    >
      <div className="w-full max-w-6xl px-6 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Find Your Perfect
          <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Rental Home
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
          Discover premium rental properties in Khulna with Place Arena. From cozy apartments to luxury homes, find your ideal space today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/properties" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap">
            Browse Properties
          </Link>
          <Link href="/add-property" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer whitespace-nowrap">
            List Your Property
          </Link>
        </div>
      </div>
    </div>
  );
}