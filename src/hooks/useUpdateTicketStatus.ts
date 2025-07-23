import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TicketListDto, updateTicketStatus } from '../api';

export default function useUpdateTicketStatus() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateTicketStatus,
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['tickets'] });
      const previousTickets = queryClient.getQueryData(['tickets']);
      queryClient.setQueryData(['tickets'], (old: TicketListDto) => ({
        ...old,
        tickets: (old?.tickets || []).map((ticket) => (
          ticket.id === id
          ? { ...ticket, status }
          : ticket
        )),
      }));
      return { previousTickets };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(['tickets'], context?.previousTickets);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });

  return mutate;
}
