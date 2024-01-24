'use client';
import React from 'react';
import { useRecoilState } from 'recoil';
import { RiExpandRightLine, RiExpandLeftLine } from 'react-icons/ri';

import {
    Button,
    cn,
    Skeleton,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@streamzio/ui';

import collapsibleState from '@/store/atoms/collapsibleState';

type Props = {
    children: React.ReactNode;
};

const CollapsibleButton = ({ children }: Props) => {
    const [collapsed, setCollapsed] = useRecoilState(collapsibleState);
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="w-full hidden lg:flex justify-between items-center text-lg font-bold">
                        <span
                            className={cn('transition-opacity duration-200 delay-200', {
                                'opacity-0 hidden': collapsed
                            })}
                        >
                            {children}
                        </span>
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
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right">{collapsed ? 'Expand' : 'Collapse'}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
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
