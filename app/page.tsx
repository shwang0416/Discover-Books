import EmptyList from '@/components/search/EmptyList';
import List from '../components/search/List';
import ListController from './ListController';
import getBooksAction from './serverActions/getBooksAction';
import { Operator } from '@/components/search/types';
import getAllBooksAction from './serverActions/getAllBooksAction';

export const dynamic = 'force-dynamic';

const keywordParser = (
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

const Page = async ({
  searchParams: { search, p },
}: {
  searchParams: { search: string; p: number };
}) => {
  if (!search) return <EmptyList />;

  const { keyword1, keyword2, operator } = keywordParser(search);
  const res1 = await getBooksAction({
    keyword: keyword1,
    page: p,
  });

  if (!keyword2 || !operator) {
    const { books, page } = res1;
    return <List books={books} page={page} />;
  }

  let res2Books;

  if (operator === '|') {
    const { books } = await getBooksAction({
      keyword: keyword2,
      page: p,
    });
    res2Books = [...books];
  }
  // FIXME: 만약 연산자 "-"라면 total개수 모두 가져와야함 => getAllBooksAction
  else {
    res2Books = await getAllBooksAction({
      keyword: keyword2,
    });
  }

  // loading UI 확인 용
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <ListController
      operator={operator}
      page={1}
      books1={res1.books}
      books2={res2Books}
    />
  );
};

export default Page;
