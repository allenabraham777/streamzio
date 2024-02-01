'use client';
import React from 'react';
import { CollapsibleButtonSkeleton } from './collapsible-button';
import { RecomendedChannelsSekeleton } from './recomended-channels';

export const SidebarSkeleton: React.FC = () => {
    return (
        <aside className="p-2 bg-card h-full w-[50px] lg:w-[240px] transition-all duration-200 space-y-4">
            <CollapsibleButtonSkeleton />
            <RecomendedChannelsSekeleton />
        </aside>
    );
};
