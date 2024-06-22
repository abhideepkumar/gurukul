'use client';
import Link from 'next/link';
import { HomeIcon, UsersIcon, CreditCardIcon, CogIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import React from 'react';
const SideNav = () => {
    return (
        <div className=" bg-gray-200 h-screen flex flex-col">
            <div className="h-16 flex items-center justify-center border-b-2">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Welcome</h2>
            </div>
            <ul className="h-full flex flex-col justify-between">
                <div>
                    <li className="flex items-center p-5 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Link className="flex items-center space-x-4" href="/">
                            <HomeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                    </li>
                    <li className="flex items-center p-5 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Link className="flex items-center space-x-4" href="/students">
                            <UsersIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm font-medium">Students</span>
                        </Link>
                    </li>
                    <li className="flex items-center p-5 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Link className="flex items-center space-x-4" href="create-fees">
                            <CreditCardIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm font-medium">Create Fees</span>
                        </Link>
                    </li>
                </div>
                <div>
                    <li className="flex items-center p-5 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Link className="flex items-center space-x-4" href="/settings">
                            <CogIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm font-medium">Settings</span>
                        </Link>
                    </li>
                    <li className="flex items-center p-5 hover:bg-red-100 dark:hover:bg-red-700">
                        <Link className="flex items-center space-x-4" href="/setting#logout">
                            <ArrowLeftOnRectangleIcon className="h-5 w-5 text-red-500 dark:text-gray-400" />
                            <span className="text-sm font-medium text-red-500">Sign Out</span>
                        </Link>
                    </li>
                </div>
            </ul>
        </div>
    );
};

export default SideNav;
