"use client";

import { useState, useEffect } from "react";
import React from "react";

import MobileBottomNav from "../../../components/MobileBottomNav";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PropertyDetail({
  property,
}: {
  property: {
    _id: string;
    title: string;
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
    ownerId: {
      _id: string;
      fullName: string;
      email: string;
      role: string;
      phoneNumber: string;
    };
  };
}) {
  // const property = sampleProperties.find((p) => p.id === parseInt(propertyId));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-0">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The property you&lsquo;re looking for doesn&lsquo;t exist.
          </p>
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  };

  const openImageModal = () => {
    setShowImageModal(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const handleImageModalClick = (e: React.MouseEvent) => {
    // Close modal when clicking on the backdrop (not on the image)
    if (e.target === e.currentTarget) {
      closeImageModal();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (showImageModal) {
      if (e.key === 'Escape') {
        closeImageModal();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    }
  };

  // Add keyboard event listeners
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Cleanup: restore body scroll if component unmounts with modal open
      document.body.style.overflow = 'unset';
    };
  }, [showImageModal]);

  // Add React import for useEffect
  React.useEffect(() => {
    return () => {
      // Cleanup: restore body scroll when component unmounts
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getConsistentDate = () => {
    const baseDate = new Date("2024-01-01");
    const daysToAdd = 234; // Example: 234 days from base date
    const targetDate = new Date(
      baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000
    );
    return targetDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Property Images Gallery */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden mb-6">
          {/* Main Image Container */}
          <div className="relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center min-h-[300px] max-h-[80vh] cursor-pointer group" onClick={openImageModal}>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={property.images[currentImageIndex]}
                alt={property.title}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain transition-opacity duration-200"
                style={{ 
                  width: 'auto', 
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '80vh'
                }}
                priority
              />
              
              {/* Zoom Overlay Hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                  <i className="ri-zoom-in-line mr-2"></i>
                  Click to zoom
                </div>
              </div>
            </div>

            {/* Image Navigation */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all duration-200 cursor-pointer z-10 backdrop-blur-sm"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all duration-200 cursor-pointer z-10 backdrop-blur-sm"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>

            {/* Property Type Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm">
                {property.type}
              </span>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openImageModal();
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all duration-200 cursor-pointer z-10 backdrop-blur-sm"
            >
              <i className="ri-fullscreen-line text-sm"></i>
            </button>
          </div>

          {/* Thumbnail Gallery */}
          {property.images.length > 1 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    onDoubleClick={() => {
                      setCurrentImageIndex(index);
                      openImageModal();
                    }}
                    className={`flex-shrink-0 relative rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                      index === currentImageIndex
                        ? "border-purple-600 shadow-md scale-105"
                        : "border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400"
                    }`}
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <Image
                        src={image}
                        alt={`${property.title} thumbnail ${index + 1}`}
                        width={96}
                        height={96}
                        className="max-w-full max-h-full object-contain"
                        style={{ 
                          width: 'auto', 
                          height: 'auto',
                          maxWidth: '100%',
                          maxHeight: '100%'
                        }}
                      />
                    </div>
                    {/* Active indicator */}
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Property Details */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {property.title}
              </h1>

              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                <i className="ri-map-pin-line w-5 h-5 flex items-center justify-center mr-2"></i>
                <span className="text-lg">{property.location}, Khulna</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-center">
                  <i className="ri-door-line w-6 h-6 flex items-center justify-center mx-auto mb-2 text-purple-600"></i>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Rooms
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {property.rooms}
                  </div>
                </div>
                <div className="text-center">
                  <i className="ri-drop-line w-6 h-6 flex items-center justify-center mx-auto mb-2 text-blue-600"></i>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Bathrooms
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {property.bathrooms}
                  </div>
                </div>
                <div className="text-center">
                  <i className="ri-square-line w-6 h-6 flex items-center justify-center mx-auto mb-2 text-green-600"></i>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Area
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {property.area}
                  </div>
                </div>
                <div className="text-center">
                  <i className="ri-calendar-line w-6 h-6 flex items-center justify-center mx-auto mb-2 text-orange-600"></i>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Available
                  </div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white">
                    {getConsistentDate().split(",")[0]}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {property.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Features & Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg"
                    >
                      <i className="ri-check-line w-4 h-4 flex items-center justify-center mr-2"></i>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact & Rent */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  ৳{property.rent.toLocaleString()}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  per month
                </div>
              </div>

              <button
                onClick={() => setShowContactModal(true)}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap mb-4"
              >
                Contact Owner
              </button>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <i className="ri-user-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  <span>Owner: {property?.ownerId?.fullName}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  <span>{property?.ownerId?.phoneNumber}</span>
                </div>
                {property?.ownerId?.email && (
                  <div className="flex items-center">
                    <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-2"></i>
                    <span>{property?.ownerId?.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Contact Owner
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-gray-500"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-user-line text-white text-2xl"></i>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {property?.ownerId?.fullName || "Property Owner"}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Property Owner
                </p>
              </div>

              <a
                href={`tel:${property?.ownerId?.phoneNumber}`}
                className="flex items-center justify-center w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
              >
                <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Call {property?.ownerId?.fullName} at{" "}
                {property?.ownerId?.phoneNumber}
              </a>

              {property?.ownerId?.email && (
                <a
                  href={`mailto:${property.ownerId.email}`}
                  className="flex items-center justify-center w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Email Owner
                </a>
              )}

              <a
                href={`sms:${property?.ownerId?.phoneNumber}?body=Hi, I'm interested in your property "${property.title}" in ${property.location}.`}
                className="flex items-center justify-center w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
              >
                <i className="ri-message-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Send SMS
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          onClick={handleImageModalClick}
        >
          {/* Modal Header */}
          <div className="absolute top-0 left-0 right-0 z-60 bg-gradient-to-b from-black/50 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeImageModal();
                  }}
                  className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-200 backdrop-blur-sm"
                >
                  <i className="ri-close-line text-lg"></i>
                </button>
                <div className="text-white">
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm text-white/70">
                    {currentImageIndex + 1} of {property.images.length}
                  </p>
                </div>
              </div>
              
              {/* Desktop Navigation Hint */}
              <div className="hidden md:block text-white/70 text-sm">
                Use arrow keys or click to navigate • ESC to close
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
            <div className="relative max-w-full max-h-full">
              <Image
                src={property.images[currentImageIndex]}
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
                style={{ 
                  width: 'auto', 
                  height: 'auto',
                  maxWidth: '100vw',
                  maxHeight: '100vh'
                }}
                priority
              />
            </div>

            {/* Navigation Buttons */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-200 backdrop-blur-sm z-20"
                >
                  <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-200 backdrop-blur-sm z-20"
                >
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-black/50 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 hover:scale-110 transition-all duration-200 active:scale-95"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 hover:scale-110 transition-all duration-200 active:scale-95"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-white text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeImageModal();
                  }}
                  className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 hover:scale-110 transition-all duration-200 active:scale-95"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip for Desktop */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:block">
              <div className="flex gap-2 bg-black/30 backdrop-blur-sm rounded-lg p-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                      index === currentImageIndex
                        ? "border-white scale-110"
                        : "border-white/30 hover:border-white/60"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <MobileBottomNav />
    </div>
  );
}
