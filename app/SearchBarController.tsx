'use client';

import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';

const SearchBarController = () => {
  const router = useRouter();
  const onSubmit = (formData: FormData) => {
    // FIXME: validate data
    const value = formData.get('search') as string;
    if (!value) return;

    const validatedSearch = value;

    const params = new URLSearchParams();
    params.set('search', validatedSearch);
    router.push(`?${params.toString()}`);
  };

  return <SearchBar onSubmit={onSubmit} />;
};

export default SearchBarController;
