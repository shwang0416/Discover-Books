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
    <div className="flex flex-row">
      <div className="min-w-[300px]">
        <Image
          src={image}
          width={299}
          height={299}
          className="h-auto w-[300px]"
          alt={title}
          priority
        />
      </div>
      <div className="mt-12">
        <h1 className="mb-5 text-3xl font-semibold">{title}</h1>
        <h4 className="mb-5 text-xl font-normal">{subtitle}</h4>
        <div className="mb-1 text-sm">
          <strong className="font-semibold text-slate-600">{authors}</strong>
          <span className="ml-2 ">authors</span>
        </div>
        <div className="mb-1 text-sm text-slate-600">
          <strong className="font-semibold">{publisher}</strong>
          <span className="ml-2 ">publisher</span>
        </div>
        <div className="mb-4 text-sm text-slate-600">
          <span className="">{pages}p</span>
        </div>
        <div className="mb-10">
          {'⭐'.repeat(parseInt(rating))}

          <span className="ml-1 text-sm font-light text-orange-600">
            {parseInt(rating).toFixed(1)}
          </span>
        </div>
        <div className="mb-10 font-light text-slate-600">{desc}</div>
        <div className="text-2xl font-medium">{price}</div>
      </div>
    </div>
  );
};

export default BooksDetail;
