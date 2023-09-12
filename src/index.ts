import { Socket } from 'socket.io';
import { createServer } from '@master_kufa/server-tools';
import { ACTIONS } from './actions';
import { api } from './api';
import { config } from 'dotenv';

config();

const io = createServer();

io.on('connection', (socket: Socket) =>
  Object.values(ACTIONS).forEach((action) =>
    socket.on(action, api.handle.bind(api, action, socket)),
  ),
);
