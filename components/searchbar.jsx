'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { SearchIcon } from '@/assets/icons';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);

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
            <DialogTrigger asChild className="w- m-2">
                <Button variant="outline">
                    <SearchIcon className="mr-2 h-4 w-4" />
                    Search
                    <span className="mx-2 text-xs text-muted-foreground">CTRL + K </span>
                    
                </Button>
            </DialogTrigger>
            <DialogContent className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-lg">
                <div className="flex-1 p-4">
                    <div className="flex items-center justify-between">
                        <div className="relative w-full">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search a student to take actions"
                                className="pl-10 pr-4 py-2 rounded-md w-full border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Search;
