import { memo, useState } from 'react';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

import useUpdateTicketStatus from '../hooks/useUpdateTicketStatus';
import useComments from '../hooks/useComments';

import { Ticket } from '../types';

function TicketItem({ ticket }: {
  ticket: Ticket;
}) {
  const updateTicketStatus = useUpdateTicketStatus();
  const [shouldRefetchComments, setShouldRefetchComments] = useState(false);

  const { comments } = useComments(ticket.id, shouldRefetchComments);
  const nowComments = shouldRefetchComments ? comments : ticket.comments;

  console.log(' comments', comments);

  const handleClick = () => {
    updateTicketStatus({
      id: ticket.id,
      status: ticket.status === 'open' ? 'closed' : 'open',
    });
  };

  const handleCommentAdded = () => {
    setShouldRefetchComments(true);
  };

  return (
    <li className="ticket-item">
      <div className="title">{ticket.title}</div>
      <div className="description">{ticket.description}</div>
      <button
        className="status"
        onClick={handleClick}
      >
        {ticket.status === 'open' ? 'Open' : 'Closed'}
      </button>
      <CommentList comments={nowComments} />
      <CommentForm ticketId={ticket.id} onCommentAdded={handleCommentAdded} />
    </li>
  );
}

export default memo(TicketItem);
