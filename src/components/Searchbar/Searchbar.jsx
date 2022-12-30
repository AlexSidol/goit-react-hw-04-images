import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchInfo, setSearchInfo] = useState('');

  const handleSearchInfoChange = evt => {
    setSearchInfo(evt.target.value.toLowerCase());
  };

  const handleSearchInfoSubmit = evt => {
    evt.preventDefault();

    if (searchInfo.trim() === '') {
      toast.info('Enter your request...');
      return;
    }
    onSubmit(searchInfo);
    setSearchInfo('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSearchInfoSubmit}>
        <button type="submit" className={css.searchForm__button}>
          <span className={css.searchForm__label}>Search</span>
        </button>

        <input
          value={searchInfo}
          onChange={handleSearchInfoChange}
          className={css.searchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
