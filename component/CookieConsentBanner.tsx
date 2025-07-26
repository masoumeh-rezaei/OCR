'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { loadAnalytics } from '@/lib/loadTracking';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react'; // اگر lucide-react نصب داری

const CookieConsentBanner = () => {
    const t = useTranslations('cookieBanner');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = Cookies.get('cookie_consent');
        if (!consent) {
            setTimeout(() => setIsVisible(true), 300);
        } else if (consent === 'true') {
            loadAnalytics();
        }
    }, []);

    const handleAccept = () => {
        Cookies.set('cookie_consent', 'true', { expires: 365 });
        loadAnalytics();
        setIsVisible(false);
    };

    const handleReject = () => {
        Cookies.set('cookie_consent', 'false', { expires: 365 });
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm">
                    <motion.div
                        className="bg-white w-full sm:max-w-md mx-4 rounded-2xl p-6 shadow-2xl border border-gray-200"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 80 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <ShieldCheck className="text-green-600 mt-1" />
                            <p className="text-gray-800 text-sm leading-relaxed">
                                {t('message')}
                            </p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition"
                            >
                                {t('reject')}
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                            >
                                {t('accept')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsentBanner;
