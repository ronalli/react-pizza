import React from 'react';
import style from './index.module.scss';
import iconSearch from '../../assets/img/search.svg';
import iconCancel from '../../assets/img/cancel.svg';

function Search({ searchValue, setSearchValue }) {
  return (
    <div className={style.root}>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type='text'
        placeholder='Введите название пиццы...'
        className={style.input}
      />
      <img src={iconSearch} alt='search' className={style.search} />
      {searchValue && (
        <img
          src={iconCancel}
          alt='cancel'
          className={style.cancel}
          onClick={() => setSearchValue('')}
        />
      )}
    </div>
  );
}

export default Search;
