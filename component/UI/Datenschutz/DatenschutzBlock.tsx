'use client';

import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  title?: string;
  text: string;
  delay: number;
};

const DatenschutzBlock = ({ title, text, delay }: Props) => (
  <motion.div
    initial={{ opacity: 0, x: title ? 40 : -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, delay }}
    viewport={{ once: true }}
  >
    {title && (
      <h2 className="text-xl font-extrabold text-[#e8cd7a] border-l-4 border-[#e8cd7a] pl-3 mb-3 dark:text-darkFooter dark:border-darkFooter">
        {title}
      </h2>
    )}
    <p>{text}</p>
  </motion.div>
);

export default DatenschutzBlock;
