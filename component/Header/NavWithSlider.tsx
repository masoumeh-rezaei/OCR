'use client';

import { Bell, Search, User } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className=" hidden md:fixed top-0 left-0 right-0   items-center justify-between px-6 py-3 shadow-sm bg-white">
            {/* Logo – فقط در دسکتاپ */}
            <div className="hidden md:block text-xl font-semibold text-blue-600">
                Boardto
            </div>

            {/* Search bar – فقط در دسکتاپ */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search ..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-6 ml-auto">
                {/* Notification with badge – فقط در دسکتاپ */}
                <div className="relative cursor-pointer hidden md:block">
                    <Bell className="w-6 h-6 text-gray-600" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
                </div>

                {/* User icon with name – همیشه نمایش داده میشه */}
                <div className="flex items-center gap-2 cursor-pointer justify-end">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-sm text-left">
                        <p className="font-medium text-gray-800 text-sm leading-none">Augusta Ryan</p>
                        <p className="text-xs text-gray-500 leading-none">Director</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}
