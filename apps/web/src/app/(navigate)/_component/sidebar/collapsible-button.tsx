'use client';
import React from 'react';
import { useRecoilState } from 'recoil';
import { RiExpandRightLine, RiExpandLeftLine } from 'react-icons/ri';

import { Button, cn, Skeleton } from '@streamzio/ui';

import collapsibleState from '@/store/atoms/collapsibleState';
import ToolTip from '@/components/molecules/tooltip';

type Props = {
    children: React.ReactNode;
};

const CollapsibleButton = ({ children }: Props) => {
    const [collapsed, setCollapsed] = useRecoilState(collapsibleState);
    return (
        <div className="w-full hidden lg:flex justify-between items-center text-lg font-bold">
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

export const CollapsibleButtonSkeleton = () => {
    return (
        <div className="w-full hidden lg:flex justify-between items-center text-lg font-bold">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-6" />
        </div>
    );
};

export default CollapsibleButton;
