'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  LogOut,
  Calendar,
  FileText,
  Settings,
  Users,
  MessageSquare,
  Grid,
  Map,
  Puzzle,
} from 'lucide-react';
import clsx from 'clsx';

import LanguageDropdown from '@/component/Header/LanguageDropdown';
import { logoutUser } from '@/lib/api/auth';
import { Tooltip } from '@mui/material';
import DarkModeToggleSlider from '@/component/Header/DarkModeToggleSlider';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import SettingTab from "@/component/setting/SettingTab";
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const { isMobile, isTablet } = useBreakpoint();
  const isMobileOrTablet = isMobile || isTablet;

  const { user } = useAuth();
  const role = user?.role;

  const collapsed = isTablet && !isOpen;
  const expanded = !isTablet || isOpen;

  const navSections = useMemo(() => [
    {
      title: 'Main',
      items: [
        { icon: <Grid size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <Calendar size={20} />, label: 'Explorer', path: '/explorer' },
        ...(role === 'superadmin'
            ? [{ icon: <FileText size={20} />, label: 'User', path: '/user' }]
            : []),
      ],
    },
    {
      title: 'Communication',
      items: [
        { icon: <MessageSquare size={20} />, label: 'Messages', path: '/messages' },
        { icon: <Users size={20} />, label: 'Team Member', path: '/team' },
      ],
    },
    {
      title: 'More',
      items: [
        { icon: <Map size={20} />, label: 'Roadmap', path: '/roadmap' },
        { icon: <Settings size={20} />, label: 'Setting', path: '/setting' },
        { icon: <Puzzle size={20} />, label: 'Upgrade plan', path: '/plans' },
      ],
    },
  ], [role]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
          sidebarRef.current &&
          !sidebarRef.current.contains(e.target as Node) &&
          isOpen &&
          isMobileOrTablet
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMobileOrTablet]);

  useEffect(() => {
    document.body.style.overflow = isOpen && isMobileOrTablet ? 'hidden' : '';
  }, [isOpen, isMobileOrTablet]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logoutUser();
    router.push('/login');
  };

  return (
      <>
        {isMobileOrTablet && (
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-1.5 left-4 z-50 bg-primary dark:text-white text-black rounded-md block lg:hidden"
                aria-expanded={isOpen}
            >
              {!isOpen && <Menu size={24} />}
            </button>
        )}

        {/* Tablet/Desktop Sidebar */}
        <motion.div
            ref={sidebarRef}
            initial={{ width: collapsed ? 80 : 260 }}
            animate={{ width: collapsed ? 80 : 260 }}
            transition={{ duration: 0.2 }}
            className={clsx(
                'hidden md:flex flex-col h-screen fixed top-0 left-0 bg-white dark:bg-darkSlider shadow-md z-40 overflow-hidden'
            )}
        >
          <div className="relative p-4 border-b border-blue dark:text-white font-bold text-xl flex items-center justify-between">
            {expanded && <span>Taxnify</span>}
            {isTablet && isOpen && (
                <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X size={20} className="text-gray-800 dark:text-white" />
                </button>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
            {navSections.map((section) => (
                <div key={section.title}>
                  {expanded && (
                      <p className="text-gray-400 uppercase text-xs px-3 mb-1">{section.title}</p>
                  )}
                  {section.items.map((item) => {
                    const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
                    return (
                        <Tooltip key={item.label} title={collapsed ? item.label : ''} placement="right" arrow>
                          <button
                              onClick={() => {
                                if (item.path === '/setting') {
                                  setOpenModal(true);
                                } else {
                                  router.push(item.path);
                                }
                              }}
                              className={clsx(
                                  'flex items-center gap-3 px-3 py-2 rounded-xl w-full text-left transition-all duration-200',
                                  isActive
                                      ? `${isTablet && !isOpen ? 'bg-transparent shadow-none dark:bg-transparent dark:text-lightblue' : 'bg-lightblue dark:bg-blue text-blue-800 dark:text-white shadow'}`
                                      : 'text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkSlider dark:hover:text-blue-400'
                              )}
                          >
                            {item.icon}
                            <span className={clsx(
                                'text-sm whitespace-nowrap transition-all duration-300',
                                collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 ml-2'
                            )}>
                        {item.label}
                      </span>
                          </button>
                        </Tooltip>
                    );
                  })}
                </div>
            ))}
          </nav>

          <div className="mt-auto px-3 py-3 border-t border-blue flex flex-row gap-4">
            <button
                onClick={handleLogout}
                className={clsx(
                    'flex items-center gap-3 text-sm text-darkText dark:text-gray-300 hover:text-blue',
                    collapsed && 'justify-center'
                )}
            >
              <LogOut size={20} />
              {!collapsed && <span>Logout</span>}
            </button>

            {!collapsed && (
                <div className="flex flex-col gap-y-2 justify-center items-center ml-20">
                  <LanguageDropdown direction="up" />
                  <DarkModeToggleSlider />
                </div>
            )}
          </div>
        </motion.div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobile && isOpen && (
              <motion.aside
                  ref={sidebarRef}
                  initial={{ x: -260 }}
                  animate={{ x: 0 }}
                  exit={{ x: -260 }}
                  transition={{ duration: 0.3 }}
                  className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-darkSlider shadow-lg z-50 flex flex-col"
              >
                <div className="flex items-center justify-between p-4 border-b border-blue">
                  <span className="font-bold dark:text-white text-xl">Taxnify</span>
                  <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <X size={20} className="text-gray-800 dark:text-white" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                  {navSections.flatMap((s) => s.items).map((item) => {
                    const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
                    return (
                        <button
                            key={item.label}
                            onClick={() => {
                              if (item.path === '/setting') {
                                setOpenModal(true);
                                setIsOpen(false);
                              } else {
                                router.push(item.path);
                              }
                            }}
                            className={clsx(
                                'flex items-center gap-3 px-3 py-2 rounded-xl w-full text-left transition-all duration-200',
                                isActive
                                    ? 'dark:text-white dark:bg-blue bg-lightblue'
                                    : 'text-gray-800 dark:text-gray-300 hover:bg-primary hover:text-blue'
                            )}
                        >
                          {item.icon}
                          <span className="text-sm">{item.label}</span>
                        </button>
                    );
                  })}
                </nav>
                <div className="border-t border-blue flex flex-row px-3 py-4 gap-y-3">
                  <button
                      onClick={handleLogout}
                      className="text-sm flex items-center gap-3 text-gray-800 dark:text-gray-300 hover:text-blue"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                  <div className="flex flex-col gap-y-3 pt-2 justify-center items-center ml-20">
                    <LanguageDropdown direction="up" />
                    <DarkModeToggleSlider />
                  </div>
                </div>
              </motion.aside>
          )}
        </AnimatePresence>

        {/* Settings Modal */}
        <SettingTab open={openModal} onCloseAction={() => setOpenModal(false)} />
      </>
  );
}
