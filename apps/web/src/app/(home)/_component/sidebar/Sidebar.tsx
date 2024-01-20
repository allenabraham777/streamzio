'use client';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { cn } from '@streamzio/ui';

import CollapsibleButton from '@/components/molecules/sidebar/collapsible-button';
import collapsibleStateSelector from '@/store/selectors/collapsibleStateSelector';

const Sidebar = () => {
    const collapsed = useRecoilValue(collapsibleStateSelector);
    return (
        <aside
            className={cn('p-2 bg-card h-full w-[50px] lg:w-[240px] transition-all duration-200', {
                'lg:w-[50px]': collapsed
            })}
        >
            <CollapsibleButton>For You</CollapsibleButton>
        </aside>
    );
};

export default Sidebar;
