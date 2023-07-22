export type ConvertTask = {
  processPath: string;
  callback: (res: ConvertTaskResult) => void;
  id: string;
  inputName: string;
  outputName: string;
};

export type ConvertTaskResult = {
  success: boolean;
  id: string;
};
