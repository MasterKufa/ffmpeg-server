import { Server, Socket } from 'socket.io';
import { ACTIONS } from './constants';
import { mono_8_16Handler } from './helpers/mono_8_16';
import { WorkersPool } from 'MasterKufaTools';

const io = new Server(3000);

const pool = new WorkersPool();

io.on('connection', (socket: Socket) => {
  socket.on(ACTIONS.mono_8_16, mono_8_16Handler(socket, pool));
});
