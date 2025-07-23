import { Comment } from '../types';

export default function CommentList({ comments }: {
  comments: Comment[];
}) {
  return (
    <ul className="comment-list">
      {Array.isArray(comments) && comments.map((comment) => (
        <li 
          key={comment.id} 
          className="comment-list"
        >
          {comment.content}
        </li>
      ))}
    </ul>
  );
}
