import { pool } from './pool';
import { Task, TaskResult } from './types';

export const createProcess = (processPath: string, config: object) =>
  new Promise<TaskResult>((resolve) =>
    pool.planTask({ processPath, callback: resolve, ...config }),
  );
