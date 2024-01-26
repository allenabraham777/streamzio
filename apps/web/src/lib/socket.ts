import { io } from 'socket.io-client';

import _ from 'underscore';

const loadSocket = (url: string, token: string) => {
    const socket = io(url, { autoConnect: false, auth: { token } });
    return socket;
};

export const debouncedLoadSocket = _.debounce(loadSocket, 500, true);
