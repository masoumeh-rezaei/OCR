'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '../UI/Button';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations("Hero");
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-[#F8F9FB] dark:bg-darkColor text-gray-900 dark:text-white flex flex-col lg:flex-row items-center justify-center px-6 pt-[100px] lg:pt-0 transition-colors duration-300"
    >
      {/* متن سمت چپ */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-full lg:w-1/2 h-1/2 lg:h-screen flex items-center justify-center order-1"
      >
        <div className="max-w-xl text-center space-y-6 z-10 px-4 
         justify-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
          {t('title')} <br />
            <span className="text-[#0f3460] dark:text-yellowTitle font-bold">{t('subtitle')}</span>



          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            {t('description')  }
          </p>

          <div className="pt-4">
            <Link href="#upload">
            <Button className=" dark:bg-yellowTitle dark:hover:bg-yellowTitle/75 dark:text-black dark:font-bold ">
  {t('button')}
</Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* عکس سمت راست */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full lg:w-1/2 h-1/2 lg:h-auto flex justify-center items-center order-2 group"
      >
        <Image
          src={'/bill.png'}
          alt="AI Hero Image"
          width={500}
          height={500}
          className="object-cover rounded-tr-4xl rounded-bl-4xl transition-transform duration-1000 group-hover:scale-105 group-hover:rotate-1"
          priority
        />
      </motion.div>
    </section>
  );
};

export default Hero;
