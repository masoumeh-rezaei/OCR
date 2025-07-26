'use client';

import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  title: string;
  list: string[];
  bottomText: string;
  delay: number;
};

const DatenschutzListBlock = ({ title, list, bottomText, delay }: Props) => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, delay }}
    viewport={{ once: true }}
  >
    <h2 className="text-xl font-extrabold text-[#e8cd7a] border-l-4 border-[#e8cd7a] pl-3 mb-3 dark:text-darkFooter dark:border-darkFooter">
      {title}
    </h2>
    <ul className="list-disc pl-6">
      {list.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
    <p className="mt-4">{bottomText}</p>
  </motion.div>
);

export default DatenschutzListBlock;
