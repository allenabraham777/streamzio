'use client';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { cn } from '@streamzio/ui';

import chatVariantStateSelector from '@/store/selectors/chatVariantStateSelector';
import { ChatVariants } from '@/enums/chatVariants';
import CollapsibleButton from './collapsible-button';
import ChatForm from './chat-form';
import { Stream } from '@streamzio/db';

type Props = {
    stream: Stream;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
};

const Chat = ({ stream, isChatEnabled }: Props) => {
    const variant = useRecoilValue(chatVariantStateSelector);
    const isChat = variant === ChatVariants.CHAT;
    const buttonText = isChat ? 'STREAM CHAT' : 'COMMUNITY';
    const isHidden = !isChatEnabled || !stream.isLive;
    return (
        <div className="h-full w-full bg-card flex flex-col">
            <CollapsibleButton>{buttonText}</CollapsibleButton>
            <div className={cn('flex-1 flex items-center justify-center', { hidden: !isHidden })}>
                <h1 className="text-xl">Chat Unavailable</h1>
            </div>
            <div className={cn('flex-1 flex flex-col', { hidden: !isChat || isHidden })}>
                <div className="flex-1 overflow-y-auto"></div>
                <ChatForm />
            </div>
        </div>
    );
};

export default Chat;
