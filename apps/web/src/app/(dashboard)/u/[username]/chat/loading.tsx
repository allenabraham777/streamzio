'use client';

import React from 'react';

import { Skeleton } from '@streamzio/ui';

const Chat = () => {
    return (
        <section className="px-10 py-6 flex flex-col gap-8">
            <Skeleton className="h-10 w-[200px]" />
            <div className="flex flex-col gap-6">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
        </section>
    );
};

export default Chat;
