'use client';
import { useSession } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

const useSocket = () => {
    const [socket, setSocket] = React.useState<Socket | null>(null);
    const { session } = useSession();
    useEffect(() => {
        if (!socket && session) {
            const newSecket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
                autoConnect: false,
                async auth(cb) {
                    const token = await session.getToken();
                    cb({ token });
                }
            });
            setSocket(newSecket);
            newSecket.connect();
        }
    }, [session, socket]);

    return socket;
};

export default useSocket;
