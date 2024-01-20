import { GetSearchResponse } from '@app/api/search/route';

const getSearch = async (search: string, page: string) => {
  const params = new URLSearchParams();
  params.set('search', search);
  params.set('p', page);

  const res = await fetch(`/api/search/?${params.toString()}`);
  return (await res.json()) as GetSearchResponse;
};

export default getSearch;
