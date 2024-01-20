'use server';

import { SearchResponse } from './types';

const API_ENDPOINT = 'https://api.itbook.store/1.0';

type getAllBooksActionProps = {
  keyword: string;
};

const getAllBooksAction = async ({ keyword }: getAllBooksActionProps) => {
  const allBooks = [];
  const url = `${API_ENDPOINT}/search/${keyword}`;
  const firstRes = await fetch(url);

  if (firstRes.status !== 200) {
    throw new Error('ERROR: getAllBooksAction failed 1');
  }

  const firstData: SearchResponse = await firstRes.json();
  const total = firstData.total;

  // 첫 번째 페이지 books 저장
  allBooks.push(...firstData.books);

  const secondPage = 2;
  const lastPage = total % 10 === 0 ? total / 10 : total / 10 + 1;
  const urls = [];
  for (let i = secondPage; i <= lastPage; i++) {
    urls.push(`${url}/${i}`);
  }

  try {
    for (const url of urls) {
      const response = await fetch(url);
      const data: SearchResponse = await response.json();
      allBooks.push(data.books);
    }
  } catch (error) {
    throw new Error('ERROR: getAllBooksAction failed 2');
  }
  return allBooks;
};

export default getAllBooksAction;
