import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
