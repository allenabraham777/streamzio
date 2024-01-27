'use client';
import React from 'react';
import { BiVideo } from 'react-icons/bi';
import { useRecoilValue } from 'recoil';

import { cn, Skeleton } from '@streamzio/ui';

import collapsibleStateSelector from '@/store/selectors/collapsibleStateSelector';
import ChannelCard, { ChannelCardSkeleton } from './channel-card';
import { FullUser } from '@/types';
import ToolTip from '@/components/molecules/tooltip';

type Props = {
    data: FullUser[];
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

            <ToolTip message="Recommended Channels" side="right">
                <div
                    className={cn('w-full flex justify-center items-center cursor-pointer', {
                        'lg:flex': collapsed,
                        'lg:!hidden': !collapsed
                    })}
                >
                    <BiVideo className="w-7 h-7" />
                </div>
            </ToolTip>

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
