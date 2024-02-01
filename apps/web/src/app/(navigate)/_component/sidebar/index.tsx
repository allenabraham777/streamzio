'use client';
import React, { useEffect, useState, useTransition } from 'react';

import CollapsibleButton, {
    CollapsibleButtonSkeleton
} from '@/app/(navigate)/_component/sidebar/collapsible-button';
import RecomendedChannels, { RecomendedChannelsSekeleton } from './recomended-channels';
import SidebarWrapper from './sidebar-wrapper';
import FollowingChannels from './followed-channels';
import { getFollowedAction, getRecommendedAction } from '@/actions/user';
import { FullUser } from '@/types';

const Sidebar = () => {
    const [isPending, startTransition] = useTransition();
    const [following, setFollowing] = useState<{ following: FullUser }[]>([]);
    const [channels, setChannels] = useState<FullUser[]>([]);
    useEffect(() => {
        startTransition(() => {
            getRecommendedAction().then((recommended) => setChannels(recommended));
            getFollowedAction().then((followed) => setFollowing(followed));
        });
    }, []);
    if (isPending) return <SidebarSkeleton />;
    return (
        <SidebarWrapper>
            <CollapsibleButton>For You</CollapsibleButton>
            <FollowingChannels data={following} />
            <RecomendedChannels data={channels} />
        </SidebarWrapper>
    );
};

export const SidebarSkeleton = () => {
    return (
        <aside className="p-2 bg-card h-full w-[50px] lg:w-[240px] transition-all duration-200 space-y-4">
            <CollapsibleButtonSkeleton />
            <RecomendedChannelsSekeleton />
        </aside>
    );
};

export default Sidebar;
