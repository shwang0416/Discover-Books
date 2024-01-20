import getBooksAction from '@app/serverActions/getBooksAction';
import BooksDetail from './BooksDetail';

const Page = async ({ params: { isbn13 } }: { params: { isbn13: string } }) => {
  const book = await getBooksAction({ isbn13 });

  const {
    title,
    subtitle,
    authors,
    publisher,
    pages,
    rating,
    desc,
    price,
    image,
  } = book;

  return (
    <BooksDetail
      title={title}
      subtitle={subtitle}
      authors={authors}
      publisher={publisher}
      pages={pages}
      rating={rating}
      desc={desc}
      price={price}
      image={image}
    />
  );
};

export default Page;
