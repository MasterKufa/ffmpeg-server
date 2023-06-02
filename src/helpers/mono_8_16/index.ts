import { ExecException, exec } from 'child_process';
import { Socket } from 'socket.io';
import { ACTIONS } from '../../constants';
import { ConvertConfig } from '../../types';
import { WorkersPool } from '@master_kufa/tools';
import { resolve } from 'path';
import { ConvertTask, ConvertTaskResult } from './types';

const processPath = resolve('.', 'process');

export const replyMono_8_16 = (socket: Socket) => (res: ConvertTaskResult) =>
  socket.emit(ACTIONS.mono_8_16, res);

export const mono_8_16Handler =
  (socket: Socket, pool: WorkersPool<ConvertTask, ConvertTaskResult>) =>
  (config: ConvertConfig) =>
    pool.planTask({ processPath, callback: replyMono_8_16(socket), ...config });
