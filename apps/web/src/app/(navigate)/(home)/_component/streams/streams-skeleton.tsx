import React from 'react';

import StreamThumbnailSkeleton from './thumbnail-skeleton';

const StreamsSkeleton = () => {
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

export default StreamsSkeleton;
