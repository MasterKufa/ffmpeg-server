import { ACTIONS } from './actions';
import { Socket } from 'socket.io';
import { Request, SocketResponse, Api } from '@master_kufa/server-tools';
import { ConcatConfig, ConvertConfig } from './types';
import { mono_8_16Handler } from './helpers/convert-mono-8-16';
import { concatWithPause } from './helpers/concat-with-pause';

export const api = new Api({
  [ACTIONS.CONVERT_MONO_16]: async (
    socket: Socket,
    payload: Request<ConvertConfig>,
  ) => {
    const result = await mono_8_16Handler(payload);

    const successResponse: SocketResponse = {
      requestId: payload.requestId,
      payload: result.success ? 'success' : 'error',
    };

    socket.emit(ACTIONS.CONVERT_MONO_16, successResponse);
  },
  [ACTIONS.CONCAT_WITH_PAUSE]: async (
    socket: Socket,
    payload: Request<ConcatConfig>,
  ) => {
    const result = await concatWithPause({ ...payload, id: payload.requestId });

    const successResponse: SocketResponse = {
      requestId: payload.requestId,
      payload: result.success ? 'success' : 'error',
    };

    socket.emit(ACTIONS.CONCAT_WITH_PAUSE, successResponse);
  },
});
