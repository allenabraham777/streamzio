import React from 'react';
import { redirect } from 'next/navigation';
import { searchStreams } from '@/services/search';
import Results from './_components/results';

type Props = {
    searchParams: {
        term?: string;
    };
};

const SearchPage = async ({ searchParams }: Props) => {
    if (!searchParams.term) {
        redirect('/');
    }
    const streams = await searchStreams(searchParams.term);
    return (
        <div className="max-2xl h-full p-10 flex flex-col gap-8">
            <h1 className="text-xl">
                Results for the term <b className="text-primary">&quot;{searchParams.term}&quot;</b>
            </h1>
            <Results streams={streams} />
        </div>
    );
};

export default SearchPage;
