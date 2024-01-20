'use server';

import config from '@/config';
import { Book } from './types';

type getSearchActionProps = {
  keyword: string;
  page: number;
};

type GetSearchResponse = {
  books: Book[];
  page: number;
};
/**
 * Search books by title, author, ISBN or keywords
 */
const getSearchAction = async ({
  keyword,
  page = 1,
}: getSearchActionProps): Promise<GetSearchResponse> => {
  const res = await fetch(
    `${config.itBookStoreApiEndpoint}/search/${keyword}/${page}`,
  );

  if (res.status !== 200) {
    console.log(res);

    throw new Error('ERROR: getSearchAction failed');
  }

  return res.json();
};

export default getSearchAction;
