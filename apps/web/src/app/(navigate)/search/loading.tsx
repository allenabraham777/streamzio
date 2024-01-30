import React from 'react';
import { ResultsSkeleton } from './_components/results';

const SearchPageLoading = async () => {
    return (
        <div className="max-2xl h-full p-10">
            <ResultsSkeleton />
        </div>
    );
};

export default SearchPageLoading;
