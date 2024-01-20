export type SearchResponse = {
  total: number;
  books: Book[];
  page: number;
};

export type Book = {
  isbn13: string;
  title: string;
  subtitle: string;
  image: string;
  url: string;
};
