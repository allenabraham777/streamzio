import { createContext } from 'react';
import { Socket } from 'socket.io-client';

type SocketContextType = {
    socket: null | Socket;
};

const initialState: SocketContextType = {
    socket: null
};

const socketContext = createContext(initialState);

export default socketContext;
