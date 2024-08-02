import React from 'react';
import { Input } from '@/components/ui/input';
import { SearchIcon } from '@/assets/icons';

const Search = () => {
    return (
        <div className="flex-1 p-6">
            <div className="flex items-center justify-between">
                <div className="relative w-full ">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search a student to take actions"
                        className="pl-10 pr-4 py-2 rounded-md w-full border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        CTRL + K
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
