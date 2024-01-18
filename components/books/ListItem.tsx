import Image from 'next/image';
import Link from 'next/link';
import { Book } from './types';

export type ListItemProps = Omit<Book, 'isbn13'>;
const ListItem = ({ title, subtitle, image, url }: ListItemProps) => {
  return (
    <div className="flex items-start">
      <Link href={url} className="cursor-pointer">
        <Image src={image} width={200} height={200} alt={title} />
      </Link>
      <div className="pt-8">
        <div className="">{title}</div>
        <div className="">{subtitle}</div>
      </div>
    </div>
  );
};

export default ListItem;
