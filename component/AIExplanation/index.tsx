'use client';

import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import SectionTitle from '../UI/Title';
import ExplanationCard from '../UI/ExplanationCard';
import { useTranslations } from 'next-intl';



const Category: React.FC = () => {
  const t = useTranslations('AIExplanation');
  const explanations = [

    {
      image: '/receipe1.png',
      title: t('ai-explanations-0-title'),
      description: t('ai-explanations-0-description'),
    },
    {
      image: '/receipe2.png',
      title: t('ai-explanations-1-title'),
      description: t('ai-explanations-1-description'),
    },
    {
      image: '/receipe3.png',
      title: t('ai-explanations-2-title'),
      description: t('ai-explanations-2-description'),
    },
  ];
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
      <section
          id="AI"
          ref={containerRef}
          className="py-24 bg-gray-100 dark:bg-darkColor transition-colors duration-500"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle className="text-center text-darkblue dark:text-white hidden lg:block">
            {t('ai-title')}
          </SectionTitle>
          <SectionTitle className="text-center text-darkblue dark:text-white lg:hidden block">
            {t('title-mobile')}
          </SectionTitle>

          <div className="space-y-32 mt-20">
            {explanations.map((explanation, index) => (
                <ExplanationCard
                    key={index}
                    image={explanation.image}
                    title={explanation.title}
                    description={explanation.description}
                    index={index}
                    scrollYProgress={scrollYProgress}
                />

            ))}
          </div>
        </div>
      </section>
  );
};

export default Category;