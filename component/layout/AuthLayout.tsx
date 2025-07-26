'use client';

import { ReactNode, memo } from 'react';
import Header from '@/component/Header/header';
import Footer from '@/component/footer';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface Props {
    children: ReactNode;
    title: string;
    icon?: ReactNode;
    backgroundCircles?: ReactNode;
    titleKey?: string;
    bottomTextKey?: string;
    bottomLinkHref?: string;
    bottomLinkTextKey?: string;
}

function AuthLayout({ children, title, icon, backgroundCircles }: Props) {
    const router = useRouter();

    return (
        <div className="min-h-screen w-full">
            <Header />

            {/* ✅ Desktop Layout */}
            <div className="hidden lg:flex h-screen w-full bg-gradient-to-b from-blue-950 to-darkblue dark:from-[#0a2540] dark:via-[#0b2e53] dark:to-[#020c1b]">
                <div className="flex w-[75%] bg-white dark:bg-transparent m-auto h-[80%] rounded-lg">
                    <div className="w-1/2 relative flex items-center justify-center overflow-hidden rounded-lg">
                        {backgroundCircles}
                    </div>
                    <div className="w-1/2 flex items-center justify-center px-10">
                        <div className="w-full max-w-md p-10 rounded-xl relative">
                            {/* Back Button */}
                            <button
                                onClick={() => router.back()}
                                className="absolute left-0 top-0 text-gray-500 hover:text-blue-600 transition"
                                aria-label="Back"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>

                            <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-white text-center">
                                {title}
                            </h2>
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Tablet Layout */}
            <div className="hidden sm:flex lg:hidden h-screen w-full dark:bg-gradient-to-br dark:from-[#0a2540] dark:via-[#0b2e53] dark:to-[#020c1b] bg-gradient-to-b from-blue-950 to-darkblue">
                <div className="flex w-[75%] dark:bg-transparent bg-white m-auto h-[80%] rounded-lg">
                    <div className="w-full flex items-center justify-center px-10 relative">
                        <div className="w-full max-w-md rounded-xl p-10 relative">
                            {/* Back Button */}
                            <button
                                onClick={() => router.back()}
                                className="absolute left-0 top-0 text-gray-500 hover:text-blue-600 transition"
                                aria-label="Back"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>

                            <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-white text-center">
                                {title}
                            </h2>
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Mobile Layout */}
            <div className="flex sm:hidden flex-col items-center min-h-screen bg-white">

                <div className="relative w-full bg-[#1e4e78] text-center overflow-hidden pt-24 pb-40 dark:bg-gradient-to-br dark:from-[#0a2540] dark:via-[#0b2e53] dark:to-[#020c1b]">
                    <div className="flex justify-center mt-6">
                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="absolute left-3 top-15 text-white  transition"
                            aria-label="Back"
                        >
                            <ArrowLeft className="w-8 h-8" />
                        </button>
                        <div className="bg-[#48a1bd] dark:bg-darkColor p-3 rounded-full shadow-lg">
                            {icon}

                        </div>
                    </div>
                    <h1 className="text-white text-2xl font-bold mt-2">{title}</h1>

                    <svg
                        className="absolute bottom-0 left-0 w-full"
                        viewBox="0 0 1440 320"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="#ffffff"
                            d="M0,160 C480,320 960,0 1440,160 L1440,320 L0,320 Z"
                        />
                    </svg>
                </div>

                <div className="-mt-[120px] px-4 w-full max-w-md z-10">
                    <div className="bg-white dark:bg-darkblue p-6 rounded-xl shadow relative">

                        {children}

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default memo(AuthLayout);
