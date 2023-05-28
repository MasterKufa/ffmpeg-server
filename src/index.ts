import { Server, Socket } from 'socket.io';
import { ACTIONS } from './constants';
import { mono_8_16Handler } from './helpers/mono_8_16';

const io = new Server(3000);

io.on('connection', (socket: Socket) => {
  socket.on(ACTIONS.mono_8_16, mono_8_16Handler(socket));
});
