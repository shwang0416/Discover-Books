import Image from 'next/image';
import Link from 'next/link';
import { Book } from './types';

export type ListItemProps = Book;
const ListItem = ({ title, subtitle, image, url, isbn13 }: ListItemProps) => {
  return (
    <div className="m-4 flex h-full items-start rounded-xl">
      <Link href={url} className="cursor-pointer">
        <Image src={image} width={200} height={200} alt={title} />
      </Link>
      <div className="pt-8">
        <div className="">{title}</div>
        <div className="">{subtitle}</div>
      </div>
      <div className="flex h-full items-center justify-center">
        <Link
          className="text-black underline hover:text-slate-500"
          href={`/${isbn13}`}
        >
          자세히
        </Link>
      </div>
    </div>
  );
};

export default ListItem;
