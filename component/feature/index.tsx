'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import FeatureRow from '../UI/FeatureBlocks';
import SectionTitle from '../UI/Title';
import { useTranslations } from 'next-intl';

const Features: React.FC = () => {
    const t = useTranslations('features');
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const imageScaleCenter = useTransform(scrollYProgress, [0, 1], [1.2, 0.8]);

    return (
        <section
            id="features"
            ref={sectionRef}
            className="py-32 bg-[#F8F9FB] dark:bg-darkColor overflow-x-hidden"
        >
            <SectionTitle className="text-center text-darkblue dark:text-white hidden lg:block">
                {t('title')}
            </SectionTitle>
            <SectionTitle className="text-center text-darkblue dark:text-white lg:hidden block">
                {t('title-mobile')}
            </SectionTitle>

            <motion.div
                style={{
                    scale: imageScaleCenter,
                    willChange: 'transform',
                    transformOrigin: 'center',
                }}
                className="flex justify-center mb-24"
            >
                <Image
                    src="/bigPic.jpg"
                    alt="App Demo"
                    width={800}
                    height={500}
                    className="rounded-xl shadow-xl"
                />
            </motion.div>

            <FeatureRow
                image="/phone1.png"
                title={t('features-0-title')}
                description={t('features-0-description')}
                scrollYProgress={scrollYProgress}
                direction="left"
            />

            <FeatureRow
                image="/phone2.png"
                title={t('features-1-title')}
                description={t('features-1-description')}
                scrollYProgress={scrollYProgress}
                direction="right"
                reverse
            />
        </section>
    );
};

export default Features;
