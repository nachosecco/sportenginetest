import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getMatch from '@wasp/queries/getMatch';
import getStat from '@wasp/queries/getStat';
import createStat from '@wasp/actions/createStat';

export function Match() {
  const { matchId } = useParams();
  const { data: match, isLoading: isMatchLoading, error: matchError } = useQuery(getMatch, { id: matchId });
  const { data: stats, isLoading: isStatsLoading, error: statsError } = useQuery(getStat, { matchId: matchId });
  const createStatFn = useAction(createStat);

  if (isMatchLoading || isStatsLoading) return 'Loading...';
  if (matchError || statsError) return 'Error: ' + (matchError || statsError);

  const handleCreateStat = () => {
    createStatFn({ matchId: match.id, value: 5, type: 'Tackle Success' });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Match Details</h1>
      <h2 className='text-lg font-bold mb-2'>Date: {match.date}</h2>
      <h2 className='text-lg font-bold mb-2'>Teams:</h2>
      <ul>
        {match.teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
      <h2 className='text-lg font-bold mb-2'>Players:</h2>
      <ul>
        {match.users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      <h2 className='text-lg font-bold mb-2'>Stats:</h2>
      <ul>
        {stats.map((stat) => (
          <li key={stat.id}>{stat.type}: {stat.value}</li>
        ))}
      </ul>
      <button
        onClick={handleCreateStat}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Create Stat
      </button>
    </div>
  );
}