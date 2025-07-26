'use client';

import React from 'react';
import Flexible from '../UI/FlexibleCard';
import { useTranslations } from 'next-intl';



const FlexibleSection = () => {
  const t = useTranslations('Flexible');
  const features = [
    {
      title: t('flexible-0-title'),
      description: t('flexible-0-description'),
      image: '/file.png',
      reverse: false,
    },
    {
      title: t('flexible-1-title'),
      description: t('flexible-1-description'),
      image: '/flexible.png',
      reverse: true,
    },
  ];
  return (
    <section id='flexibility' className="bg-lightColor py-24 space-y-24 dark:bg-darkColor">
      {features.map((feature, index) => (
        <Flexible
          key={index}
          title={feature.title}
          description={feature.description}
          image={feature.image}
          reverse={feature.reverse}
        />
      ))}
    </section>
  );
};

export default FlexibleSection;
