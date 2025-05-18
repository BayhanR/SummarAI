'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative w-10 h-10"
      aria-label="Tema değiştir"
    >
      <div className="relative w-full h-full">
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            theme === 'dark'
              ? 'opacity-100 transform rotate-0'
              : 'opacity-0 transform rotate-90'
          }`}
        >
          <FiSun className="w-5 h-5" />
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            theme === 'dark'
              ? 'opacity-0 transform -rotate-90'
              : 'opacity-100 transform rotate-0'
          }`}
        >
          <FiMoon className="w-5 h-5" />
        </div>
      </div>
    </button>
  );
} 