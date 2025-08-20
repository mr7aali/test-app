/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, useState } from "react";
import MobileBottomNav from "../../components/MobileBottomNav";
import { usePathname, useRouter } from "next/navigation";
// import { getUserProfile } from "../actions";
import Link from "next/link";
import Loading from "../loading";
import { useAuthGuard } from "@/utils/useAuthGuard";
import { getToken, getUserInfo } from "@/services/auth.service";
import { getUserProfile } from "../actions";
// import { useRouter } from "next/n";

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Profile Header Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 animate-pulse"></div>

            <div className="flex-1 text-center md:text-left">
              <div className="h-8 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 rounded-lg mb-4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="px-6 py-2 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 rounded-lg animate-pulse h-10 w-32"></div>
          </div>
        </div>

        {/* Quick Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 text-center"
            >
              <div className="h-8 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* My Properties Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-48 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 rounded-lg animate-pulse"></div>
            <div className="h-10 w-24 bg-purple-100 dark:bg-purple-900/20 rounded-lg animate-pulse"></div>
          </div>

          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl"
              >
                <div className="w-full md:w-32 h-32 md:h-24 rounded-lg bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 animate-pulse"></div>

                <div className="flex-1">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-6 w-20 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2">
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="h-8 w-16 bg-blue-200 dark:bg-blue-800 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}

export default function Profile() {
  type UserProfile = {
    email?: string;
    phoneNumber?: string;
    createdAt?: string | Date;
    fullName?: string;
    _id?: string;
  };
  type IProperty = {
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
    status: string;
  }[];
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [myProperties, setMyProperties] = useState<IProperty>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const authChecked = useAuthGuard();
  const router = useRouter();
  const user = getUserInfo() as {
    email: string;
    sub: string;
  };

  useEffect(() => {
    const fetchProperties = async () => {
      if (!user?.sub) return;
      const res = await fetch(
        `https://place-arena-backend.vercel.app/api/v1/property/owner/${user.sub}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setMyProperties(data);
    };
    fetchProperties();
  }, [user]);

  useEffect(() => {
    const Token = getToken();

    if (Token === null) {
      router.push("/login");
      return;
    }
    const fetchUserProfile = async () => {
      setIsLoading(true);
      const userData = await getUserProfile({
        accessToken: Token?.accessToken,
        refreshToken: Token?.refreshToken,
      });

      if (!userData) {
        setUserProfile(null);
      } else {
        setUserProfile(userData);
      }
      setIsLoading(false);
    };
    if (pathname.includes("login") || pathname.includes("signup")) {
      setUserProfile(null);
      setIsLoading(false);
    } else {
      fetchUserProfile();
    }
  }, [pathname, router]);
  if (!authChecked) {
    return <Loading />;
  }
  const avgRent =
    myProperties.length > 0
      ? Math.round(
          myProperties.reduce(
            (sum, property) => sum + Number(property.rent || 0),
            0
          ) / myProperties.length
        )
      : 0;

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (userProfile === null) {
    return;
  } else {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-0">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-12">
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={
                    "https://img.freepik.com/premium-vector/hipster-man-with-beard-glasses-vector-illustration-cartoon-style_1142-64996.jpg?w=360"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {userProfile?.fullName}
                </h1>
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center justify-center md:justify-start">
                    <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-2"></i>
                    <span className="text-sm">{userProfile?.email}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2"></i>
                    <span className="text-sm">{userProfile?.phoneNumber}</span>
                  </div>

                  <div className="flex items-center justify-center md:justify-start">
                    <i className="ri-calendar-line w-4 h-4 flex items-center justify-center mr-2"></i>

                    <span className="text-sm">
                      Joined{" "}
                      {new Date(userProfile?.createdAt ?? "").toLocaleString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {myProperties.length || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Properties
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                0
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Rented
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {myProperties.length || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Available
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                {avgRent.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Rent
              </div>
            </div>
          </div>

          {/* My Properties */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                My Properties
              </h2>
              <Link href={"/add-property"}>
                {" "}
                <button className="px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors cursor-pointer whitespace-nowrap">
                  Add New
                </button>
              </Link>
            </div>

            <div className="space-y-4">
              {myProperties.map((property) => (
                <div
                  key={property._id}
                  className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="w-full md:w-32 h-32 md:h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {property.title}
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center">
                        <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-1"></i>
                        <span>{property.location}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-money-dollar-circle-line w-4 h-4 flex items-center justify-center mr-1"></i>
                        <span>৳{property.rent.toLocaleString()}/month</span>
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          property.status !== "Available"
                            ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                            : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                        }`}
                      >
                        Available
                      </span>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors cursor-pointer whitespace-nowrap">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    );
  }
}
