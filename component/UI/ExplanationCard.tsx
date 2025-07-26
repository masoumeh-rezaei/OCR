'use client';

import {
    motion,
    useTransform,
    MotionValue,
    useAnimation,
} from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { GiSeaStar } from 'react-icons/gi';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import { useMediaQuery } from 'usehooks-ts';

interface Props {
    image: string | StaticImageData;
    title: string;
    description: string;
    index: number;
    scrollYProgress: MotionValue<number>;
}

function useClientReady() {
    const [isReady, setReady] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setReady(true), 10);
        return () => clearTimeout(timeout);
    }, []);
    return isReady;
}

const ExplanationCard: React.FC<Props> = ({
                                              image,
                                              title,
                                              description,
                                              index,
                                              scrollYProgress,
                                          }) => {
    const isEven = index % 2 === 1;
    const isMdUp = useMediaQuery('(min-width: 768px)');
    const isClient = useClientReady();

    const xTransform = useTransform(
        scrollYProgress,
        [0, 1],
        isEven ? [200, -200] : [-200, 200]
    );

    const ref = useRef<HTMLDivElement>(null);
    const controls = useAnimation();

    const initialX = useMemo(() => (index % 2 === 1 ? 200 : -200), [index]);

    useEffect(() => {
        if (!isMdUp && isClient && ref.current) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        void controls.start({ opacity: 1, x: 0 });
                    } else {
                        void controls.start({ opacity: 0, x: initialX });
                    }
                },
                { threshold: 0.4 }
            );

            observer.observe(ref.current);
            return () => observer.disconnect();
        }
    }, [isClient, isMdUp, controls, initialX]);



    if (!isClient) return <div style={{ height: 0 }} />;

    return (
        <div
            className={clsx(
                'flex flex-col md:flex-row items-center justify-center gap-10',
                isEven && 'md:flex-row-reverse'
            )}
        >
            {/* Image Section */}
            <motion.div
                ref={ref}
                style={isMdUp ? { x: xTransform, opacity: 1 } : undefined}
                initial={!isMdUp ? { opacity: 0, x: isEven ? 200 : -200 } : undefined}
                animate={!isMdUp ? controls : undefined}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="w-full md:w-1/3 flex justify-center"
            >

            <div className="relative w-2/3 md:w-full overflow-hidden">
                    <div className="absolute top-3 left-3 z-10 p-2 rounded-full">
                        <GiSeaStar className="text-blue-500 dark:text-lightColor" size={28} />
                    </div>
                    <div className="absolute bottom-3 right-3 z-10 p-2">
                        <GiSeaStar className="text-[#0f3460] dark:text-lightColor" size={28} />
                    </div>

                    <Image
                        src={image}
                        alt={title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-auto rounded-lg"
                        priority
                    />
                </div>
            </motion.div>

            {/* Text Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 0.3 }}
                className={clsx('w-full md:w-1/2 text-center md:text-left', index === 2 && 'md:ml-20')}
            >
                <h3 className="text-2xl font-bold text-[#0f3460] mb-4 dark:text-lightTitle">
                    {title}
                </h3>
                <p className="text-gray-700 dark:text-lightColor text-lg leading-relaxed">
                    {description}
                </p>
            </motion.div>
        </div>
    );
};

export default ExplanationCard;
