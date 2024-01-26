import { User } from '@streamzio/db';

declare module 'socket.io' {
    export interface Socket {
        user?: User;
    }
}
