import React from 'react';

import CollapsibleButton, {
    CollapsibleButtonSkeleton
} from '@/components/molecules/sidebar/collapsible-button';
import RecomendedChannels, { RecomendedChannelsSekeleton } from './recomended-channels';
import SidebarWrapper from './sidebar-wrapper';
import { getRecommended } from '@/services/recomended';

const Sidebar = async () => {
    const channels = await getRecommended();
    return (
        <SidebarWrapper>
            <CollapsibleButton>For You</CollapsibleButton>
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
