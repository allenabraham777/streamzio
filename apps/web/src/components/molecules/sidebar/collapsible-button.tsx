import React from 'react';
import { useRecoilState } from 'recoil';
import { RiExpandRightLine, RiExpandLeftLine } from 'react-icons/ri';

import { Button, cn } from '@streamzio/ui';

import collapsibleState from '@/store/atoms/collapsibleState';

type Props = {
    children: React.ReactNode;
};

function CollapsibleButton({ children }: Props) {
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
    );
}

export default CollapsibleButton;
