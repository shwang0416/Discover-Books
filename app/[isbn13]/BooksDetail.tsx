import Image from 'next/image';

type BooksDetailProps = {
  title: string;
  subtitle: string;
  authors: string;
  publisher: string;
  pages: string;
  rating: string;
  desc: string;
  price: string;
  image: string;
};

const BooksDetail = ({
  title,
  subtitle,
  authors,
  publisher,
  pages,
  rating,
  desc,
  price,
  image,
}: BooksDetailProps) => {
  return (
    <div className="">
      <div className="">title: {title}</div>
      <div className="">subtitle: {subtitle}</div>
      <div className="">authors: {authors}</div>
      <div className="">publisher: {publisher}</div>
      <div className="">pages: {pages}</div>
      <div className="">rating: {rating}</div>
      <div className="">desc: {desc}</div>
      <div className="">price: {price}</div>
      <Image src={image} width={500} height={500} alt={title} />
    </div>
  );
};

export default BooksDetail;
