'use client';
import React, { useContext, useEffect } from 'react';
import { revalidatePath } from 'next/cache';

import { Stream } from '@streamzio/db';

import { FullUser } from '@/types';
import socketContext from '@/context/socket-context';
import Video from './video';
import { onStreamLoad } from '@/actions/stream';

type Props = {
    user: FullUser;
    stream: Stream;
    isFollowing: boolean;
    isDashboard?: boolean;
};

const StreamPlayer = ({ user, stream, isFollowing, isDashboard }: Props) => {
    const { socket } = useContext(socketContext);
    const revalidateRoutes = () => {
        // revalidatePath(`/${user.username}`);
        onStreamLoad(user, !!isDashboard);
    };
    useEffect(() => {
        if (socket) {
            socket.emit('stream:join', stream.id);
            console.log(user, isDashboard);
            socket.on('stream:started', revalidateRoutes);
            return () => {
                socket.emit('stream:leave', stream.id);
                socket.off('stream:started', revalidatePath);
            };
        }
    }, [socket]);
    return (
        <div className="h-full w-full">
            <Video user={user} stream={stream} />
        </div>
    );
};

export default StreamPlayer;
