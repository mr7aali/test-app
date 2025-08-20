"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Main 404 Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12 mb-6">
          {/* 404 Number with Gradient */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Oops! The page {"you're"} looking for seems to have wandered off.
              {"Don't"} worry, it happens to the best of us.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/profile"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 group"
            >
              <div className="text-purple-600 dark:text-purple-400 mb-2">
                <i className="ri-user-line text-2xl"></i>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Profile
              </div>
            </Link>

            <Link
              href="/properties"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 group"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-2">
                <i className="ri-home-line text-2xl"></i>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Properties
              </div>
            </Link>

            <Link
              href="/search"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 group"
            >
              <div className="text-green-600 dark:text-green-400 mb-2">
                <i className="ri-search-line text-2xl"></i>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Search
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
