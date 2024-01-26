'use client';
import React from 'react';
import { useRecoilState } from 'recoil';
import { RiExpandRightLine, RiExpandLeftLine } from 'react-icons/ri';
import { IoIosPeople } from 'react-icons/io';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';

import {
    Button,
    cn,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@streamzio/ui';

import chatCollapsibleState from '@/store/atoms/chatCollapsibleState';
import { ChatVariants } from '@/enums/chatVariants';

type Props = {
    children: React.ReactNode;
};

const CollapsibleButton = ({ children }: Props) => {
    const [collapsedState, setCollapsedState] = useRecoilState(chatCollapsibleState);
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="w-full flex justify-between items-center text-sm font-bold px-2 py-3 border-b border-hover">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden lg:block h-auto p-1 hover:bg-hover"
                            onClick={() =>
                                setCollapsedState((collapsedState) => ({
                                    ...collapsedState,
                                    collapsed: !collapsedState.collapsed
                                }))
                            }
                        >
                            {collapsedState.collapsed ? (
                                <RiExpandLeftLine className="text-xl" />
                            ) : (
                                <RiExpandRightLine className="text-xl" />
                            )}
                        </Button>
                        <span
                            className={cn(
                                'transition-opacity text-center flex-1 duration-200 delay-200',
                                {
                                    'opacity-0 hidden': collapsedState.collapsed
                                }
                            )}
                        >
                            {children}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden lg:block h-auto p-1 hover:bg-hover"
                            onClick={() =>
                                setCollapsedState((collapsedState) => ({
                                    ...collapsedState,
                                    variant:
                                        collapsedState.variant === ChatVariants.CHAT
                                            ? ChatVariants.COMMUNITY
                                            : ChatVariants.CHAT
                                }))
                            }
                        >
                            {collapsedState.variant == ChatVariants.CHAT ? (
                                <IoIosPeople className="text-xl" />
                            ) : (
                                <IoChatboxEllipsesOutline className="text-xl" />
                            )}
                        </Button>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                    {collapsedState.collapsed ? 'Expand' : 'Collapse'}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default CollapsibleButton;
