import { beforeEach, describe, expect, it, vi } from 'vitest';
import nock from 'nock';

import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import TicketItem from './TicketItem';

import { API_BASE_URL } from '../api';

import { Ticket } from '../types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const context = describe;

describe('TicketItem', () => {
  let requestTicketId = '';

  const ticket: Ticket = {
    id: 'ticket-1',
    title: 'TITLE',
    description: 'DESCRIPTION',
    status: 'open',
    comments: [
      { id: 'comment-1', content: 'COMMENT' },
    ],
  };

  beforeEach(() => {
    requestTicketId = '';

    nock(API_BASE_URL)
      .patch(`/tickets/${ticket.id}`)
      .reply(200, (uri, body: any) => {
        const parts = uri.split('/');
        requestTicketId = parts[parts.length - 1];
        return {
          ...ticket,
          status: body.status,
        };
      });
  });

  function renderTicketItem() {
    const queryClient = new QueryClient();

    render((
      <QueryClientProvider client={queryClient}>
        <TicketItem ticket={ticket} />
      </QueryClientProvider>
    ));
  }

  it('renders title and description', () => {
    renderTicketItem();

    screen.getByText('TITLE');
    screen.getByText('DESCRIPTION');
  });

  it('renders comments', () => {
    renderTicketItem();

    screen.getByText('COMMENT');
  });

  context('when user clicks toggle button', () => {
    it('calls API', async () => {
      renderTicketItem();

      fireEvent.click(screen.getByRole('button', { name: /Open/ }));

      await waitFor(() => {
        expect(requestTicketId).toBe(ticket.id);
      });
    });
  });
});
