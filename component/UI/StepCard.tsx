'use client';

import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';
import React from "react";

type Step = {
  icon: React.ReactNode;
  title: string;
  image: StaticImageData | string;
  description: string;
  highlighted?: boolean;
};

type Props = {
  step: Step;
  index: number;
};

const StepCard: React.FC<Props> = ({ step }) => {
  const { icon, title, image, description, highlighted } = step;

  return (
      <div
          className={clsx(
              'relative rounded-tr-4xl rounded-bl-4xl p-6 flex flex-col items-center text-center',
              highlighted
                  ? 'bg-[#0f3460] text-white dark:bg-lightBox dark:text-darkColor'
                  : 'bg-white text-[#0f3460] dark:bg-darkColor dark:text-white'
          )}
      >
        {/* Highlighted Icon */}
        {highlighted && (
            <div className="absolute -top-8 z-10">
              <div className="w-20 h-20 bg-lightblue text-black dark:bg-blue-200 rounded-full flex items-center justify-center">
                {icon}
              </div>
            </div>
        )}

        {/* Image Section */}
        <div className={clsx('w-full mb-4', highlighted && 'mt-10 mb-6')}>
          <Image
              src={image}
              alt={title}
              className="rounded-xl w-full object-cover"
              width={400}
              height={300}
              priority
          />
        </div>

        {/* Title & Icon */}
        <div className="mb-3 flex flex-col items-center">
          {!highlighted && (
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0f3460]/10 dark:bg-white/10 mb-2">
                {icon}
              </div>
          )}
          <h3 className={clsx('font-semibold', highlighted ? 'text-xl mb-6' : 'text-lg')}>
            {title}
          </h3>
        </div>

        {/* Description */}
        <p
            className={clsx(
                'leading-relaxed text-sm md:text-base',
                highlighted
                    ? 'text-white/90 dark:text-darkColor'
                    : 'text-gray-600 dark:text-gray-300'
            )}
        >
          {description}
        </p>
      </div>
  );
};

export default StepCard;
