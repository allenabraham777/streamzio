'use client';
import React from 'react';
import { Skeleton } from '@streamzio/ui';

const StreamThumbnailSkeleton = () => {
    return (
        <div>
            <div className="w-full aspect-video bg-hover flex items-center justify-center">
                <Skeleton className="h-full w-full" />
            </div>
            <div className="flex gap-2 py-3 items-center">
                <div>
                    <Skeleton className="w-10 h-10 rounded-full" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <Skeleton className="h-5 w-[250px]" />
                    <Skeleton className="h-3 w-[100px]" />
                </div>
            </div>
        </div>
    );
};

export default StreamThumbnailSkeleton;
