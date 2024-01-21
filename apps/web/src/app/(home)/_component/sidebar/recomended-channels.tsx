'use client';
import React from 'react';
import { BiVideo } from 'react-icons/bi';
import { useRecoilValue } from 'recoil';

import { User } from '@streamzio/db';
import { cn, Skeleton } from '@streamzio/ui';

import collapsibleStateSelector from '@/store/selectors/collapsibleStateSelector';
import ChannelCard, { ChannelCardSkeleton } from './channel-card';

type Props = {
    data: User[];
};

const RecomendedChannels = ({ data = [] }: Props) => {
    const collapsed = useRecoilValue(collapsibleStateSelector);
    if (!data.length) return null;
    return (
        <div className="flex flex-col gap-4">
            <h1
                className={cn('uppercase text-sm font-semibold hidden lg:block truncate', {
                    'lg:hidden': collapsed
                })}
            >
                Recommended Channels
            </h1>
            <div
                className={cn('w-full flex justify-center items-center', {
                    'lg:flex': collapsed,
                    'lg:!hidden': !collapsed
                })}
            >
                <BiVideo className="w-7 h-7" />
            </div>
            <div className="flex flex-col gap-2">
                {data.map((channel) => (
                    <ChannelCard key={channel.id} channel={channel} />
                ))}
            </div>
        </div>
    );
};

export const RecomendedChannelsSekeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="rounded-md p-3 w-full" />
            <div className="flex flex-col gap-2">
                {[...Array(3)].map((_, index) => (
                    <ChannelCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export default RecomendedChannels;
