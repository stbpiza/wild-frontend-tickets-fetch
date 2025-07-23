import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchTickets } from '../api';

export default function useTickets() {
  const {
    data, error, isFetching
  } = useSuspenseQuery({ 
    queryKey: ['tickets'], 
    queryFn: fetchTickets,
    retry: 0,
  });

  if (error && !isFetching) {
    throw error;
  }

  console.log('🪝 useTickets', data);

  const tickets = data?.tickets || [];

  return { tickets };
}
