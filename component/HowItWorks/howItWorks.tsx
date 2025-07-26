'use client';

import React from 'react';
import { FaUpload, FaCog, FaFolderOpen } from 'react-icons/fa';
import SectionTitle from '../UI/Title';
import StepCard from '../UI/StepCard';
import { useTranslations } from 'next-intl';

const HowItWorks: React.FC = () => {
  const t = useTranslations("HowItWorks");

  const steps = [
    {
      icon: <FaUpload className="w-6 h-6 text-[#0f3460] dark:text-lightColor" />,
      title: t('steps-upload-title'),
      image: '/upload1.jpg',
      description: t('steps-upload-description'),
    },
    {
      icon: <FaCog className="text-4xl text-darkblue" />,
      title: t('steps-analysis-title'),
      image: '/ai-anelize.jpg',
      description: t('steps-analysis-description'),
      highlighted: true,
    },
    {
      icon: <FaFolderOpen className="w-6 h-6 text-[#0f3460] dark:text-lightColor" />,
      title: t('steps-organized-title'),
      image: '/ai-orgenized.jpg',
      description: t('steps-organized-description'),
    },
  ];

  return (
      <section
          id="how-it-works"
          className="py-24 bg-[#F8F9FB] dark:bg-darkColor text-gray-800 dark:text-white"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <SectionTitle>{t('title')}</SectionTitle>

          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
                <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>
  );
};

export default HowItWorks;
