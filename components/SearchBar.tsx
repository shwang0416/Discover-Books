'use client';

import FormButton from './FormButton';
import FormLoading from './FormLoading';

type SearchBarProps = {
  onSubmit: (formData: FormData) => void;
};

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  return (
    <div className="">
      <form action={onSubmit} className="">
        <input id="search" name="search" type="text" className="" />
        <FormButton text={'Search'} />
        <FormLoading />
      </form>
    </div>
  );
};

export default SearchBar;
