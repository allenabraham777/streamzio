'use client';
import React from 'react';
import { IoIosInformationCircle } from 'react-icons/io';

import { Button, Input } from '@streamzio/ui';

type Props = {
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
};

const ChatForm = (props: Props) => {
    return (
        <div className="px-3 flex flex-col">
            <div className="rounded-lg border border-hover">
                <div className="px-2 py-1 py1 text-foreground/50 flex gap-2 items-center text-xs">
                    <IoIosInformationCircle />
                    <span>Followers-Only Chat</span>
                </div>
                <Input placeholder="Send a message" className="bg-card border-hover" />
            </div>
            <div className="py-3 text-right">
                <Button size="sm">Chat</Button>
            </div>
        </div>
    );
};

export default ChatForm;
