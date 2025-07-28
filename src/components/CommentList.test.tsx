import { describe, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import CommentList from './CommentList';

import { Comment } from '../types';

describe('CommentList', () => {
  const comments: Comment[] = [
    {
      id: 'comment-1',
      content: 'First Comment',
    },
    {
      id: 'comment-2',
      content: 'Second Comment',
    },
  ];

  function renderCommentList(commentsData = comments) {
    render(<CommentList comments={commentsData} />);
  }

  it('renders comments', () => {
    renderCommentList();

    screen.getByText(/First Comment/);
    screen.getByText(/Second Comment/);
  });

  it('renders empty list when no comments', () => {
    renderCommentList([]);

    screen.getByRole('list');
  });
});