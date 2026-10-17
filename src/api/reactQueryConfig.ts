import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
