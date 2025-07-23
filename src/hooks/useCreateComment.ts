import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createComment, CommentListDto } from '../api';

export default function useCreateComment() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createComment,
    onMutate: async ({ ticketId, content }) => {
      await queryClient.cancelQueries({ queryKey: ['comments', ticketId] });
      const previousComments = queryClient.getQueryData(['comments', ticketId]);
      queryClient.setQueryData(['comments', ticketId], (old: CommentListDto | undefined) => ({
        comments: [
          ...(old?.comments || []),
          {
            id: '',
            content,
          },
        ],
      }));
      return { previousComments };
    },
    onError: (error, { ticketId }, context: any) => {
      console.log('🚨 Error:', error);
      queryClient.setQueryData(['comments', ticketId], context.previousComments);
    },

    onSettled: ({ ticketId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', ticketId] });
    },
  });


  return mutate;
}
