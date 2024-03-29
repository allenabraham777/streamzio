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

    const userListTrigger = (streamId: string) => {
        const _clients = io.sockets.adapter.rooms.get(streamId);
        if (_clients) {
            const clients = Array.from(_clients).map((client) => {
                const userSocket = io.sockets.sockets.get(client);
                const { username, id: userId } = userSocket!.user!;
                return { username, userId, socketId: client };
            });
            clients;
            io.to(streamId).emit('stream:user:list', clients);
        }
    };

    io.on('connection', (socket: Socket) => {
        socket.on('stream:join', (streamId: string) => {
            console.log(socket.id, 'joined the stream', streamId);

            socket.join(streamId);
            userListTrigger(streamId);
        });

        socket.on('stream:leave', (streamId: string) => {
            console.log(socket.id, 'leaving the stream', streamId);

            socket.leave(streamId);
            userListTrigger(streamId);
        });

        socket.on('stream:user:all', (streamId: string) => {
            userListTrigger(streamId);
        });

        socket.on('stream:user:block', (streamId: string, socketId: string) => {
            const userSocket = io.sockets.sockets.get(socketId);
            userSocket!.leave(streamId);
            io.to(socketId).emit('stream:user:blocked');
            userListTrigger(streamId);
        });

        socket.on('stream:chat:send', (streamId, message) => {
            io.to(streamId).emit('stream:chat:receive', socket.user?.username, message);
        });

        socket.on('disconnected', function () {
            console.log('User left', socket.user?.username);
        });
    });
};
