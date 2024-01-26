'use client';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { cn } from '@streamzio/ui';

import dashboardCollapsibleStateSelector from '@/store/selectors/dashboardCollapsibleStateSelector';

type Props = {
    children: React.ReactNode;
};

const SidebarWrapper = ({ children }: Props) => {
    const collapsed = useRecoilValue(dashboardCollapsibleStateSelector);

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
