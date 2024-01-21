import Image from 'next/image';
import Link from 'next/link';
import { Book } from './types';

export type ListItemProps = Book & { index: number };
const ListItem = ({
  title,
  subtitle,
  image,
  url,
  isbn13,
  index,
}: ListItemProps) => {
  return (
    <li className="m-4 flex h-full flex-row items-start border-b">
      <Link
        href={`/${isbn13}`}
        className="h-[250px] w-[200px] min-w-[250px] cursor-pointer overflow-hidden "
      >
        <Image
          src={image}
          width="199"
          height="199"
          alt={title}
          className="h-auto w-[200px] object-cover"
          priority={index < 5}
        />
      </Link>
      <div className="h-full min-w-[250px] pt-8">
        <Link href={`/${isbn13}`} className="text-md font-medium">
          {title}
        </Link>
        <p className="mb-2 mt-1 text-sm font-light text-slate-600">
          {subtitle}
        </p>
        <div className="">
          <Link
            className="text-md mt-2 font-light text-black underline hover:text-slate-400"
            href={url}
            target="_blank"
          >
            shop
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
