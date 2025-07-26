import { useEffect, useState } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

export function useBreakpoint() {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

    useEffect(() => {
        const calculateBreakpoint = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setBreakpoint("mobile");
            } else if (width >= 768 && width < 1024) {
                setBreakpoint("tablet");
            } else {
                setBreakpoint("desktop");
            }
        };

        calculateBreakpoint();
        window.addEventListener("resize", calculateBreakpoint);
        return () => window.removeEventListener("resize", calculateBreakpoint);
    }, []);

    return {
        breakpoint,
        isMobile: breakpoint === "mobile",
        isTablet: breakpoint === "tablet",
        isDesktop: breakpoint === "desktop",
    };
}
