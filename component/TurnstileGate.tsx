'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

// تعریف turnstile برای TypeScript
declare global {
    interface Window {
        turnstile: {
            render: (
                container: HTMLElement,
                options: {
                    sitekey: string;
                    callback: (token: string) => void;
                    'expired-callback'?: () => void;
                    'error-callback'?: () => void;
                    theme?: 'light' | 'dark';
                }
            ) => string;
            reset: (widgetId?: string) => void;
        };
    }
}

export default function TurnstileGate() {
    const widgetRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const tokenRef = useRef<string>('');
    const [loaded, setLoaded] = useState(false);

    const verifyToken = async (token: string) => {
        const res = await fetch('/api/verify', {
            method: 'POST',
            body: new URLSearchParams({
                'cf-turnstile-response': token,
            }),
        });

        const result = await res.text();

        if (res.ok) {
            console.log('✅ تأیید موفق: در حال رفرش صفحه...');
            tokenRef.current = '';
            window.location.reload(); // این خط باعث میشه صفحه کامل دوباره لود شه
        } else {
            console.warn('❌ تأیید ناموفق:', result);
            if (window.turnstile && widgetIdRef.current) {
                window.turnstile.reset(widgetIdRef.current);
            }
        }
    };

    useEffect(() => {
        if (!loaded || !widgetRef.current || typeof window === 'undefined') return;

        console.log('🟢 Turnstile در حال بارگذاری...');

        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
            callback: (token: string) => {
                console.log('✅ توکن دریافتی:', token);
                tokenRef.current = token;
                verifyToken(token);
            },
            'expired-callback': () => {
                console.warn('⚠️ توکن منقضی شد. در حال reset...');
                if (window.turnstile && widgetIdRef.current) {
                    window.turnstile.reset(widgetIdRef.current);
                }
            },
            'error-callback': () => {
                console.error('❌ خطا در Turnstile');
            },
            theme: 'light',
        });
    }, [loaded]);

    return (
        <>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                async
                defer
                onLoad={() => {
                    console.log('🔃 اسکریپت Turnstile لود شد');
                    setLoaded(true);
                }}
            />
            <div
                ref={widgetRef}
                style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}
            />
        </>
    );
}
