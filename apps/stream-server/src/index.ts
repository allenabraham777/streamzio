import 'dotenv/config';
import http from 'http';
import express, { Express } from 'express';
import NodeMediaServer from 'node-media-server';
import { Server } from 'socket.io';
import { expressServer, nodeMediaServer, socketServer } from './servers';
import { nmsConfig } from './constants/nmsConfig';

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const nms = new NodeMediaServer(nmsConfig);

expressServer(app);
socketServer(io);
nodeMediaServer(nms, io);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
nms.run();
