'use server';

import config from '@/config';
import { Book } from './types';

type GetSearchActionProps = {
  keyword: string;
  page: number;
};

type GetSearchActionResponse = {
  books: Book[];
  page: string;
  total: number;
};
/**
 * Search books by title, author, ISBN or keywords
 */
const getSearchAction = async ({
  keyword,
  page = 1,
}: GetSearchActionProps): Promise<GetSearchActionResponse> => {
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
