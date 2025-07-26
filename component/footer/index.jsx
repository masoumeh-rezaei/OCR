'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer className="bg-[#0f3460] dark:bg-darkFooter text-white py-12 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* بخش اول: لوگو و توضیح */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('footer-app-name')}</h2>
          <p className="text-gray-300">
            {t('footer-description')}
          </p>
        </div>

        {/* بخش دوم: لینک‌های مفید */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('footer-quick-links')}</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">{t('footer-home')}</Link></li>
            <li><Link href="/features" className="hover:underline">{t('footer-features')}</Link></li>
            <li><Link href="/pricing" className="hover:underline">{t('footer-pricing')}</Link></li>
            <li><Link href="/contact" className="hover:underline">{t('footer-contact')}</Link></li>
          </ul>
        </div>

        {/* بخش سوم: تماس با ما */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('footer-contact-title')}</h3>
          <p className="text-gray-300">{t('footer-email')}</p>
          <p className="text-gray-300 mt-2">{t('footer-address')}</p>
        </div>
      </div>

      {/* خط پایین فوتر */}
      <div className="border-t border-gray-600 mt-12 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} {t('footer-app-name')}. {t('footer-rights')}
      </div>
    </footer>
  );
};

export default Footer;
