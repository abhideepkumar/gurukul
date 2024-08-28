'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { SearchIcon } from '@/assets/icons';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    // Fetch student data from localStorage
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('students'));
        if (storedData && storedData.success) {
            setStudents(storedData.data);
        }
    }, [isOpen]);

    // Filter students based on query with debounce
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (query.trim()) {
                const lowerCaseQuery = query.toLowerCase();
                const filtered = students.filter(
                    (student) =>
                        student.full_name.toLowerCase().includes(lowerCaseQuery) ||
                        student.fatherName.toLowerCase().includes(lowerCaseQuery) ||
                        student.admission_id.toLowerCase().includes(lowerCaseQuery) ||
                        student.classname.toLowerCase().includes(lowerCaseQuery) ||
                        student.phone_no.toLowerCase().includes(lowerCaseQuery),
                );
                setFilteredStudents(filtered);
            } else {
                setFilteredStudents([]);
            }
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [query, students]);

    // Open the search dialog with Ctrl + K
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                setIsOpen(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className="w-full m-2">
                <Button variant="outline" className="w-full flex items-center justify-center">
                    <SearchIcon className="mr-2 h-4 w-4" />
                    Search
                    <span className="mx-2 text-xs text-muted-foreground">CTRL + K </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="flex justify-center items-center p-4">
                <div className="w-full max-w-lg bg-white rounded-md shadow-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="relative w-full">
                            <div className="flex items-center">
                                <SearchIcon className="mr-2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search a student to take actions"
                                    className="w-full pl-4 pr-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    {filteredStudents.length > 0 && (
                        <ul className="mt-4 max-h-60 overflow-y-auto">
                            {filteredStudents.map((student) => (
                                <li
                                    key={student.id}
                                    className="p-2 border-b border-border hover:bg-gray-100 rounded-md"
                                >
                                    <Link href={`/student-detail/?id=${student.admission_id}`} onClick={() => setIsOpen(false)}>
                                        <div className="font-semibold">{student.full_name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            Admission ID: {student.admission_id}, Class: {student.classname}, Phone:{' '}
                                            {student.phone_no}, Father&apos;s Name: {student.fatherName}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Search;
