export type ConvertTask = {
  processPath: string;
  callback: (res: ConvertTaskResult) => void;
  id: string;
  input: string;
  output: string;
};

export type ConvertTaskResult = {
  success: boolean;
  id: string;
};
