'use client';
import React from 'react';

import { Skeleton } from '@streamzio/ui';

const KeyLoading = () => {
    return (
        <section className="px-10 py-6 flex flex-col gap-8">
            <div className="flex gap-8 items-center">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-24" />
            </div>
            <div className="flex flex-col gap-6">
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
            </div>
        </section>
    );
};

export default KeyLoading;
