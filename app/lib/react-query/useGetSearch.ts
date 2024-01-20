import getSearch from '@app/services/getSearch';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetSearch = (search: string) => {
  return useInfiniteQuery({
    queryKey: ['search', search],
    queryFn: ({ pageParam = 1 }) => getSearch(search, pageParam.toString()),
    initialPageParam: 1,
    getNextPageParam: ({ isLastPage, page }) =>
      isLastPage ? undefined : page + 1,
  });
};
