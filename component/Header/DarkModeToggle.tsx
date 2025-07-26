'use client';

import { useEffect, useState } from 'react';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import clsx from 'clsx';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={clsx(
        "relative w-15 lg:w-17 h-8 rounded-full transition-colors duration-300",
        isDark ? "bg-gray-700" : "bg-darkColor"
      )}
      aria-label="Toggle Dark Mode"
    >
      <span
        className={clsx(
          "absolute top-0.5 left-0.5 w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform duration-300",
          isDark
            ? "translate-x-7 lg:translate-x-9 bg-gray-900 "
            : "translate-x-0 bg-white text-yellow-950"
        )}
      >
        {isDark ? <BsMoonFill size={16} /> : <BsSunFill size={16} />}
      </span>
    </button>
  );
};

export default DarkModeToggle;
