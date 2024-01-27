'use client';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { cn } from '@streamzio/ui';

import chatVariantStateSelector from '@/store/selectors/chatVariantStateSelector';
import { ChatVariants } from '@/enums/chatVariants';
import CollapsibleButton from './collapsible-button';
import ChatForm from './chat-form';
import { Stream } from '@streamzio/db';
import ChatList from './chat-list';

type Props = {
    stream: Stream;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
};

const Chat = ({
    stream,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly,
    isFollowing
}: Props) => {
    const variant = useRecoilValue(chatVariantStateSelector);
    const isChat = variant === ChatVariants.CHAT;
    const buttonText = isChat ? 'STREAM CHAT' : 'COMMUNITY';
    const isHidden = !isChatEnabled || !stream.isLive;

    const onSubmit = (message: string) => {};

    return (
        <div className="h-full w-full bg-card flex flex-col">
            <CollapsibleButton>{buttonText}</CollapsibleButton>
            <div className={cn('flex-1 flex items-center justify-center', { hidden: !isHidden })}>
                <h1 className="text-xl">Chat Unavailable</h1>
            </div>
            <div className={cn('flex-1 flex flex-col', { hidden: !isChat || isHidden })}>
                <div className="flex-1 overflow-y-auto">
                    <ChatList />
                </div>
                <ChatForm
                    isChatDelayed={isChatDelayed}
                    isChatEnabled={isChatEnabled}
                    isChatFollowersOnly={isChatFollowersOnly}
                    isFollowing={isFollowing}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    );
};

export default Chat;
