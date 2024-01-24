import React from 'react';

import CollapsibleButton, {
    CollapsibleButtonSkeleton
} from '@/app/(navigate)/_component/sidebar/collapsible-button';
import RecomendedChannels, { RecomendedChannelsSekeleton } from './recomended-channels';
import SidebarWrapper from './sidebar-wrapper';
import { getRecommended } from '@/services/recomended';
import { getFollowedUsers } from '@/services/follow';
import FollowingChannels from './followed-channels';

const Sidebar = async () => {
    const channels = await getRecommended();
    const following = await getFollowedUsers();
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
