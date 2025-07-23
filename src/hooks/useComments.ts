import { useQuery } from '@tanstack/react-query';

import { fetchComments } from '../api';

export default function useComments(ticketId: string, shouldFetch: boolean) {

  const {
    data, error, isFetching
  } = useQuery({
    queryKey: ['comments', ticketId],
    queryFn: () => fetchComments(ticketId),
    retry: 0,
    enabled: shouldFetch,
  });

  if (error && !isFetching) {
    throw error;
  }

  console.log(' shouldFetch', shouldFetch);

  console.log('🪝 useComments', data);

  const comments = data || [];

  return { comments };
}