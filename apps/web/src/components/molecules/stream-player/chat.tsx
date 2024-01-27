'use client';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { cn } from '@streamzio/ui';
import { Stream } from '@streamzio/db';

import chatVariantStateSelector from '@/store/selectors/chatVariantStateSelector';
import { ChatVariants } from '@/enums/chatVariants';
import { ChatMessage, FullUser } from '@/types';
import CollapsibleButton from './collapsible-button';
import ChatForm from './chat-form';
import ChatList from './chat-list';
import Community from './community';

type Props = {
    isHost: boolean;
    stream: Stream;
    user: FullUser;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
    messages: ChatMessage[];
    sendMessage: (message: string) => void;
};

const Chat = ({
    stream,
    user,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly,
    isFollowing,
    messages,
    isHost,
    sendMessage
}: Props) => {
    const variant = useRecoilValue(chatVariantStateSelector);
    const isChat = variant === ChatVariants.CHAT;
    const buttonText = isChat ? 'STREAM CHAT' : 'COMMUNITY';
    const isHidden = !isChatEnabled || !stream.isLive;

    const onSubmit = (message: string) => {
        sendMessage(message);
    };

    return (
        <div className="h-full w-full bg-card flex flex-col">
            <CollapsibleButton>{buttonText}</CollapsibleButton>
            <div
                className={cn('flex-1 flex items-center justify-center', {
                    hidden: !isHidden || !isChat
                })}
            >
                <h1 className="text-xl">Chats Unavailable</h1>
            </div>
            <div
                className={cn('flex-1 flex flex-col', {
                    hidden: isChat
                })}
            >
                <Community stream={stream} user={user} isHost={isHost} />
            </div>
            <div className={cn('flex-1 flex flex-col', { hidden: !isChat || isHidden })}>
                <div className="flex-1 overflow-y-auto">
                    <ChatList messages={messages} />
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
