'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string; // ✅ کلاس دلخواه
};

const SectionTitle = ({ children, className = '' }: Props) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <motion.h2
      ref={ref}
      style={{ scale }}
      className={`
        text-xl
        sm:text-3xl
        md:text-4xl
        font-extrabold 
        leading-tight 
        mb-16 
        text-center 
        text-[#0f3460] dark:text-lightColor
        ${className}  /* ✅ اینجا کلاس سفارشی رو اضافه می‌کنیم */
      `}
    >
      {children}
    </motion.h2>
  );
};

export default SectionTitle;
