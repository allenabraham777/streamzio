import React from 'react';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';

import { User } from '@streamzio/db';
import { Skeleton, cn } from '@streamzio/ui';

import UserAvatar from '@/components/molecules/users/user-avatar';
import LiveBadge from '@/components/molecules/users/live-badge';
import collapsibleStateSelector from '@/store/selectors/collapsibleStateSelector';

type Props = {
    channel: User;
};

const ChannelCard = ({ channel }: Props) => {
    const collapsed = useRecoilValue(collapsibleStateSelector);
    const link = `/${channel.username}`;
    return (
        <Link href={link} className="flex gap-2">
            <UserAvatar user={channel} variant="sm" />
            <div
                className={cn('flex-1 h-full pr-2 hidden lg:block', {
                    'lg:hidden': collapsed
                })}
            >
                <div className="flex items-center justify-between">
                    <h1 className="p-0 text-base truncate">{channel.username}</h1>
                    <LiveBadge isSmall />
                </div>
            </div>
        </Link>
    );
};

export const ChannelCardSkeleton = () => {
    return (
        <li className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1 hidden lg:block">
                <Skeleton className="h-6" />
            </div>
        </li>
    );
};

export default ChannelCard;