import React from 'react';

import { ChatMessage as MessageType } from '@/types';
import ChatMessage from './chat-message';

type Props = {
    messages: MessageType[];
};

const ChatList = ({ messages }: Props) => {
    return (
        <div className="h-full w-full flex flex-col px-3 justify-end pb-3 gap-1">
            {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
            ))}
        </div>
    );
};

export default ChatList;
