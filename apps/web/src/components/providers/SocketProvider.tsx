'use client';
import React, { useEffect, useState } from 'react';

import SocketContext from '@/context/socket-context';
import { debouncedLoadSocket } from '@/lib/socket';
import { Socket } from 'socket.io-client';
import { useSession } from '@clerk/nextjs';

type Props = {
    children: React.ReactNode;
};

const SocketProvider = ({ children }: Props) => {
    const { session } = useSession();
    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(() => {
        const loadData = async () => {
            const token = await session?.getToken();
            if (token && session?.user) {
                if (!socket) {
                    const socket = debouncedLoadSocket(
                        process.env.NEXT_PUBLIC_SOCKET_URL as string,
                        token
                    );
                    socket.connect();
                    setSocket(socket);
                }
            } else {
                socket?.disconnect();
                setSocket(null);
            }
        };
        loadData();
        return () => {
            socket?.disconnect();
        };
    }, [session]);
    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
