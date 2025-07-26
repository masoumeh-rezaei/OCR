'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

type Props = {
  title: string;
  description: string;
  image: string | StaticImageData;
  reverse?: boolean;
};

const FlexibleCard: React.FC<Props> = ({ title, description, image, reverse = false }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  return (
    <div
      ref={ref}
      className="relative max-w-7xl mx-auto px-6 bg-[#0f3460] dark:bg-lightBox text-white rounded-3xl shadow-2xl overflow-visible flex items-center"
    >
      <div
        className={`flex flex-col-reverse ${
          reverse ? 'md:flex-row-reverse' : 'md:flex-row'
        } items-center gap-12 md:gap-24 py-8 px-6 md:px-16 lg:px-20 w-full`}
      >
        {/* متن */}
        <div className="w-full md:w-1/2 space-y-6 z-10 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight dark:text-darkColor">{title}</h2>
          <p className="text-lg leading-relaxed text-gray-200 dark:text-darkColor">{description}</p>
        </div>

        {/* عکس */}
        <motion.div style={{ scale }} className="w-full md:w-1/2 flex justify-center relative z-20">
          <div
            className={`md:absolute ${
              reverse ? 'md:-top-60 md:left-0' : 'md:-top-60 md:right-0'
            }`}
          >
            <Image
              src={image}
              alt={title}
              width={300}
              height={350}
              className="rounded-2xl object-contain w-2/3 md:w-full mx-auto"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlexibleCard;
