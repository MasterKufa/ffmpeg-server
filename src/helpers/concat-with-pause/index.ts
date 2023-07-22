import { resolve } from 'path';
import { pool } from '../../pool';
import { ConcatTaskResult, ConcatWithPauseTask } from './types';
import { ConcatConfig } from '../../types';

const processPath = resolve('.', 'process');

export const concatWithPause = (config: ConcatConfig) =>
  new Promise<ConcatTaskResult>((resolve) => {
    pool.planTask({
      processPath,
      callback: resolve,
      ...config,
    } as ConcatWithPauseTask);
  });
