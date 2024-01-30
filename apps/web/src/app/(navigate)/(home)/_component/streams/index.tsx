'use client';
import React from 'react';

import { FullStream } from '@/types';
import StreamThumbnail, { StreamThumbnailSkeleton } from './stream-thumbnail';

type Props = {
    streams: FullStream[];
};

const Streams = ({ streams }: Props) => {
    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-col-5 gap-4 items-start">
            {streams.map((stream) => (
                <div className="col-span-1" key={stream.id!}>
                    <StreamThumbnail stream={stream} />
                </div>
            ))}
        </div>
    );
};

export const StreamsSkeleton = () => {
    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-col-5 gap-4 items-start">
            {[...Array(10)].map((_, index) => (
                <div className="col-span-1" key={index}>
                    <StreamThumbnailSkeleton />
                </div>
            ))}
        </div>
    );
};

export default Streams;
