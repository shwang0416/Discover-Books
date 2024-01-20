'use server';

import config from '@/config';

type getBooksActionProps = {
  isbn13: string;
};
type getBooksActionResponse = {
  error: string;
  title: string;
  subtitle: string;
  authors: string;
  publisher: string;
  isbn10: string;
  isbn13: string;
  pages: string;
  year: string;
  rating: string;
  desc: string;
  price: string;
  image: string;
  url: string;
};
/**
 * Get book details by ISBN
 * @param isbn13
 */
const getBooksAction = async ({
  isbn13,
}: getBooksActionProps): Promise<getBooksActionResponse> => {
  const res = await fetch(`${config.itBookStoreApiEndpoint}/books/${isbn13}`);

  if (res.status !== 200) {
    throw new Error('ERROR: getBooksAction failed');
  }

  return res.json();
};

export default getBooksAction;
