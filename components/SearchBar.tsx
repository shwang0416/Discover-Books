'use client';

import FormButton from './FormButton';
import FormLoading from './FormLoading';

type SearchBarProps = {
  onSubmit: (formData: FormData) => void;
};

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  return (
    <div className="">
      <form action={onSubmit} className="flex flex-row gap-x-2">
        <input
          id="search"
          name="search"
          type="text"
          className="h-10 rounded-md bg-slate-100 px-2 focus:outline-none focus:ring-0"
        />
        <FormButton text={'Search'} />
      </form>
    </div>
  );
};

export default SearchBar;
