import { Socket } from 'socket.io';
import { createServer } from '@master_kufa/server-tools';
import { ACTIONS } from './actions';
import { api } from './api';
import { config } from 'dotenv';

config();

const io = createServer();

io.on('connection', (socket: Socket) => {
  socket.on(
    ACTIONS.CONVERT_MONO_16,
    api.handle.bind(api, ACTIONS.CONVERT_MONO_16, socket),
  );
  socket.on(
    ACTIONS.CONCAT_WITH_PAUSE,
    api.handle.bind(api, ACTIONS.CONCAT_WITH_PAUSE, socket),
  );
});
