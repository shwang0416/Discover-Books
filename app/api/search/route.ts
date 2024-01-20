import { isLastPage, keywordParser } from './util';
import getSearchAction from '@app/serverActions/getSearchAction';
import getAllSearchAction from '@app/serverActions/getAllSearchAction';
import { Book } from '@/components/search/types';
import { NextRequest, NextResponse } from 'next/server';

export type GetSearchResponse = {
  books: Book[] | null;
  page: number;
  isLastPage: boolean;
};

/**
 * ?search=[검색어]&p=[페이지]
 *
 *@returns
 * - 검색어가 없으면 books:null, page:null
 * - 이하 모두 books, page에 해당 타입 리턴
 *
 * - 검색어를 파싱했을 때 operator("|" or "-")가 없으면 단일 검색 리턴
 * - 검색어를 파싱했을 때 operator가 "|"면 검색어 A와 B의 페이지 p를 가져온 뒤 합집합 리턴
 * - 검색어를 파싱했을 때 operator가 "-"면 검색어 A의 페이지p 와 B의 리스트 전체(total)를 가져와 A-B한 차집합 리턴
 */
export async function GET(request: NextRequest): Promise<
  | NextResponse<{
      error: string;
    }>
  | NextResponse<GetSearchResponse>
> {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search');

  if (!search) {
    return NextResponse.json({
      books: null,
      page: 0,
      isLastPage: true,
      total: 0,
    });
  }

  const page = parseInt(searchParams.get('p') ?? '1');

  const { keyword1, keyword2, operator } = keywordParser(search);

  const res1 = await getSearchAction({
    keyword: keyword1,
    page,
  });

  // [operator 없는 검색]
  if (!keyword2 || !operator) {
    const { books, total } = res1;
    return NextResponse.json({
      books,
      page,
      total,
      isLastPage: isLastPage(total, books?.length as number, page),
    });
  }

  const books1 = res1.books;

  if (operator === '|') {
    const { books: books2, total } = await getSearchAction({
      keyword: keyword2,
      page,
    });

    const mergedSet = new Set(
      [...books1, ...books2].map((item) => item.isbn13),
    );
    // Set을 배열로 변환
    const mergedArray = Array.from(mergedSet).map((isbn13) => {
      // 여러 배열에서 중복된 isbn13을 가진 객체 중 하나를 선택
      const matchingObject = [...books1, ...books2].find(
        (item) => item.isbn13 === isbn13,
      );
      return matchingObject;
    }) as Book[];

    return NextResponse.json({
      books: mergedArray,
      page,
      isLastPage:
        isLastPage(res1.total, books1?.length as number, page) &&
        isLastPage(total, books2?.length as number, page),
    });
  } else {
    const books2 = await getAllSearchAction({
      keyword: keyword2,
    });
    const books2Ibsn13s = books2.map((book) => book.isbn13);
    const fillterdArray = books1.filter(
      (book) => !books2Ibsn13s.includes(book.isbn13),
    );

    return NextResponse.json({
      books: fillterdArray,
      page,
      isLastPage: isLastPage(res1.total, books1?.length as number, page),
    });
  }
}
