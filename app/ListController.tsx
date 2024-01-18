'use client';

import List from '@/components/books/List';
import { Book, Operator } from '@/components/books/types';
import { useEffect, useState } from 'react';

type ListControllerProps = {
  books1: Book[];
  books2: Book[];
  operator: Operator;
  page: number;
};

const ListController = ({
  books1,
  books2,
  operator,
  page,
}: ListControllerProps) => {
  const [mergedBooks, setMergedBooks] = useState<Book[]>([]);
  useEffect(() => {
    if (operator === '|') {
      const mergedSet = new Set(
        [...books1, ...books2].map((item) => item.isbn13),
      );
      // Set을 배열로 변환
      const mergedArray = Array.from(mergedSet).map((isbn13) => {
        // 여러 배열에서 중복된 isbn13을 가진 객체 중 하나를 선택
        const matchingObject = [...books1, ...books2].find(
          (item) => item.isbn13 === isbn13,
        );
        return matchingObject;
      }) as Book[];
      setMergedBooks(mergedArray);
    } else if (operator === '-') {
      const books2Ibsn13s = books2.map((book) => book.isbn13);
      const fillterdArray = books1.filter(
        (book) => !books2Ibsn13s.includes(book.isbn13),
      );
      setMergedBooks(fillterdArray);
    }
  }, [books1, books2]);

  //   useEffect(() => {
  //     console.log(books1);
  //     console.log(books2);
  //     console.log(mergedBooks);
  //   }, [books1, books2, mergedBooks]);

  return <List books={mergedBooks} page={page} />;
};

export default ListController;
