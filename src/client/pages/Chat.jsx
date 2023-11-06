import React from 'react';
import { useParams } from 'react-router-dom';


export function ChatPage() {
  const { userId } = useParams();

  return (
    <div>
      <h1>Chat with user {userId}</h1>
      {/* Implement chat interface here */}
    </div>
  );
}