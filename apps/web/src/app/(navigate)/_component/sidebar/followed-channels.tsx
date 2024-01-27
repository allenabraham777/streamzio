'use client';
import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

import { cn, Skeleton } from '@streamzio/ui';

import collapsibleStateSelector from '@/store/selectors/collapsibleStateSelector';
import ChannelCard, { ChannelCardSkeleton } from './channel-card';
import { FullUser } from '@/types';
import ToolTip from '@/components/molecules/tooltip';

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

            <ToolTip message="Followed Channels" side="right">
                <div
                    className={cn('w-full flex justify-center items-center cursor-pointer', {
                        'lg:flex': collapsed,
                        'lg:!hidden': !collapsed
                    })}
                >
                    <FaRegHeart className="w-6 h-6" />
                </div>
            </ToolTip>
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
