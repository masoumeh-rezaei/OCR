'use client';

import { motion, MotionValue } from 'framer-motion';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
};

const SectionWrapper = React.forwardRef<HTMLElement, Props>(
  ({ children, scale, opacity, y }, ref) => {
    return (
      <section
        ref={ref}
        className="min-h-screen bg-[#F8F9FB] dark:bg-darkColor flex items-center justify-center px-6 py-24"
      >
        <motion.div
          style={{ scale, opacity, y }}
          className="max-w-4xl w-full bg-[#0f3460] text-white dark:text-darkFooter dark:bg-lightBox p-10 md:p-16 rounded-xl shadow-lg border border-gray-300"
        >
          {children}
        </motion.div>
      </section>
    );
  }
);

// انتخاب یک اسم برای استفاده در DevTools
SectionWrapper.displayName = 'SectionWrapper';

export default SectionWrapper;
