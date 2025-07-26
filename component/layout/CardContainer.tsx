// components/ui/CardContainer.tsx

import { ReactNode } from 'react';

interface CardContainerProps {
    children: ReactNode;
    icon?: ReactNode;
    iconBgColor?: string;
}


export default function CardContainer({ children, icon, iconBgColor }: CardContainerProps) {
    return (
        <div className="mt-5 relative h-full bg-white rounded-2xl p-5 shadow-md w-full max-w-sm sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-sm mx-auto text-left dark:bg-darkSlider">
            {/* Badge Icon */}
            <div className={`absolute -top-5 left-5 rounded-full w-10 h-10 flex items-center justify-center text-white shadow-md ${iconBgColor ?? 'bg-blue-300'}`}>
                {icon ?? <span> 📱 </span>}
            </div>

            <div className="mt-6 space-y-3">
                {children}
            </div>
        </div>
    );
}

