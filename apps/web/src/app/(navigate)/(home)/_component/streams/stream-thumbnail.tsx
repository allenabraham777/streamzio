'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCircleCheck } from 'react-icons/fa6';

import { Skeleton } from '@streamzio/ui';

import { FullStream } from '@/types';
import UserAvatar from '@/components/molecules/users/user-avatar';
import LiveBadge from '@/components/molecules/users/live-badge';

type Props = {
    stream: FullStream;
};

const StreamThumbnail = ({ stream }: Props) => {
    return (
        <Link href={`/${stream.user.username}`} className="relative">
            {stream.isLive && (
                <div className="absolute left-2 top-2">
                    <LiveBadge />
                </div>
            )}
            <div className="w-full aspect-video bg-primary relative">
                <div className="h-full w-full flex items-center justify-center bg-card absolute transition-transform duration-100 hover:-translate-y-2 hover:translate-x-2">
                    {stream.thumbnailUrl ? (
                        <Image
                            width={400}
                            height={300}
                            className="h-full w-full object-cover"
                            src={stream.thumbnailUrl}
                            alt={stream.name || 'thumbnail'}
                        />
                    ) : (
                        <UserAvatar variant="lg" user={stream.user!} isLive />
                    )}
                </div>
            </div>
            <div className="flex gap-2 py-3 items-center">
                <div
                    className={
                        stream.isLive
                            ? 'rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background'
                            : ''
                    }
                >
                    <UserAvatar user={stream.user} isLive={stream.isLive} />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-base lg:text-lg truncate">{stream.name}</h1>
                    <h2 className="text-xs lg:!text-sm text-foreground/60 flex gap-2">
                        {stream.user.username}
                        <FaCircleCheck className="text-primary h-4 w-4" />
                    </h2>
                </div>
            </div>
        </Link>
    );
};

export const StreamThumbnailSkeleton = () => {
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

export default StreamThumbnail;
