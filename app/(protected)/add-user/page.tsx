'use client';

import Image from "next/image";
import AddSubUserForm from "@/component/Forms/AddSubUserForm";
import {useRouter} from "next/navigation";
import { ArrowLeft } from 'lucide-react';

export default function UsersPage() {
    const router = useRouter();
    return (
        <div className="relative flex flex-col md:flex-row w-full min-h-screen bg-[#F8F9FB] dark:bg-darkBg overflow-hidden">

            {/* ✅ Full Background Image */}
            <Image
                src="/bgForm.jpg"
                alt="Background"
                fill
                className="object-cover object-center opacity-20 z-0"
                priority
            />
            {/* 🔙 Back Button */}
            <button
                onClick={() => router.back()}
                className="absolute z-50 left-4 top-4 text-gray-500 hover:text-blue-600 transition flex items-center gap-1"
                aria-label="Back"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
            </button>
            {/*  Foreground content (form + image) */}
            <div className="relative z-10 flex flex-col md:flex-row w-full">


                {/* Left side - Decorative Image */}
                <div className="hidden relative w-full h-64 md:h-auto order-1 md:order-none md:flex items-center justify-center">
                    <Image
                        src="/companyBg.png"
                        alt="Decorative"
                        width={500}
                        height={400}
                        className="object-cover w-[800px] ml-20"
                        priority
                    />
                </div>

                {/* Right side - Form */}
                <div className="w-full flex items-center justify-center p-8">
                    <div className="w-full max-w-md  rounded-xl p-6  ">
                        <AddSubUserForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
