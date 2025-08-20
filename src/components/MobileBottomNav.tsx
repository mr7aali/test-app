
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      icon: 'ri-home-line',
      activeIcon: 'ri-home-fill',
      label: 'Home'
    },
    {
      href: '/properties',
      icon: 'ri-building-line',
      activeIcon: 'ri-building-fill',
      label: 'Properties'
    },
    {
      href: '/saved',
      icon: 'ri-heart-line',
      activeIcon: 'ri-heart-fill',
      label: 'Saved'
    },
    {
      href: '/add-property',
      icon: 'ri-add-circle-line',
      activeIcon: 'ri-add-circle-fill',
      label: 'Add Property'
    },
    {
      href: '/profile',
      icon: 'ri-user-line',
      activeIcon: 'ri-user-fill',
      label: 'Profile'
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="grid grid-cols-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-colors cursor-pointer min-h-[60px] ${
                isActive
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center mb-1">
                <i className={`${isActive ? item.activeIcon : item.icon} text-lg`}></i>
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
