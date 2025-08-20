"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { isLoggedIn, logOutUser } from "@/services/auth.service";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const logged = isLoggedIn();
    setAuthChecked(Boolean(logged));
  }, [pathname]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldBeDark =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    setIsDarkMode(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  // useEffect(() => {
  //   const result = isLoggedIn();
  //   if (result) {
  //     setIsLoggidIn(true);
  //   } else {
  //     setIsLoggidIn(false);
  //   }
  // }, []);

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <i className="ri-building-line text-white text-xl"></i>
              </div>
              <span className="font-[\'Pacifico\'] text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Place Arena
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/properties"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer"
              >
                Browse Properties
              </Link>
              <Link
                href="/add-property"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer"
              >
                Add Property
              </Link>
              <Link
                href="/saved"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer"
              >
                Saved
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors cursor-pointer"
              >
                Profile
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <i
                  className={`${
                    isDarkMode ? "ri-sun-line" : "ri-moon-line"
                  } text-lg text-gray-600 dark:text-gray-300`}
                ></i>
              </button>
              {!Boolean(authChecked) && (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {Boolean(authChecked) && (
                <Link
                  onClick={logOutUser}
                  href="/login"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  Log Out
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 relative">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-building-line text-white text-sm"></i>
              </div>
              <span className="font-[\'Pacifico\'] text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Place Arena
              </span>
            </Link>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <i
                  className={`${
                    isDarkMode ? "ri-sun-line" : "ri-moon-line"
                  } text-sm text-gray-600 dark:text-gray-300`}
                ></i>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <i
                  className={`${
                    mobileMenuOpen ? "ri-close-line" : "ri-menu-line"
                  } text-sm text-gray-600 dark:text-gray-300`}
                ></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Fixed positioning and higher z-index */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg z-[9999]">
            <div className="px-4 py-2 space-y-1">
              <Link
                href="/properties"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Properties
              </Link>
              <Link
                href="/add-property"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Add Property
              </Link>
              <Link
                href="/saved"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Saved Properties
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <Link
                href="/login"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 cursor-pointer text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
