import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { PlusIcon, ImportIcon } from '@/assets/icons';
import Search from '@/components/searchbar';

const Students = () => {
    return (
        <div>
            <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
                <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
                    <Search />
                    <div className="flex items-center space-x-4">
                        <Link href="/students/add-students" >
                            <div className="inline-flex items-center gap-2 px-4 py-2 border hover:bg-slate-100 rounded-md text-sm">
                                <PlusIcon className="h-4 w-4" />
                                Add a student
                            </div>
                        </Link>
                        <Link href="/students/import-students">
                            <div className="inline-flex items-center gap-2 border hover:bg-slate-100 rounded-md px-4 py-2 text-sm">
                                <ImportIcon className="h-4 w-4" />
                                Import file
                            </div>
                        </Link>
                    </div>
                    <Card className="flex justify-center align-middle">
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 p-5">
                            <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
                                <div className="text-sm md:text-base lg:text-lg font-medium">Total Students</div>
                                <div className="text-3xl md:text-4xl lg:text-5xl font-bold">1,125</div>
                            </div>
                            <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
                                <div className="text-sm md:text-base lg:text-lg font-medium">Current Session</div>
                                <div className="text-3xl md:text-4xl lg:text-5xl font-bold">2024-2025</div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                        <div className="text-sm md:text-base lg:text-lg text-muted-foreground">
                            You can bulk-add students in CSV, XSL, or XLSX file formats.{' '}
                            <Link href="#" className="underline" prefetch={false}>
                                Download sample
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Students;
