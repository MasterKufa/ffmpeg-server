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
