import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getTask from '@wasp/queries/getTask';

export function TaskPage() {
  const { taskId } = useParams();
  const { data: task, isLoading, error } = useQuery(getTask, { id: taskId });
  const markTaskCompleteFn = useAction(markTaskComplete);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleMarkComplete = () => {
    markTaskCompleteFn({ id: task.id });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Task Details</h1>
      <p>Description: {task.description}</p>
      <p>Is Complete: {task.isComplete ? 'Yes' : 'No'}</p>
      {!task.isComplete && (
        <button
          onClick={handleMarkComplete}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Mark as Complete
        </button>
      )}
    </div>
  );
}