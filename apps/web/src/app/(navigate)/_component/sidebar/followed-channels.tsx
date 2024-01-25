'use client';
import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

import {
    cn,
    Skeleton,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@streamzio/ui';

import collapsibleStateSelector from '@/store/selectors/collapsibleStateSelector';
import ChannelCard, { ChannelCardSkeleton } from './channel-card';
import { FullUser } from '@/types';

type Props = {
    data: { following: FullUser }[];
};

const FollowingChannels = ({ data }: Props) => {
    const collapsed = useRecoilValue(collapsibleStateSelector);
    if (!data.length) return null;
    return (
        <div className="flex flex-col gap-4">
            <h1
                className={cn('uppercase text-sm font-semibold hidden lg:block truncate', {
                    'lg:hidden': collapsed
                })}
            >
                Followed Channels
            </h1>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className={cn('w-full flex justify-center items-center', {
                                'lg:flex': collapsed,
                                'lg:!hidden': !collapsed
                            })}
                        >
                            <FaRegHeart className="w-6 h-6" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">Followed Channels</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <div className="flex flex-col gap-2">
                {data.map((channel) => (
                    <ChannelCard key={channel.following.id} channel={channel.following} />
                ))}
            </div>
        </div>
    );
};

export const FollowingChannelsSekeleton = () => {
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

export default FollowingChannels;
