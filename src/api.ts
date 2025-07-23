import axios from 'axios';

import { Ticket, Comment } from './types';

export interface TicketListDto {
    tickets: Ticket[];
}

export interface CommentListDto {
    comments: Comment[];
}
  
export const API_BASE_URL = 'https://tickets-api.codedemo.co';


const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
});

export async function fetchTickets(): Promise<TicketListDto> {
  const { data } = await instance.get('/tickets');

  console.log('🌏 fetchTickets', data);

  return data;
}

export async function createTicket({ title, description }: {
  title: string;
  description: string;
}) {
  const { data } = await instance.post('/tickets', { title, description });

  console.log('🌏 createTicket', data);
}

export async function updateTicketStatus({ id, status }: {
    id: string;
    status: 'open' | 'closed';
}) {
  await instance.patch(`/tickets/${id}`, { status });
}
  
export async function createComment({ ticketId, content }: {
  ticketId: string;
  content: string;
}) {
  const { data } = await instance.post(`/tickets/${ticketId}/comments`, { content });

  console.log('🌏 createComment', data);

  return { ticketId, ...data };
}

export async function fetchComments(ticketId: string): Promise<CommentListDto> {
  const { data } = await instance.get(`/tickets/${ticketId}/comments`);

  console.log('🌏 fetchComments', data);

  return data;
}