'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiMenuAlt1, HiMenuAlt3, HiUser, HiLogout } from 'react-icons/hi';
import clsx from 'clsx';
import ResponsiveMenue from './responsiveMenue';
import { useTranslations } from 'next-intl';
import DarkModeToggle from './DarkModeToggle';
import LanguageDropdown from '@/component/Header/LanguageDropdown';
import { useAuth } from '@/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '@/lib/api/auth';

const Header = () => {
  const pathname = usePathname();
  const t = useTranslations('Header');
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      router.push('/login');
    },
  });


  const menus = useMemo(
      () => [
        { id: 1, name: t('home'), link: '/' },
        { id: 2, name: t('about'), link: '#about' },
        { id: 3, name: t('menu'), link: '#menu' },
        { id: 4, name: t('impressum'), link: '/impressum' },
        { id: 5, name: t('datenschutz'), link: '/datenschutz' },
      ],
      [t]
  );

  const toggleMenu = useCallback(() => setShowMenu((prev) => !prev), []);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
      <div>
        <div
            className={clsx(
                'w-full fixed z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-darkColor/5 dark:bg-darkColor/10 backdrop-blur-md shadow-sm'
                    : 'bg-lightColor dark:bg-darkColor border-b border-b-darkblue'
            )}
        >
          <div className="mx-auto flex justify-between items-center py-2 px-6 md:px-10">
            {/* لوگو */}
            <div className="flex items-center dark:text-white">
              <p className="text-3xl font-bold">Taxnify</p>
              <small className="ml-2 text-sm">AI</small>
            </div>

            {/* منو دسکتاپ */}
            <ul className="hidden lg:flex items-center gap-8 text-md font-medium tracking-wide text-gray-700 dark:text-gray-200">
              {menus.map((menu) => {
                const isHovered = hoveredId === menu.id;
                const isActive = pathname === menu.link;
                return (
                    <li
                        key={menu.id}
                        onMouseEnter={() => setHoveredId(menu.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                      <Link
                          href={menu.link}
                          className={clsx(
                              'transition-all duration-300',
                              isHovered
                                  ? 'text-black scale-105 dark:text-white'
                                  : hoveredId !== null
                                      ? 'text-gray-300 dark:text-gray-500'
                                      : isActive
                                          ? 'text-blue-500 font-semibold'
                                          : 'hover:text-blue-500'
                          )}
                      >
                        {menu.name}
                      </Link>
                    </li>
                );
              })}
            </ul>

            {/* بخش سمت راست */}
            <div className="flex items-center gap-3">
              <LanguageDropdown />
              <DarkModeToggle />

                {isLoading ? (
                    <span className="text-sm text-gray-400 hidden lg:flex">Loading...</span>
                ) : isAuthenticated ? (
                    <button
                        onClick={() => logoutMutation.mutate()}
                        className="text-sm items-center gap-1 hover:text-red-600 text-red-500 hidden lg:flex"
                    >
                        <HiLogout className="w-5 h-5" />
                        Logout
                    </button>
                ) : (
                    <Link
                        href="/login"
                        className="text-sm items-center gap-1 hover:text-blue-600 dark:text-white hidden lg:flex"
                    >
                        <HiUser className="w-5 h-5" />
                        Login
                    </Link>
                )}

                {/* منو موبایل */}
              <div className="lg:hidden flex items-center gap-2">
                {showMenu ? (
                    <HiMenuAlt1 className="cursor-pointer w-6 h-6 dark:text-white" onClick={toggleMenu} />
                ) : (
                    <HiMenuAlt3 className="cursor-pointer w-6 h-6 dark:text-white" onClick={toggleMenu} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* فقط وقتی نمایش داده بشه رندر می‌شه */}
        {showMenu && (
            <ResponsiveMenue showMenue={showMenu} setShowMenue={setShowMenu} />
        )}
      </div>
  );
};

export default Header;
