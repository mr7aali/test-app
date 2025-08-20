/* eslint-disable @next/next/no-img-element */

"use client";

import type React from "react";

import { useState } from "react";

import MobileBottomNav from "../../components/MobileBottomNav";
import { availableFeatures, khulnaAreas, propertyTypes } from "@/data";
import { uploadImageToCloudinary } from "../lib/cloudinary";

import { getUserProfile } from "../actions";
import { useRouter } from "next/navigation";
import { getToken } from "@/services/auth.service";
import { useAuthGuard } from "@/utils/useAuthGuard";
import Loading from "../loading";

interface FormData {
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
}

export default function AddProperty() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    location: "",
    type: "",
    rent: "",
    rooms: "",
    bathrooms: "",
    area: "",
    description: "",
    features: [],
    images: [],
  });

  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [uploadingImages, setUploadingImages] = useState<boolean[]>([]);
  const router = useRouter();

  const authChecked = useAuthGuard();
  if (!authChecked) {
    return <Loading />;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationSelect = (location: string) => {
    setFormData((prev) => ({ ...prev, location }));
    setLocationDropdownOpen(false);
  };

  const handleTypeSelect = (type: string) => {
    setFormData((prev) => ({ ...prev, type }));
    setTypeDropdownOpen(false);
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = formData.images.length + files.length;

    if (totalImages > 15) {
      alert("You can only upload up to 15 images");
      return;
    }

    // Initialize uploading states
    const newUploadingStates = new Array(files.length).fill(true);
    setUploadingImages((prev) => [...prev, ...newUploadingStates]);

    try {
      // Upload each file to Cloudinary
      const uploadPromises = files.map(async (file, index) => {
        try {
          const imageUrl = await uploadImageToCloudinary(file);

          // Update uploading state for this specific image
          setUploadingImages((prev) => {
            const newStates = [...prev];
            newStates[formData.images.length + index] = false;
            return newStates;
          });

          return imageUrl;
        } catch (error) {
          console.error(`Failed to upload image ${index + 1}:`, error);

          // Update uploading state for failed upload
          setUploadingImages((prev) => {
            const newStates = [...prev];
            newStates[formData.images.length + index] = false;
            return newStates;
          });

          return null;
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const successfulUploads = uploadedUrls.filter(
        (url) => url !== null
      ) as string[];

      if (successfulUploads.length > 0) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...successfulUploads],
        }));
      }

      if (successfulUploads.length < files.length) {
        alert(
          `${
            files.length - successfulUploads.length
          } image(s) failed to upload. Please try again.`
        );
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images. Please try again.");
    }

    // Clear the input
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setUploadingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.location ||
      !formData.type ||
      !formData.rent ||
      !formData.rooms
    ) {
      setSubmitStatus("Please fill in all required fields");
      return;
    }

    if (formData.images.length === 0) {
      setSubmitStatus("Please upload at least one property image");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Prepare data in the format expected by backend
      const Token = getToken();

      if (Token === null) {
        router.push("/login");
        return;
      }
      const user = await getUserProfile({
        accessToken: Token.accessToken,
        refreshToken: Token.refreshToken,
      });

      const propertyData = {
        title: formData.title,
        location: formData.location,
        type: formData.type,
        rent: formData.rent,
        rooms: formData.rooms,
        bathrooms: formData.bathrooms || "1",
        area: formData.area || "",
        description: formData.description,
        features: formData.features,
        images: formData.images,
        ownerId: user._id,
      };

      const response = await fetch("/api/property", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: propertyData }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      setSubmitStatus(
        "Property listed successfully! It will be reviewed and published soon."
      );
    } catch (error) {
      console.error("Please try again : ", error);
      setSubmitStatus(`Please try again `);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-12">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
            List Your Property
          </h1>
          <p className="text-sm md:text-xl text-gray-600 dark:text-gray-400">
            Add your property details to reach thousands of potential tenants in
            Khulna
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 md:p-8">
          <form
            id="add-property-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Property Photos Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Property Photos (Up to 15 photos) *
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
                    <i className="ri-image-add-line text-2xl text-gray-400"></i>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Click to upload property photos
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Upload up to 15 high-quality images (JPG, PNG)
                  </p>
                </label>
              </div>

              {/* Image Preview Grid */}
              {formData.images.length > 0 && (
                <div className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                          <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={`Property ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {uploadingImages[index] && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <i className="ri-loader-line animate-spin text-white text-xl"></i>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <i className="ri-close-line text-sm"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {formData.images.length}/15 photos uploaded
                  </p>
                </div>
              )}
            </div>

            {/* Property Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Luxury 3BR Family Apartment"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location in Khulna *
                </label>
                <button
                  type="button"
                  onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                  className="w-full px-4 py-3 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer pr-8"
                >
                  <span className="text-gray-900 dark:text-white">
                    {formData.location || "Select Location"}
                  </span>
                  <i
                    className={`ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${
                      locationDropdownOpen ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>

                {locationDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                    {khulnaAreas.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => handleLocationSelect(area)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer text-gray-900 dark:text-white"
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Property Type and Rent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Property Type *
                </label>
                <button
                  type="button"
                  onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                  className="w-full px-4 py-3 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer pr-8"
                >
                  <span className="text-gray-900 dark:text-white">
                    {formData.type || "Select Type"}
                  </span>
                  <i
                    className={`ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${
                      typeDropdownOpen ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>

                {typeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleTypeSelect(type)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer text-gray-900 dark:text-white"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Rent (৳) *
                </label>
                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={handleInputChange}
                  placeholder="25000"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Rooms, Bathrooms, Area */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Rooms *
                </label>
                <input
                  type="number"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleInputChange}
                  placeholder="3"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="2"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Area
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="1200 sq ft"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your property, nearby facilities, transportation, etc..."
                maxLength={500}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formData.description.length}/500 characters
              </p>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Property Features
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableFeatures.map((feature) => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => handleFeatureToggle(feature)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                      formData.features.includes(feature)
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>

            {/* Owner Contact Information */}
            {/* <div
              style={{ border: "1px solid red" }}
              className="border-t border-gray-200 dark:border-gray-700 pt-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleInputChange}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div> */}

            {/* Status Message */}
            {submitStatus && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.includes("successfully")
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                }`}
              >
                {submitStatus}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={
                  isSubmitting || uploadingImages.some((uploading) => uploading)
                }
                className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isSubmitting || uploadingImages.some((uploading) => uploading)
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <i className="ri-loader-line animate-spin mr-2"></i>
                    Submitting Property...
                  </div>
                ) : uploadingImages.some((uploading) => uploading) ? (
                  <div className="flex items-center justify-center">
                    <i className="ri-upload-line animate-pulse mr-2"></i>
                    Uploading Images...
                  </div>
                ) : (
                  "List Property"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
