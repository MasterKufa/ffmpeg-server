import { ACTIONS } from './actions';
import { Request, Api } from '@master_kufa/server-tools';
import { ConcatConfig, ConvertConfig, NormalizeVolumeConfig } from './types';

import { createProcess } from './helpers';
import { resolve } from 'path';

const basePath = resolve(__dirname, 'processes');

export const api = new Api({
  [ACTIONS.CONVERT_MP3]: (payload: Request<ConvertConfig>) =>
    createProcess(resolve(basePath, 'convert-to-mp3.js'), payload),
  [ACTIONS.CONCAT_WITH_PAUSE]: async (payload: Request<ConcatConfig>) =>
    createProcess(resolve(basePath, 'concat-with-pause.js'), payload),
  [ACTIONS.NORMALIZE_VOLUME]: async (payload: Request<NormalizeVolumeConfig>) =>
    createProcess(resolve(basePath, 'normalize-volume.js'), payload),
});
