'use client';
import React, { useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

import { Button, Input } from '@streamzio/ui';

const Search = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const onSearch = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!searchTerm) return;
            const url = qs.stringifyUrl(
                {
                    url: '/search',
                    query: {
                        term: searchTerm
                    }
                },
                { skipEmptyString: true }
            );
            router.push(url);
        },
        [searchTerm, router]
    );
    return (
        <form onSubmit={onSearch} className="flex items-center w-full lg:w-96 max-w-96 relative">
            <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-card border-gray-600 rounded-none rounded-l-lg flex-1 focus-visible:ring-offset-0 h-9 !pr-10"
            />
            {searchTerm && (
                <IoClose
                    className="absolute w-6 h-6 right-12 cursor-pointer"
                    onClick={() => setSearchTerm('')}
                />
            )}
            <Button
                variant="ghost"
                className="border-t border-b border-r border-gray-600 rounded-none rounded-r-lg bg-hover px-2 h-9"
                type="submit"
            >
                <FaSearch className="w-6 h-6" />
            </Button>
        </form>
    );
};

export default Search;
