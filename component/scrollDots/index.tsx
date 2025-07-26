'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowRoundDown } from "react-icons/io";
import { useTranslations } from 'next-intl';



const ScrollDots: React.FC = () => {
  const t = useTranslations("scrollDots");
  const sections = [
    { id: 'hero', title: t('scroll-intro') },
    { id: 'how-it-works', title: t('scroll-how-it-works') },
    { id: 'AI', title: t('scroll-AI') },
    { id: 'flexibility', title: t('scroll-flexibility') },
    { id: 'features', title: t('scroll-features') },
  ];
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);


  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-5">
      {sections.map((section) => (
  <motion.div
    key={section.id}
    className="relative group cursor-pointer"
    onClick={() => handleClick(section.id)}
    onMouseEnter={() => setHoveredId(section.id)}
    onMouseLeave={() => setHoveredId(null)}
    whileHover={{ scale: 1.1 }}
  >
    {/* دایره اصلی */}
    <div
      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
        activeId === section.id ? 'bg-[#0f3460] scale-125' : 'bg-gray-400'
      } group-hover:bg-[#0f3460]`}
    />

    {/* Tooltip – فعال یا روی هاور (به‌جز hero) */}
    <AnimatePresence>
      {((activeId === section.id || hoveredId === section.id) && section.id !== 'hero') && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 12 }}
          exit={{ opacity: 0, x: 10 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 dark:bg-slate-300 dark:text-darkColor bg-white shadow-lg dark:shadow-sky-100/10 px-2 py-1 text-xs rounded-md whitespace-nowrap text-[#0f3460] font-medium z-40"
        >
          {section.title}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
))}


      {/* افکت اسکرول پایین دکمه‌ها */}
      <motion.div
        className=" flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* پالس نور پایین */}
        <motion.div
          className=" text-[#0f3460] dark:text-lightColor rounded-full  animate-bounce"
          
        ><IoIosArrowRoundDown className='w-5 h-5'/></motion.div>
        

        {/* متن scrollen */}
        <div className="text-xs text-[#0f3460]/80 font-semibold tracking-wider dark:text-lightColor">{t('scroll-scrollen')}</div>
      </motion.div>
    </div>
  );
};

export default ScrollDots;
