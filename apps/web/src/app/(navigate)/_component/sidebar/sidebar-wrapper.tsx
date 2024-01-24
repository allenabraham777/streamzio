'use client';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { useIsClient } from 'usehooks-ts';

import { cn } from '@streamzio/ui';

import collapsibleStateSelector from '@/store/selectors/collapsibleStateSelector';
import { CollapsibleButtonSkeleton } from './collapsible-button';
import { RecomendedChannelsSekeleton } from './recomended-channels';

type Props = {
    children: React.ReactNode;
};

const SidebarWrapper = ({ children }: Props) => {
    const isClient = useIsClient();
    const collapsed = useRecoilValue(collapsibleStateSelector);
    if (!isClient)
        return (
            <aside className="p-2 bg-card h-full w-[50px] lg:w-[240px] transition-all duration-200 space-y-4">
                <CollapsibleButtonSkeleton />
                <RecomendedChannelsSekeleton />
            </aside>
        );
    return (
        <aside
            className={cn(
                'p-2 bg-card h-full w-[50px] lg:w-[240px] transition-all duration-200 space-y-4 overflow-x-hidden',
                {
                    'lg:w-[50px]': collapsed
                }
            )}
        >
            {children}
        </aside>
    );
};

export default SidebarWrapper;
