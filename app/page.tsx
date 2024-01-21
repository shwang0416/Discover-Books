'use client';

import List from '@components/search/List';
import { Book } from './serverActions/types';
import BeforeSearch from '@components/search/BeforeSearch';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useGetSearch } from './lib/react-query/useGetSearch';
import { useMemo } from 'react';
import LoadingSpinner from '@components/LoadingSpinner';
import delay from '@/utils/delay';

const Page = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const { data, isError, hasNextPage, isFetching, isPending, fetchNextPage } =
    useGetSearch(search);

  const ref = useIntersectionObserver({
    onIntersect: async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        await delay(3000);
        fetchNextPage();
      }
    },
  });

  const books = useMemo(
    () => (data ? data.pages.flatMap(({ books }) => books) : []),
    [data],
  );

  if (!search) return <BeforeSearch />;

  if (isPending) return <LoadingSpinner />;

  if (!data || isError) throw new Error('search 데이터를 가져오는데 실패함');

  return (
    <>
      <List books={books as Book[]} />
      {isFetching && (
        <div className="h-20">
          <LoadingSpinner />
        </div>
      )}
      <div className="h-4" ref={ref} />
    </>
  );
};
export default Page;
