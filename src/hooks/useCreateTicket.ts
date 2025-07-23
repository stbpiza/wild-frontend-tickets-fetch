import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTicket, TicketListDto } from '../api';

export default function useCreateTicket() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createTicket,
    onMutate: async ({ title, description }) => {
      await queryClient.cancelQueries({ queryKey: ['tickets'] });
      const previousTickets = queryClient.getQueryData(['tickets']);
      queryClient.setQueryData(['tickets'], (old: TicketListDto) => ({
        ...old,
        tickets: [
          ...old?.tickets || [],
          {
            id: '',
            title,
            description,
            status: 'open',
            comments: [],
          },
        ],
      }));
      return { previousTickets };
    },
    onError: (error, _variables, context: any) => {
      console.log('🚨 Error:', error);
      queryClient.setQueryData(['tickets'], context.previousTickets);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });

  return mutate;
}
