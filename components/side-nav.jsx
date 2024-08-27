import React from 'react';
import Link from 'next/link';
import { DollarSignIcon, LayoutGridIcon, LogOutIcon, SettingsIcon, UsersIcon, ChalkboardIcon } from '@/assets/icons';
import Search from './searchbar';

const SideNav = () => {
    return (
        <div className="sticky top-0">
            <aside className="bg-background border-r border-border flex flex-col justify-between py-6 px-4 w-20 sm:w-64 shrink-0 h-screen">
                <nav className="space-y-4">
                    <Search />
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-medium text-foreground hover:bg-emerald-100 px-3 py-2 rounded-md"
                        prefetch={false}
                    >
                        <LayoutGridIcon className="w-5 h-5" />
                        <span className="hidden sm:block">Dashboard</span>
                    </Link>
                    <Link
                        href="/students"
                        className="flex items-center gap-2 font-medium text-foreground hover:bg-emerald-100 px-3 py-2 rounded-md"
                        prefetch={false}
                    >
                        <UsersIcon className="w-5 h-5" />
                        <span className="hidden sm:block">Students</span>
                    </Link>
                    <Link
                        href="/classes"
                        className="flex items-center gap-2 font-medium text-foreground hover:bg-emerald-100 px-3 py-2 rounded-md"
                        prefetch={false}
                    >
                        <ChalkboardIcon className="w-5 h-5" />
                        <span className="hidden sm:block">Create class</span>
                    </Link>
                    <Link
                        href="/fee-slabs"
                        className="flex items-center gap-2 font-medium text-foreground hover:bg-emerald-100 px-3 py-2 rounded-md"
                        prefetch={false}
                    >
                        <DollarSignIcon className="w-5 h-5" />
                        <span className="hidden sm:block">Create fees</span>
                    </Link>
                    <Link
                        href="/settings"
                        className="flex items-center gap-2 font-medium text-foreground hover:bg-emerald-100 px-3 py-2 rounded-md"
                        prefetch={false}
                    >
                        <SettingsIcon className="w-5 h-5" />
                        <span className="hidden sm:block">Settings</span>
                    </Link>
                </nav>
                <Link href="/logout" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-200">
                    <LogOutIcon className="w-5 h-5" />
                    <span className="hidden sm:block font-medium text-foreground">Log out</span>
                </Link>
            </aside>
        </div>
    );
};

export default SideNav;
