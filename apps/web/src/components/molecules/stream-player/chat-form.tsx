'use client';
import React, { FormEvent, useMemo, useState } from 'react';
import { IoIosInformationCircle } from 'react-icons/io';

import { Button, Input } from '@streamzio/ui';
import ToolTip from '../tooltip';

type Props = {
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
    onSubmit: (message: string) => void;
};

type InfoProps = {
    isFollowersOnly: boolean;
    isDelayed: boolean;
};

const ChatInfo = ({ isDelayed, isFollowersOnly }: InfoProps) => {
    console.log({ isDelayed, isFollowersOnly });

    const info = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
            return 'Only followers can chat';
        }

        if (isDelayed && !isFollowersOnly) {
            return 'Messages are delayed by 3 seconds';
        }

        if (isDelayed && isFollowersOnly) {
            return 'Only followers can chat. Messages are delayed by 3 seconds';
        }

        return '';
    }, [isDelayed, isFollowersOnly]);

    const label = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
            return 'Followers only';
        }

        if (isDelayed && !isFollowersOnly) {
            return 'Slow mode';
        }

        if (isDelayed && isFollowersOnly) {
            return 'Followers only and slow mode';
        }

        return '';
    }, [isDelayed, isFollowersOnly]);

    if (!isDelayed && !isFollowersOnly) {
        return null;
    }

    return (
        <div className="px-2 py-1 py1 text-foreground/50 flex gap-2 items-center text-xs">
            <ToolTip message={info} side="left">
                <span>
                    <IoIosInformationCircle className="h-4 w-4 cursor-pointer" />
                </span>
            </ToolTip>
            <span>{label}</span>
        </div>
    );
};

const ChatForm = ({
    onSubmit,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly
}: Props) => {
    const [value, setValue] = useState('');
    const [isDelayed, setIsDelayed] = useState(false);
    const isFollowerOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing;
    const isDisabled = isFollowerOnlyAndNotFollowing || isDelayed;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDisabled || !value) return;

        if (isChatDelayed && !isDelayed) {
            setIsDelayed(true);
            setTimeout(() => {
                setIsDelayed(false);
                onSubmit(value);
            }, 3000);
        } else {
            onSubmit(value);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="px-3 flex flex-col">
            <div className="rounded-lg border border-hover">
                <ChatInfo isDelayed={isChatDelayed} isFollowersOnly={isChatFollowersOnly} />
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={isDisabled}
                    placeholder="Send a message"
                    className="bg-card border-hover"
                />
            </div>
            <div className="py-3 text-right">
                <Button disabled={isDisabled} size="sm">
                    Chat
                </Button>
            </div>
        </form>
    );
};

export default ChatForm;
