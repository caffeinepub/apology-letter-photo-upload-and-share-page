import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ApologyLetter } from '../backend';

export function useGetApologyLetter(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<ApologyLetter>({
    queryKey: ['apologyLetter', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getApologyLetter(id);
    },
    enabled: !!actor && !isFetching && !!id,
    retry: false,
  });
}
