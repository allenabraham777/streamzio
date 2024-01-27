import NodeMediaServer from 'node-media-server';
import { Server } from 'socket.io';

import { db } from '../lib';

export const nodeMediaServer = (nms: NodeMediaServer, io: Server) => {
    nms.on('prePublish', async (id, streamPath, args) => {
        const streamKey = streamPath.split('/')[2];
        const stream = await db.stream.findFirst({ where: { streamKey } });
        if (!stream) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const session: any = nms.getSession(id);
            session.reject();
            return;
        }
        await db.stream.update({
            where: {
                id: stream.id,
                streamKey
            },
            data: {
                isLive: true
            }
        });
        io.to(stream.id).emit('stream:started');
    });

    nms.on('donePublish', async (id, StreamPath, args) => {
        const streamKey = StreamPath.split('/')[2];
        console.log(`Stream by key ${streamKey} has stopped`);
        const stream = await db.stream.findFirst({ where: { streamKey } });
        if (!stream) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const session: any = nms.getSession(id);
            session.reject();
            return;
        }
        await db.stream.update({
            where: {
                id: stream.id,
                streamKey
            },
            data: {
                isLive: false
            }
        });
        io.to(stream.id).emit('stream:stopped');
    });
};
