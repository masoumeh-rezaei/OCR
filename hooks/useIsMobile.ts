// hooks/useIsMobile.ts
import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState<null | boolean>(null);

    useEffect(() => {
        const update = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        update();
        window.addEventListener('resize', update);

        return () => window.removeEventListener('resize', update);
    }, [breakpoint]);

    return isMobile;
}
