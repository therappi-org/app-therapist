import { AxiosError } from 'axios';

export type QueryArgs<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
};
