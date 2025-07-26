'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface FeatureRowProps {
    image: string;
    title: string;
    description: string;
    scrollYProgress: MotionValue<number>;
    direction?: 'left' | 'right';
    reverse?: boolean;
    className?: string;
}

const FeatureRow: React.FC<FeatureRowProps> = ({
                                                   image,
                                                   title,
                                                   description,
                                                   scrollYProgress,
                                                   direction = 'left',
                                                   reverse = false,
                                                   className = '',
                                               }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Always call hooks unconditionally
    const initialX = direction === 'left' ? 150 : -150;
    const imageAnimateX = useTransform(scrollYProgress, [0, 1], [initialX, 0]);
    const titleScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.1]);

    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isMounted) return null;

    return (
        <div
            className={clsx(
                'max-w-7xl mx-auto px-6 flex items-center gap-10 md:gap-16 mb-24',
                reverse ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row',
                className
            )}
        >
            {/* 📷 Image */}
            {isMobile ? (
                <motion.div
                    initial={{ opacity: 0, x: direction === 'left' ? 100 : -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="w-full flex justify-center"
                >
                    <Image
                        src={image}
                        alt={title}
                        width={300}
                        height={400}
                        className="rounded-lg"
                        loading="lazy"
                    />
                </motion.div>
            ) : (
                <motion.div
                    style={{ x: imageAnimateX }}
                    className={clsx(
                        'w-full md:w-1/2 flex will-change-transform',
                        reverse ? 'justify-end' : 'justify-start'
                    )}
                >
                    <Image
                        src={image}
                        alt={title}
                        width={300}
                        height={400}
                        className="rounded-lg"
                        loading="lazy"
                    />
                </motion.div>
            )}

            {/* ✏️ Text */}
            {isMobile ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="w-[90%] md:w-1/2 text-center md:text-left"
                >
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0f3460] dark:text-lightTitle mb-4">
                        {title}
                    </h3>
                    <p className="text-gray-700 dark:text-lightColor text-lg">{description}</p>
                </motion.div>
            ) : (
                <motion.div
                    style={{
                        scale: titleScale,
                        transformOrigin: 'left center',
                        willChange: 'transform',
                    }}
                    className="w-[90%] md:w-1/2"
                >
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0f3460] dark:text-lightTitle mb-4">
                        {title}
                    </h3>
                    <p className="text-gray-700 dark:text-lightColor text-lg">{description}</p>
                </motion.div>
            )}
        </div>
    );
};

export default FeatureRow;
