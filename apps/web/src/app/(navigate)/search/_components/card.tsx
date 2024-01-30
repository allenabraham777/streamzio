'use client';
import React from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import Link from 'next/link';

import { Skeleton, cn } from '@streamzio/ui';

import { FullStream } from '@/types';
import Image from 'next/image';
import UserAvatar from '@/components/molecules/users/user-avatar';
import LiveBadge from '@/components/molecules/users/live-badge';

type Props = {
    stream: FullStream;
};

const Card = ({ stream }: Props) => {
    return (
        <Link href={`/${stream.user.username}`} className="flex flex-wrap w-full gap-4">
            <div className="relative w-full sm:!w-[200px] md:!w-[300px] lg:!w-[400px] h-auto max-w-full aspect-video flex items-center justify-center bg-card">
                {stream.isLive && (
                    <div className="absolute left-2 top-2">
                        <LiveBadge />
                    </div>
                )}
                {stream.thumbnailUrl ? (
                    <Image
                        height={300}
                        width={400}
                        className="h-full w-full object-cover"
                        src={stream.thumbnailUrl}
                        alt={stream.name!}
                    />
                ) : (
                    <UserAvatar variant="lg" user={stream.user!} isLive />
                )}
            </div>
            <div className="flex-1 py-4 flex items-start gap-4">
                <div className="flex items-center">
                    <div
                        className={cn(
                            stream.isLive &&
                                'ring-2 ring-primary ring-offset-2 ring-offset-background rounded-full'
                        )}
                    >
                        <UserAvatar user={stream.user!} isLive={stream.isLive} />
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <h1 className="text-base font-semibold">{stream.name}</h1>
                    <h1 className="text-sm flex gap-2 text-foreground/60">
                        {stream.user.username} <FaCircleCheck className="text-primary h-4 w-4" />
                    </h1>
                </div>
            </div>
        </Link>
    );
};

export const CardSkeleton = () => {
    return (
        <div className="flex flex-wrap w-full gap-4">
            <Skeleton className="relative w-full sm:!w-[200px] md:!w-[300px] lg:!w-[400px] h-auto max-w-full aspect-video flex items-center justify-center bg-card" />
            <div className="flex-1 py-4 flex items-start gap-4">
                <div className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <Skeleton className="h-6 w-full max-w-[200px] rounded-full" />
                    <Skeleton className="h-4 w-full max-w-[80px] rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default Card;
