import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import NodeMediaServer from 'node-media-server';

import db from './lib/db';

dotenv.config();

const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8001,
        allow_origin: '*',
        mediaroot: ''
    }
};

const nms = new NodeMediaServer(config);

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
});

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
nms.run();
