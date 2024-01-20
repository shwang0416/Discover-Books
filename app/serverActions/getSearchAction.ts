'use server';

import config from '@/config';

type getSearchActionProps = {
  keyword: string;
  page: number;
};
const getSearchAction = async ({ keyword, page = 1 }: getSearchActionProps) => {
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
