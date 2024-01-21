'use client';

import ListItem from './ListItem';
import { Book } from './types';

export type ListProps = {
  books: Book[];
};

const List = ({ books }: ListProps) => {
  return (
    <ul className="">
      {books.map(({ title, subtitle, image, url, isbn13 }, index) => (
        <ListItem
          title={title}
          subtitle={subtitle}
          image={image}
          url={url}
          isbn13={isbn13}
          key={isbn13}
          index={index}
        />
      ))}
    </ul>
  );
};

export default List;
