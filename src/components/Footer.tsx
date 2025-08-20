"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <i className="ri-building-line text-white text-xl"></i>
              </div>
              <span className="font-['Pacifico'] text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Place Arena
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Find your perfect rental home in Khulna with our premium property
              listings and professional service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
                >
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/add-property"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
                >
                  Add Property
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-3 mt-0.5 text-purple-400"></i>
                <span className="text-gray-400 text-sm">
                  123 Khan Jahan Ali Road
                  <br />
                  Khulna, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-3 text-purple-400"></i>
                <a
                  href="tel:+8801712345678"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  +880 1712-345678
                </a>
              </li>
              <li className="flex items-center">
                <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-3 text-purple-400"></i>
                <a
                  href="mailto:info@placearena.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  info@placearena.com
                </a>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-400 text-sm mb-4">
              Have questions about renting or listing properties? We&lsquo;re
              here to help!
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
              >
                <i className="ri-facebook-fill text-sm"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
              >
                <i className="ri-twitter-fill text-sm"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
              >
                <i className="ri-instagram-fill text-sm"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Place Arena. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
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
