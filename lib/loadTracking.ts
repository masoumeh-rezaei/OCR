declare global {
    interface Window {
        umami?: (...args: unknown[]) => void;
    }
}

export const loadAnalytics = () => {
    if (document.getElementById('umami-script')) return;

    const script = document.createElement('script');
    script.src = 'https://analytics.taxnify.de/umami.js'; // ← دامنه Umami خودت
    script.async = true;
    script.defer = true;
    script.dataset.websiteId = 'your-umami-id'; // ← ID مخصوص سایتت از Umami
    script.id = 'umami-script';
    document.head.appendChild(script);
};
