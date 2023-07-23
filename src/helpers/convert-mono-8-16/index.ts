import { ConvertConfig } from '../../types';
import { resolve } from 'path';
import { pool } from '../../pool';
import { ConvertTask, ConvertTaskResult } from './types';

const processPath = resolve(__dirname, 'process');

export const mono_8_16Handler = (config: ConvertConfig) =>
  new Promise<ConvertTaskResult>((resolve) => {
    pool.planTask({ processPath, callback: resolve, ...config } as ConvertTask);
  });
