import nock from 'nock';

import { beforeEach, describe, it } from 'vitest';

import { render, screen, waitFor } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import TicketList from './TicketList';

import { API_BASE_URL, TicketListDto } from '../api';

describe('TicketList', () => {
  beforeEach(() => {
    const responseBody: TicketListDto = {
      tickets: [
        {
          id: 'ticket-1',
          title: 'Ticket #1',
          description: 'Ticket Description',
          status: 'open',
          comments: [
            {
              id: 'comment-1',
              content: 'Comment Content',
            },
          ],
        }
      ],
    };

    nock(API_BASE_URL)
      .get('/tickets')
      .reply(200, responseBody);
  });

  function renderTicketList() {
    const queryClient = new QueryClient();

    render((
      <QueryClientProvider client={queryClient}>
        <TicketList />
      </QueryClientProvider>
    ));
  }

  it('renders tickets', async () => {
    renderTicketList();

    await waitFor(() => {
      screen.getByText(/Ticket #1/);
    });
  });

  it('renders comments', async () => {
    renderTicketList();

    await waitFor(() => {
      screen.getByText(/Comment Content/);
    });
  });
});
