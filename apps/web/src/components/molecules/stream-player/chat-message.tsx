import React from 'react';
import ColorHash from 'color-hash';
const colorHash = new ColorHash();

import { ChatMessage as MessageType } from '@/types';

type Props = {
    message: MessageType;
};

const ChatMessage = ({ message }: Props) => {
    const color = colorHash.hex(message.username);
    return (
        <div>
            <b className={`text-[${color}]`} style={{ color }}>
                {message.username}
            </b>
            : {message.message}
        </div>
    );
};

export default ChatMessage;
