'use server';

import config from '@/config';

type getBooksActionProps = {
  keyword: string;
  page: number;
};
const getBooksAction = async ({ keyword, page = 1 }: getBooksActionProps) => {
  const res = await fetch(
    `${config.itBookStoreApiEndpoint}/search/${keyword}/${page}`,
  );

  if (res.status !== 200) {
    console.log(res);

    throw new Error('ERROR: getBooksAction failed');
  }

  return res.json();
};

export default getBooksAction;
