'use client';
import {
    Tooltip as AtomToolTip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@streamzio/ui';
import React from 'react';

type Props = {
    children: React.ReactNode;
    message: string;
    side?: 'right' | 'top' | 'bottom' | 'left';
};

const ToolTip = ({ children, message, side }: Props) => {
    return (
        <TooltipProvider>
            <AtomToolTip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side} className="bg-foreground text-background font-bold">
                    {message}
                </TooltipContent>
            </AtomToolTip>
        </TooltipProvider>
    );
};

export default ToolTip;
