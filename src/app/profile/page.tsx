/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import MobileBottomNav from "../../components/MobileBottomNav";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "../loading";
import { useAuthGuard } from "@/utils/useAuthGuard";
import { getToken, getUserInfo } from "@/services/auth.service";
import { getUserProfile } from "../actions";
import { sendOtpToPhone, updateProfile, verifyOtpFromPhone } from "./actions";
import { CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";

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
    verified: boolean;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [myProperties, setMyProperties] = useState<IProperty>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });
  const [otp, setOtp] = useState("");
  const pathname = usePathname();
  const authChecked = useAuthGuard();
  const router = useRouter();

  const [user, setUser] = useState<{
    email: string;
    role: string;
    sub: string;
  } | null>(null);

  useEffect(() => {
    const user = getUserInfo() as { email: string; role: string; sub: string };
    setUser(user);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch(
        `https://api.placearena.com/api/v1/property/owner/${
          getUserInfo()?.sub
        }`,
        {
          method: "GET",
          credentials: "include",
          next: { tags: ["profile"], revalidate: 0 },
          cache: "no-store",
        }
      );
      const data = await res.json();
      setMyProperties(data);
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const Token = getToken();
    if (!Token) {
      router.push("/login");
      return;
    }
    const fetchUserProfile = async () => {
      setIsLoading(true);
      const userData = await getUserProfile({
        accessToken: Token.accessToken,
        refreshToken: Token.refreshToken,
      });
      if (!userData) setUserProfile(null);
      else {
        setUserProfile(userData);
        setFormData({
          fullName: userData.fullName || "",
          phoneNumber: userData.phoneNumber || "",
          email: userData.email || "",
        });
      }
      setIsLoading(false);
    };
    if (pathname.includes("login") || pathname.includes("signup")) {
      setUserProfile(null);
      setIsLoading(false);
    } else fetchUserProfile();
  }, [pathname, router]);

  useEffect(() => {
    if (userProfile && !userProfile.verified) setIsVerifyModalOpen(true);
  }, [userProfile]);

  const handleEditProfile = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseVerifyModal = () => setIsVerifyModalOpen(false);
  const handleClosePhoneModal = () => setIsPhoneModalOpen(false);
  const handleCloseOtpModal = () => setIsOtpModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const Token = getToken();
    if (!Token) return;
    try {
      if (user === null) return;
      const result = await updateProfile({
        id: user.sub,
        updatedData: formData,
      });
      if (result) {
        setUserProfile(result);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const sendOtp = async () => {
    if (userProfile && userProfile?._id) {
      const phoneNumber = formData.phoneNumber.startsWith("+")
        ? formData.phoneNumber.slice(1)
        : formData.phoneNumber;
      await sendOtpToPhone({
        phone: phoneNumber,
        id: userProfile?._id,
      });
    }
    setIsPhoneModalOpen(false);
    setIsOtpModalOpen(true);
  };
  const verifyOtp = async () => {
    if (userProfile?._id) {
      const data = await verifyOtpFromPhone({
        code: otp,
        id: userProfile?._id,
      });
      if (data.verified) {
        setUserProfile({ ...userProfile, verified: true });
        setIsOtpModalOpen(false);
        setIsVerifyModalOpen(false);
      }
    }
  };

  if (!authChecked) return <Loading />;

  const avgRent =
    myProperties.length > 0
      ? Math.round(
          myProperties.reduce((sum, p) => sum + Number(p.rent || 0), 0) /
            myProperties.length
        )
      : 0;

  if (isLoading) return <ProfileSkeleton />;

  if (!userProfile) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              <Image
                width={128}
                height={128}
                src="https://img.freepik.com/premium-vector/hipster-man-with-beard-glasses-vector-illustration-cartoon-style_1142-64996.jpg?w=360"
                alt="Profile"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center md:justify-start">
                {userProfile.fullName}
                {userProfile.verified ? (
                  <CheckCircle2
                    className="w-6 h-6 ml-2 text-green-600 dark:text-green-400 hover:scale-110 transition-transform duration-200"
                    aria-label="Verified Account"
                  />
                ) : (
                  <XCircle
                    className="w-6 h-6 ml-2 text-red-600 dark:text-red-400 hover:scale-110 transition-transform duration-200"
                    aria-label="Unverified Account"
                  />
                )}
              </h1>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center md:justify-start">
                  <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  <span className="text-sm">{userProfile.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  <span className="text-sm">{userProfile.phoneNumber}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <i className="ri-calendar-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  <span className="text-sm">
                    Joined{" "}
                    {new Date(userProfile.createdAt ?? "").toLocaleString(
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
            <div className="grid-cols-1 grid gap-2">
              <button
                onClick={handleEditProfile}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Edit Profile
              </button>
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Verification Modal */}
        {isVerifyModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-lg transform transition-all duration-300 ease-out">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Verify Your Account
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Your phone number is not verified. Please verify to proceed.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseVerifyModal}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Later
                </button>
                <button
                  onClick={() => setIsPhoneModalOpen(true)}
                  className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Verify Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Phone Number Modal */}
        {/* {isPhoneModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-lg transform transition-all duration-300 ease-out">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Update Phone Number
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Enter or edit your phone number for verification.
              </p>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+1 123-456-7890"
                className="w-full px-3 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleClosePhoneModal}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={sendOtp}
                  className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Send Code
                </button>
              </div>
            </div>
          </div>
        )} */}
        {isPhoneModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-lg transform transition-all duration-300 ease-out">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Update Phone Number
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Enter or edit your phone number for verification.
              </p>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\+8801\d{0,9}$/.test(value) || value === "") {
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: value,
                    }));
                  }
                }}
                placeholder="+88017XXXXXXXX"
                className="w-full px-3 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
              {!/^\+8801\d{9}$/.test(formData.phoneNumber) &&
                formData.phoneNumber && (
                  <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    Number must be in format +8801 followed by 9 digits
                  </p>
                )}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleClosePhoneModal}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={sendOtp}
                  disabled={!/^\+8801\d{9}$/.test(formData.phoneNumber)}
                  className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed"
                >
                  Send Code
                </button>
              </div>
            </div>
          </div>
        )}
        {/* OTP Modal */}
        {isOtpModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-lg transform transition-all duration-300 ease-out">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Enter Verification Code
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                A 6-digit code was sent to {formData.phoneNumber}.
              </p>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                placeholder="123456"
                className="w-full px-3 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseOtpModal}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={verifyOtp}
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Profile Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Edit Profile
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 block py-2 px-3 w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block py-2 px-3 w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 block py-2 px-3 w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
            <Link href="/add-property">
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
                      {property.status}
                    </span>
                  </div>
                </div>
                <div className="flex md:flex-col gap-2">
                  <Link
                    href={`/property/${property._id}`}
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    View
                  </Link>
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
