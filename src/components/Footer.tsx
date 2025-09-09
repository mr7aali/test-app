"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import WhatsappIcon from "../../public/icon/WhatsappIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white dark:text-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden  flex items-center justify-center p-1">
                <Image
                  src="/logo.jpeg"
                  alt="Place Arena Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <span className="font-['Roboto'] text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
                Place Arena
              </span>
            </Link>
            <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed">
              Find your perfect rental home in Khulna with our premium property
              listings and professional service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-200">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer text-sm"
                >
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/add-property"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer text-sm"
                >
                  Add Property
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer text-sm"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer text-sm"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-200">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 flex items-center justify-center mr-3 mt-0.5 text-purple-400 dark:text-purple-300" />
                <span className="text-gray-400 dark:text-gray-500 text-sm">
                  Nirala residential Area,16 Road,
                  <br />
                  Khulna, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 flex items-center justify-center mr-3 text-purple-400 dark:text-purple-300" />
                <a
                  href="tel:+8801712345678"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors text-sm"
                >
                  +880 1910-683176
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 flex items-center justify-center mr-3 text-purple-400 dark:text-purple-300" />
                <a
                  href="mailto:info@placearena.com"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors text-sm"
                >
                  placearena.hr@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-200">
              Get in Touch
            </h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">
              Have questions about renting or listing properties? We’re here to
              help!
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/profile.php?id=61577692630030"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-blue-500 dark:hover:bg-blue-400 hover:scale-105"
              >
                <Facebook className="h-4 w-4 text-white dark:text-gray-200" />
              </a>
              <a
                href="https://wa.me/+8801340628323"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-blue-500 dark:hover:bg-blue-400 hover:scale-105"
              >
                <WhatsappIcon className="w-4 h-4 text-green-600 dark:text-green-500" />
              </a>
              <a
                href="https://www.instagram.com/placearena.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-blue-500 dark:hover:bg-blue-400 hover:scale-105"
              >
                <Instagram className="h-4 w-4 text-white dark:text-gray-200" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} Place Arena. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors text-sm cursor-pointer"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors text-sm cursor-pointer"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
