"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Home, Lock } from "lucide-react";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { SignUpWithGoogleUser } from "../login/actions";
import { storeUserInfo } from "@/services/auth.service";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "tenant",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [phone, setPhone] = useState("");
  const provider = new GoogleAuthProvider();
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 14) {
      setSubmitStatus("Phone number cannot exceed 14 characters");
      return;
    }
    if (!value.startsWith("+8801")) {
      value = "+8801" + value.replace(/^\+?8801?/, "");
    }
    setPhone(value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setSubmitStatus("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setSubmitStatus("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setSubmitStatus("Password must be at least 6 characters long");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: phone,
          role: formData.userType,
          password: formData.password,
          phoneNumber: phone,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setSubmitStatus(data.error || "Something went wrong");
        return;
      }
      setSubmitStatus(
        "Account created successfully! Please check your email for verification."
      );

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "tenant",
      });
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setSubmitStatus(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleGoogleSignup = async () => {
  //   setIsSubmitting(true);
  //   setSubmitStatus("");
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const loggedInUser = result.user;
  //     console.log(result);
  //     console.log("User Info:", loggedInUser);
  //   } catch (error) {
  //     console.error("Google signup error:", error);
  //     setSubmitStatus("Google signup failed. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const handleGoogleSignup = async () => {
    try {
      setIsSubmitting(true);
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;

      try {
        const userData = {
          fullName: loggedInUser.displayName || "Mr --",
          email: loggedInUser.email,
          role: "tenant",
          password: loggedInUser.uid,
          phoneNumber: loggedInUser.phoneNumber || "+8801300000000",
        };
        const data = await SignUpWithGoogleUser({ user: userData });

        storeUserInfo({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
        router.push("/");
        setSubmitStatus("Login successful! Redirecting...");
      } catch (error) {
        console.error("signup-with-google login error:", error);
      }
    } catch (error) {
      console.error("Google login error:", error);
      setSubmitStatus("Google login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex items-center justify-center min-h-[80vh] px-6 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div
              style={{
                backgroundImage: "url('/icon.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
              }}
              className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            ></div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join Place Arena and start your property journey
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
            <div className="md:col-span-2 mb-6">
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="-3 0 262 262"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    fill="#4285F4"
                  />
                  <path
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    fill="#34A853"
                  />
                  <path
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    fill="#FBBC05"
                  />
                  <path
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    fill="#EB4335"
                  />
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="md:col-span-2 text-center text-gray-600 dark:text-gray-400 mb-6">
              or
            </div>

            <form
              id="signup-form"
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneNumberChange}
                  placeholder="+880 1XXX-XXXXXX"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  I am a *
                </label>
                <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3">
                  <Home className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                >
                  <option value="tenant">Tenant (Looking for property)</option>
                  <option value="owner">Property Owner</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password *
                </label>
                <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password (min. 6 characters)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password *
                </label>
                <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="md:col-span-2 flex items-start">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-0.5"
                  required
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </div>

              {submitStatus && (
                <div
                  className={`md:col-span-2 p-3 rounded-lg text-sm ${
                    submitStatus.includes("successfully")
                      ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                      : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                  }`}
                >
                  {submitStatus}
                </div>
              )}

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isSubmitting
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <i className="ri-loader-line animate-spin mr-2"></i>
                      Creating account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>

              <div className="md:col-span-2 text-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                </span>
                <Link
                  href="/login"
                  className="text-purple-600 dark:text-purple-400 hover:underline font-medium cursor-pointer"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
