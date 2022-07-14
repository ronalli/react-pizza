import React, { useState, useContext, useRef, useCallback } from 'react';
import { AppContext } from '../../App';
import style from './index.module.scss';
import iconSearch from '../../assets/img/search.svg';
import iconCancel from '../../assets/img/cancel.svg';
import debounce from 'lodash.debounce';

function Search() {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(AppContext);
  const inputRef = useRef();

  const clearInput = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 200),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={style.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        type='text'
        placeholder='Введите название пиццы...'
        className={style.input}
      />
      <img src={iconSearch} alt='search' className={style.search} />
      {value && (
        <img
          src={iconCancel}
          alt='cancel'
          className={style.cancel}
          onClick={clearInput}
        />
      )}
    </div>
  );
}

export default Search;
