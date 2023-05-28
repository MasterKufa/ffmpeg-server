import { ExecException, exec } from 'child_process';
import { Socket } from 'socket.io';
import { ACTIONS } from '../../constants';
import { ConvertConfig } from '../../types';

export const buildCmdMono_8_16 = (input: string, output: string) =>
  `ffmpeg -i "/app/input/${input}" -y "/app/output/${output}" -ar 8000 -ac 1 -acodec pcm_s16le`;

export const replyMono_8_16 =
  (socket: Socket, config: ConvertConfig) => (err: ExecException) =>
    socket.emit(ACTIONS.mono_8_16, {
      success: Boolean(err),
      id: config.id,
    });

export const mono_8_16Handler = (socket: Socket) => (config: ConvertConfig) =>
  exec(
    buildCmdMono_8_16(config.inputName, config.outputName),
    replyMono_8_16(socket, config),
  );
