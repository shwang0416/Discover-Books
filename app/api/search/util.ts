import { Operator } from '@components/search/types';

export const keywordParser = (
  search: string,
): {
  keyword1: string;
  keyword2: string | null;
  operator: Operator | null;
} => {
  if (search.includes('|')) {
    const [keyword1, keyword2] = search.split('|', 2);
    return {
      keyword1,
      keyword2,
      operator: '|',
    };
  } else if (search.includes('-')) {
    const [keyword1, keyword2] = search.split('-', 2);
    return {
      keyword1,
      keyword2,
      operator: '-',
    };
  } else {
    return {
      keyword1: search,
      keyword2: null,
      operator: null,
    };
  }
};
