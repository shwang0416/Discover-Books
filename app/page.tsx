'use client';

import List from '@components/search/List';
import { Book } from './serverActions/types';
import BeforeSearch from '@components/search/BeforeSearch';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useGetSearch } from './lib/react-query/useGetSearch';
import { useMemo } from 'react';

/**
 * 기존 page를 클라이언트 컴포넌트로 변경
 *
 * <이유>
    가져온 책 데이터를 클라이언트 사이드에서 잘 보존하고있어야하는데 
    Listcontroller가 다시 마운트되면서 들고있던 state가 날아감
    클라이언트 사이드에서 데이터를 가져온 뒤 

 *  -> books 계산 로직까지 route handler+서버가 담당하게 하고, 서버캐시+무한스크롤을 react-query에게 맡기자
 */

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
        fetchNextPage();
      }
    },
  });

  const books = useMemo(
    () => (data ? data.pages.flatMap(({ books }) => books) : []),
    [data],
  );

  if (!search) return <BeforeSearch />;

  if (isPending) return <div className="">loading ... </div>;

  if (!data || isError) throw new Error('search 데이터를 가져오는데 실패함');

  return (
    <>
      <List books={books as Book[]} />
      <div className="h-20 bg-pink-300" ref={ref}>
        Target
      </div>
    </>
  );
};
export default Page;
