'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionWrapper from './SectionWrapper';
import DatenschutzBlock from './DatenschutzBlock';
import DatenschutzListBlock from './DatenschutzListBlock';

const DatenschutzClient = () => {
  const t = useTranslations('datenschutz');
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <SectionWrapper ref={sectionRef} scale={scale} opacity={opacity} y={translateY}>
      <h1 className="text-xl md:text-2xl font-extrabold text-[#e8cd7a] border-l-4 border-[#e8cd7a] pl-3 mb-3 dark:text-darkFooter dark:border-darkFooter">
        {t('title')}
      </h1>

      <div className="space-y-8 text-base md:text-lg leading-relaxed text-gray-100 dark:text-darkFooter">
        <DatenschutzBlock delay={0.0} text={t('intro')} />

        <DatenschutzBlock delay={0.2} title={t('responsibleTitle')} text={t('responsibleText')} />

        <DatenschutzListBlock
          delay={0.3}
          title={t('dataCollectionTitle')}
          list={t.raw('dataCollectionList')}
          bottomText={t('dataCollectionNote')}
        />

        <DatenschutzBlock delay={0.4} title={t('legalBasisTitle')} text={t('legalBasisText')} />
        <DatenschutzBlock delay={0.5} title={t('disclosureTitle')} text={t('disclosureText')} />
        <DatenschutzBlock delay={0.6} title={t('cookiesTitle')} text={t('cookiesText')} />

        <DatenschutzListBlock
          delay={0.7}
          title={t('externalServicesTitle')}
          list={t.raw('externalServicesList')}
          bottomText={t('externalServicesNote')}
        />

        <DatenschutzBlock delay={0.8} title={t('securityTitle')} text={t('securityText')} />
        <DatenschutzBlock delay={0.9} title={t('rightsTitle')} text={t('rightsText')} />
        <DatenschutzBlock delay={1.0} title={t('updateTitle')} text={t('updateText')} />
      </div>
    </SectionWrapper>
  );
};

export default DatenschutzClient;
