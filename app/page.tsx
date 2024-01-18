import List from '../components/books/List';
import getBooksAction from './serverActions/getBooksAction';

export const dynamic = 'force-dynamic';

const Page = async ({
  searchParams: { search, p },
}: {
  searchParams: { search: string; p: number };
}) => {
  const { total, books, page, error } = await getBooksAction({
    keyword: search,
    page: p,
  });

  if (error !== '0') throw new Error('ERROR: getBooksAction sent error');

  // loading UI 확인 용
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return <List total={total} books={books} page={page} />;
};

export default Page;
