import nock from 'nock';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CommentForm from './CommentForm';

import { API_BASE_URL } from '../api';

import { Comment } from '../types';

const context = describe;

describe('CommentForm', () => {
  let requestBody: any = null;
  const mockOnCommentAdded = vi.fn();

  const comment: Comment = {
    id: 'comment-1',
    content: 'New Comment',
  };

  beforeEach(() => {
    requestBody = null;
    mockOnCommentAdded.mockClear();

    nock(API_BASE_URL)
      .post('/tickets/ticket-1/comments')
      .reply(201, (_uri, body) => {
        requestBody = body;
        return comment;
      });
  });

  function renderCommentForm() {
    const queryClient = new QueryClient();

    render((
      <QueryClientProvider client={queryClient}>
        <CommentForm ticketId="ticket-1" onCommentAdded={mockOnCommentAdded} />
      </QueryClientProvider>
    ));
  }

  context('when user fills and submits a new comment', () => {
    it('calls API', async () => {
      renderCommentForm();

      fireEvent.change(screen.getByRole('textbox', { name: /Comment/ }), {
        target: { value: 'New Comment' },
      });
      fireEvent.click(screen.getByRole('button', { name: /Add Comment/ }));

      await waitFor(() => {
        expect(requestBody).toBeTruthy();
        expect(requestBody.content).toBe('New Comment');
      });
    });
  });
});