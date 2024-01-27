'use client';
import React from 'react';

import SocketContext from '@/context/socket-context';
import useSocket from '@/hooks/useSocket';

type Props = {
    children: React.ReactNode;
};

const SocketProvider = ({ children }: Props) => {
    const socket = useSocket();

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
