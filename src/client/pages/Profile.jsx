import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUser from '@wasp/queries/getUser';
import getStat from '@wasp/queries/getStat';
import getTask from '@wasp/queries/getTask';

export function ProfilePage() {
  const { userId } = useParams();
  const { data: user, isLoading: userLoading, error: userError } = useQuery(getUser, { id: userId });
  const { data: stat, isLoading: statLoading, error: statError } = useQuery(getStat, { userId });
  const { data: task, isLoading: taskLoading, error: taskError } = useQuery(getTask, { userId });

  if (userLoading || statLoading || taskLoading) return 'Loading...';
  if (userError) return 'Error: ' + userError;
  if (statError) return 'Error: ' + statError;
  if (taskError) return 'Error: ' + taskError;

  return (
    <div>
      <h1>{user?.username}'s Profile</h1>
      <h2>Statistics</h2>
      <p>{user?.username} has {stat?.value} {stat?.type}</p>
      <h2>Tasks</h2>
      <ul>
        {task?.map((task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
      <Link to={`/edit-profile/${userId}`}>Edit Profile</Link>
    </div>
  );
}