import { Suspense } from 'react';
import './globals.css';
import Loading from './loading';
import SearchBarController from './SearchBarController';
import Provider from './lib/react-query/Provider';

export const metadata = {
  title: 'Discover books',
  description: 'Book search page to search for books in itbook.store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="mx-auto flex h-full max-w-[1200px] flex-col">
            <div className="mr-20">
              <div className="mb-12 mt-16 flex min-w-[550px] flex-row justify-between">
                <h2 className="ml-12 text-4xl font-semibold">Itbook</h2>
                <div className="">
                  <SearchBarController />
                </div>
              </div>
              <div className="h-full flex-grow">
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
