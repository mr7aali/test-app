"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  HomeIcon,
  Building,
  Building2,
  Heart,
  HeartHandshake,
  PlusCircle,
  User,
  User2,
} from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      icon: Home,
      activeIcon: HomeIcon, // slightly bolder look
      label: "Home",
    },
    {
      href: "/properties",
      icon: Building,
      activeIcon: Building2,
      label: "Properties",
    },
    {
      href: "/saved",
      icon: Heart,
      activeIcon: HeartHandshake,
      label: "Saved",
    },
    {
      href: "/add-property",
      icon: PlusCircle,
      activeIcon: PlusCircle, // same icon, just color change
      label: "Add Property",
    },
    {
      href: "/profile",
      icon: User,
      activeIcon: User2,
      label: "Profile",
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="grid grid-cols-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-colors cursor-pointer min-h-[60px] ${
                isActive
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center mb-1">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium leading-tight text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
