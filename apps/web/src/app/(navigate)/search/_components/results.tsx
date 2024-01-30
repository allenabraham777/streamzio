'use client';
import React from 'react';

import { FullStream } from '@/types';
import Card, { CardSkeleton } from './card';

type Props = {
    streams: FullStream[];
};

const Results = ({ streams }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            {streams.map((stream) => (
                <Card stream={stream} key={stream.id} />
            ))}
        </div>
    );
};

export const ResultsSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            {[...Array(4)].map((_, index) => (
                <CardSkeleton key={index} />
            ))}
        </div>
    );
};

export default Results;
