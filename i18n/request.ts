import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    const cookieLocale = (await cookies()).get('MYNEXTAPP_LOCALE')?.value || 'en';
    const locale = cookieLocale;

    console.log('[next-intl] Loaded locale from cookie:', locale); // 🟩 این لاگ

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});
