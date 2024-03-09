import { AxiosError } from 'axios';

export type QueryArgs<T = any> = {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
};
