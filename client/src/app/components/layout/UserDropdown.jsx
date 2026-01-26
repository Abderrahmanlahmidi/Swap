"use client";
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import {
    User,
    LogOut,
    Settings,
    ShoppingBag,
    Heart,
    ChevronRight
} from 'lucide-react';
import { accountMenu } from '../../constants/navbar.constants';

export default function UserDropdown({ user, logout, iconColor }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 ${iconColor} hover:opacity-70 transition-colors p-1`}
            >
                <div className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center overflow-hidden transition-all hover:border-neutral-500">
                    {user?.image ? (
                        <img src={user.image} alt="User" className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-5 h-5" strokeWidth={1.5} />
                    )}
                </div>
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute right-0 mt-4 w-64 bg-white border border-neutral-200 shadow-2xl rounded-2xl py-4 transition-all duration-300 origin-top-right transform ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                <div className="px-5 py-3 border-b border-neutral-100 mb-2">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-neutral-600" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-bold text-neutral-900 truncate">
                                {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : (user?.email || 'My Account')}
                            </p>

                            <p className="text-xs text-neutral-500 truncate">{user?.email || 'User'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-600 uppercase tracking-wider">
                            {user?.role || 'CLIENT'}
                        </span>
                        <span className="text-[10px] text-neutral-400">ID: {user?.id?.slice(0, 8) || '...'}</span>
                    </div>
                </div>

                <div className="px-2">
                    {accountMenu.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between px-3 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-xl transition-all group"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-neutral-50 group-hover:bg-white flex items-center justify-center transition-colors">
                                    {item.icon && <item.icon className="w-4 h-4" />}
                                </div>
                                <span className="font-medium">{item.name}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500 transition-colors" />
                        </Link>
                    ))}
                </div>

                <div className="border-t border-neutral-100 my-2 mx-4"></div>

                <div className="px-2">
                    <button
                        onClick={() => {
                            logout();
                            setIsOpen(false);
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition-all w-full text-left group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-rose-50 group-hover:bg-rose-100 flex items-center justify-center transition-colors">
                            <LogOut className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
