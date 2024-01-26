import { Server, Socket } from 'socket.io';
import { clerk, db } from '../lib';

export const socketServer = (io: Server) => {
    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            throw new Error('Authentication token missing');
        }
        const decoded = await clerk.verifyToken(token);
        if (!decoded) {
            throw new Error('Unauthorized');
        }
        const user = await db.user.findUnique({ where: { externalUserId: decoded.sub } });

        if (!user) {
            throw new Error('Invalid user');
        }

        socket.user = user!;

        next();
    });

    io.on('connection', (socket: Socket) => {
        socket.on('stream:join', (streamId: string) => {
            console.log(socket.id, 'joined the stream', streamId);

            socket.join(streamId);
        });

        socket.on('stream:leave', (streamId: string) => {
            console.log(socket.id, 'leaving the stream', streamId);

            socket.leave(streamId);
        });

        socket.on('stream:chat', (streamId, message) => {
            io.to(streamId).emit('chatMessage', message);
        });
    });
};
