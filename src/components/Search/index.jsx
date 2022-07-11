import React from 'react';
import style from './index.module.scss';
import IconSearch from '../../assets/img/search.svg';

function Search({ searchValue, setSearchValue }) {
  return (
    <div className={style.root}>
      <span>Поиск: </span>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type='text'
        placeholder='Введите название пиццы...'
        className={style.input}
      />
      <img src={IconSearch} alt='search' className={style.icon} />
    </div>
  );
}

export default Search;
