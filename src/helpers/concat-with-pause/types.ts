export type ConcatWithPauseTask = {
  processPath: string;
  callback: (res: ConcatTaskResult) => void;
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

export type ConcatTaskResult = {
  success: boolean;
  id: string;
};
