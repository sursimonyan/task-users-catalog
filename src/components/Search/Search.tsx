import { useState, memo } from "react";
import cn from "classnames";

import styles from "./Search.module.css";
import { images } from "../../assets/images";

interface SearchProps {
  searchUser: (searchTerm: string) => void;
  clearSearch: () => void;
}

export const Search = memo(({ searchUser, clearSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchUser(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    clearSearch();
  };

  return (
    <form className={cn(styles.search)} onSubmit={onSubmit}>
      <label className={cn(styles.search__inner)} htmlFor="search-input">
        <input
          id="search-input"
          type="text"
          placeholder="Search user..."
          className={cn(styles.search__input)}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search users by name"
        />
        <button className={cn(styles.search__button)} type="submit" aria-label="Submit search">
          <img src={images.SearchIcon} alt="" aria-hidden="true" />
        </button>
        <button className={cn(styles.search__button)} type="button" onClick={handleClear} aria-label="Clear search">
          Clear
        </button>
      </label>
    </form>
  );
});
