import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Search = () => {
    return (
        <div className="flex w-full max-w-md items-center space-x-2 p-3">
            <Input type="text" placeholder="Search here"/>
            <Button type="submit">Search</Button>
        </div>
    );
};

export default Search;
