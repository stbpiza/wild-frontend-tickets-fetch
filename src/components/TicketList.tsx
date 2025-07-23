import TicketItem from './TicketItem';

import { Ticket } from '../types';

import useTickets from '../hooks/useTickets';

export default function TicketList() {
  const { tickets } = useTickets();

  return (
    <ul className="ticket-list">
      {tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          ticket={ticket}
          // dispatch={() => {}}
        />
      ))}
    </ul>
  );
}
