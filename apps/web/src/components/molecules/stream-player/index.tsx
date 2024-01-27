'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { RiExpandLeftLine } from 'react-icons/ri';

import { Stream } from '@streamzio/db';
import { Button, cn } from '@streamzio/ui';

import { ChatMessage, FullUser } from '@/types';
import socketContext from '@/context/socket-context';
import { onStreamLoad } from '@/actions/stream';
import chatCollapsibleState from '@/store/atoms/chatCollapsibleState';
import Video from './video';
import Chat from './chat';
import ToolTip from '../tooltip';
import Header from './header';

type Props = {
    user: FullUser;
    isHost: boolean;
    stream: Stream;
    isFollowing: boolean;
    isDashboard?: boolean;
    muted?: boolean;
};

const StreamPlayer = ({ user, isHost, stream, isFollowing, isDashboard, muted = false }: Props) => {
    const { socket } = useContext(socketContext);
    const [collapsedState, setCollapsedState] = useRecoilState(chatCollapsibleState);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const revalidateRoutes = () => {
        onStreamLoad(user, !!isDashboard);
    };
    const sendMessage = (message: string) => {
        if (socket) {
            socket.emit('stream:chat:send', stream.id, message);
        }
    };
    const receiveMessage = (username: string, message: string) => {
        setMessages((messages) => [...messages, { username, message }]);
    };
    useEffect(() => {
        if (socket) {
            socket.emit('stream:join', stream.id);
            socket.on('stream:started', revalidateRoutes);
            socket.on('stream:stopped', () => {
                setTimeout(() => {
                    revalidateRoutes();
                    setMessages([]);
                }, 5000);
            });
            socket.on('stream:chat:receive', receiveMessage);
            return () => {
                socket.emit('stream:leave', stream.id);
                socket.off('stream:started', revalidateRoutes);
                socket.off('stream:stopped', revalidateRoutes);
                socket.off('stream:chat:receive', receiveMessage);
            };
        }
    }, [socket, stream.id]);
    return (
        <div className={cn('h-full w-full flex flex-col lg:!flex-row relative')}>
            <div className="lg:flex-1">
                <Video user={user} stream={stream} muted={muted} />
                <Header isHost={isHost} isFollowing={isFollowing} stream={stream} user={user} />
            </div>
            <ToolTip message="Expand" side="left">
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        'hidden lg:block h-auto p-1 hover:bg-hover absolute right-2 top-3',
                        {
                            'lg:hidden': !collapsedState.collapsed
                        }
                    )}
                    onClick={() =>
                        setCollapsedState((collapsedState) => ({
                            ...collapsedState,
                            collapsed: false
                        }))
                    }
                >
                    <RiExpandLeftLine className="text-xl" />
                </Button>
            </ToolTip>

            <div
                className={cn('flex-1 lg:flex-none lg:w-[340px] border-l border-l-hover', {
                    'lg:hidden': collapsedState.collapsed
                })}
            >
                <Chat
                    user={user}
                    stream={stream}
                    isHost={isHost}
                    isFollowing={isFollowing}
                    isChatDelayed={stream.isChatDelayed}
                    isChatEnabled={stream.isChatEnabled}
                    isChatFollowersOnly={stream.isChatFollowersOnly}
                    messages={messages}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
};

export default StreamPlayer;
