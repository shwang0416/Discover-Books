import ListItem from './ListItem';
import { Book } from './types';

export type ListProps = {
  total: number;
  books: Book[];
  page: number;
};

const List = ({ total, books, page }: ListProps) => {
  return (
    <div className="">
      <div className="">total : {total}</div>
      <div className="">page : {page}</div>

      {/* 무한스크롤 처리 */}
      <div className="">
        {books.map(({ title, subtitle, image, url, isbn13 }) => (
          <ListItem
            title={title}
            subtitle={subtitle}
            image={image}
            url={url}
            key={isbn13}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
