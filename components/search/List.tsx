'use client';

import ListItem from './ListItem';
import { Book } from './types';

export type ListProps = {
  books: Book[];
  page: number;
};

const List = ({ books, page }: ListProps) => {
  return (
    <div className="">
      <div className="">page : {page}</div>

      {/* 무한스크롤 처리 */}
      <div className="">
        {books.map(({ title, subtitle, image, url, isbn13 }) => (
          <ListItem
            title={title}
            subtitle={subtitle}
            image={image}
            url={url}
            isbn13={isbn13}
            key={isbn13}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
