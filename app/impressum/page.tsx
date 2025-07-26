'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

const Impressum = () => {
  const t = useTranslations('impressum');
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  // Helper برای تبدیل \n به <br/>
  const formatText = (text: string) =>
    text.split('\n').map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
        <br />
      </React.Fragment>
    ));

  return (
    <section
      ref={sectionRef}
      className="min-h-screen dark:bg-darkColor bg-[#F8F9FB] flex items-center justify-center px-6 py-24"
    >
      <motion.div
        style={{
          scale,
          opacity,
          y: translateY,
        }}
        className="max-w-3xl w-full bg-[#0f3460] dark:bg-lightBox dark:text-darkColor text-[#e8cd7a] p-10 md:p-16 rounded-xl shadow-lg border border-gray-300"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 border-b border-white/30 pb-4 dark:text-darkColor">
          {t('title')}
        </h1>

        <div className="space-y-8 text-base md:text-lg leading-relaxed">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-[#e8cd7a] text-lg mb-2 dark:text-darkFooter">
              {t('section1Title')}
            </h2>
            <p className="text-gray-100 dark:text-darkColor">
              {formatText(t('section1Text'))}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-[#e8cd7a] text-lg mb-2 dark:text-darkFooter">
              {t('section2Title')}
            </h2>
            <p className="text-gray-100 dark:text-darkFooter">
              {/* چون ایمیل جدا است، می‌توان آن را لینک کرد */}
              {formatText(
                t('section2Text').replace(
                  t('section2Email'),
                  ''
                )
              )}
              <a
                href={`mailto:${t('section2Email')}`}
                className="text-blue-200 underline dark:text-darkFooter"
              >
                {t('section2Email')}
              </a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-[#e8cd7a] text-lg mb-2 dark:text-darkFooter">
              {t('section3Title')}
            </h2>
            <p className="text-gray-100 dark:text-darkFooter">{t('section3Text')}</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Impressum;
