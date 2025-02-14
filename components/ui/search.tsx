import { TextInput } from "flowbite-react";
import React from "react";
import { HiSearch } from "react-icons/hi";

interface searchProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchPage: React.FC<searchProps> = ({ search, setSearch }) => {
  return (
    <form action="https://formbold.com/s/unique_form_id" method="POST">
      <TextInput
        icon={HiSearch}
        type="text"
        placeholder="Type to search..."
        className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};
export default SearchPage;
