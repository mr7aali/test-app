"use client";
import { useState, useEffect, Dispatch } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  PlusCircle,
  Heart,
  User,
  LogIn,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { isLoggedIn, logOutUser } from "@/services/auth.service";

// Logo Component
const Logo = () => (
  <Link href="/" className="flex items-center space-x-3 group">
    <div className="w-12 h-12 md:w-12 md:h-12 rounded-2xl overflow-hidden transform group-hover:scale-105 transition-transform  flex items-center justify-center p-1">
      <Image
        src="/logo.jpeg"
        alt="Place Arena Logo"
        width={48}
        height={48}
        className="w-full h-full object-contain"
      />
    </div>
    <span className="font-['Roboto'] text-xl md:text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-blue-500 transition-all font-bold">
      Place Arena
    </span>
  </Link>
);

// Theme Toggle Component
const ThemeToggle = ({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) => (
  <button
    onClick={toggleDarkMode}
    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    aria-label="Toggle dark mode"
  >
    {isDarkMode ? (
      <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
    ) : (
      <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
    )}
  </button>
);

// Nav Item Component
const NavItem = ({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    className="flex items-center space-x-2 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </Link>
);

// Auth Buttons Component
const AuthButtons = ({
  authChecked,
  onLogout,
  setMobileMenuOpen,
}: {
  authChecked: boolean;
  onLogout: () => void;
  setMobileMenuOpen: Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="flex items-center space-x-4">
    {!authChecked ? (
      <>
        <NavItem
          href="/login"
          icon={LogIn}
          label="Login"
          onClick={() => setMobileMenuOpen((pre) => !pre)}
        />
        <Link
          href="/signup"
          onClick={() => setMobileMenuOpen((pre) => !pre)}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium"
        >
          Sign Up
        </Link>
      </>
    ) : (
      <Link
        onClick={onLogout}
        href="/login"
        className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium"
      >
        <LogOut className="w-5 h-5" />
        <span>Log Out</span>
      </Link>
    )}
  </div>
);

// Mobile Menu Toggle Component
const MobileMenuToggle = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<React.SetStateAction<boolean>>;
}) => (
  <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    aria-label="Toggle menu"
  >
    {mobileMenuOpen ? (
      <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
    ) : (
      <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
    )}
  </button>
);

// Mobile Menu Component
const MobileMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  authChecked,
  onLogout,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<React.SetStateAction<boolean>>;
  authChecked: boolean;
  onLogout: () => void;
}) =>
  mobileMenuOpen && (
    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg z-[9999]">
      <div className="px-4 py-4 space-y-2">
        <NavItem
          href="/properties"
          icon={Search}
          label="Browse Properties"
          onClick={() => setMobileMenuOpen(false)}
        />
        <NavItem
          href="/add-property"
          icon={PlusCircle}
          label="Add Property"
          onClick={() => setMobileMenuOpen(false)}
        />
        <NavItem
          href="/saved"
          icon={Heart}
          label="Saved Properties"
          onClick={() => setMobileMenuOpen(false)}
        />
        <NavItem
          href="/profile"
          icon={User}
          label="Profile"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="border-t border-gray-200/50 dark:border-gray-800/50 my-3"></div>
        <AuthButtons
          setMobileMenuOpen={setMobileMenuOpen}
          authChecked={authChecked}
          onLogout={onLogout}
        />
      </div>
    </div>
  );

// Main Header Component
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
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const handleLogout = () => {
    logOutUser();
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center space-x-10">
              <NavItem href="/properties" icon={Search} label="Browse" />
              <NavItem
                href="/add-property"
                icon={PlusCircle}
                label="Add Property"
              />
              <NavItem href="/saved" icon={Heart} label="Saved" />
              <NavItem href="/profile" icon={User} label="Profile" />
            </nav>
            <div className="flex items-center space-x-4">
              <ThemeToggle
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
              <AuthButtons
                authChecked={authChecked}
                onLogout={handleLogout}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 relative">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center space-x-2">
              <ThemeToggle
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
              <MobileMenuToggle
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            </div>
          </div>
        </div>
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          authChecked={authChecked}
          onLogout={handleLogout}
        />
      </header>
    </>
  );
}
