'use client';
import React from 'react';
import { useRecoilState } from 'recoil';
import { RiExpandRightLine, RiExpandLeftLine } from 'react-icons/ri';

import { Button, cn } from '@streamzio/ui';

import dashboardCollapsibleState from '@/store/atoms/dashboardCollapsibleState';
import ToolTip from '@/components/molecules/tooltip';

type Props = {
    children: React.ReactNode;
};

const CollapsibleButton = ({ children }: Props) => {
    const [collapsed, setCollapsed] = useRecoilState(dashboardCollapsibleState);
    return (
        <div className="w-full hidden lg:flex justify-between items-center text-sm font-bold">
            <span
                className={cn('transition-opacity duration-200 delay-200', {
                    'opacity-0 hidden': collapsed
                })}
            >
                {children}
            </span>
            <ToolTip message={collapsed ? 'Expand' : 'Collapse'} side="right">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 hover:bg-hover"
                    onClick={() => setCollapsed((collapsed) => !collapsed)}
                >
                    {collapsed ? (
                        <RiExpandRightLine className="text-xl" />
                    ) : (
                        <RiExpandLeftLine className="text-xl" />
                    )}
                </Button>
            </ToolTip>
        </div>
    );
};

export default CollapsibleButton;
