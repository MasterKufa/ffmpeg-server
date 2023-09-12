export type ConvertConfig = {
  input: string;
  output: string;
  id: string;
};

export type ConcatConfig = {
  inputSource1: string;
  inputSource2: string;
  pauseMs: number;
  outputPath: string;
  id: string;
};

export type TaskResult = {
  success: boolean;
  id: string;
};

export type Task = {
  processPath: string;
  callback: (res: TaskResult) => void;
  id: string;
  input: string;
  output: string;
};

export type ConcatWithPauseTask = {
  processPath: string;
  callback: (res: TaskResult) => void;
  id: string;
  inputSource1: string;
  inputSource2: string;
  inputSource1Times: number;
  inputSource2Times: number;
  repeatSourceDelay: number;
  repeatTargetDelay: number;
  pauseMs: number;
  outputPath: string;
};
