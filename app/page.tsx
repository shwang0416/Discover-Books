'use client';

import EmptyList from '@components/search/EmptyList';
import List from '@components/search/List';
import { useEffect, useState } from 'react';

/**
 * 기존 page를 클라이언트 컴포넌트로 변경
 *
 * <이유>
    가져온 책 데이터를 클라이언트 사이드에서 잘 보존하고있어야하는데 
    Listcontroller가 다시 마운트되면서 들고있던 state가 날아감
    클라이언트 사이드에서 데이터를 가져온 뒤 

 *  -> books 계산 로직까지 route handler+서버가 담당하게 하고, 서버캐시+무한스크롤을 react-query에게 맡기자
 */
const Page = ({ searchParams }: { searchParams: any }) => {
  const [books, setBooks] = useState(null);
  useEffect(() => {
    const asyncFunc = async () => {
      const res = await fetch(`/api/search/${window.location.search}`);
      const result = await res.json();
      setBooks(result.books);
      // console.log(result.books);
    };
    asyncFunc();
  }, [searchParams]);

  if (!books) return <EmptyList />;
  return <List books={books} />;
};
export default Page;
