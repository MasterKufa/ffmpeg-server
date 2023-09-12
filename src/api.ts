import { ACTIONS } from './actions';
import { Request, Api } from '@master_kufa/server-tools';
import { ConcatConfig, ConvertConfig } from './types';

import { createProcess } from './helpers';
import { resolve } from 'path';

const basePath = resolve('.', 'processes');

export const api = new Api({
  [ACTIONS.CONVERT_MONO_16]: (payload: Request<ConvertConfig>) =>
    createProcess(resolve(basePath, 'convert-to-wav'), payload),
  [ACTIONS.CONCAT_WITH_PAUSE]: async (payload: Request<ConcatConfig>) =>
    createProcess(resolve(basePath, 'concat-with-pause'), payload),
});
