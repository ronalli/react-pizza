import React, { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../redux/slices/filterSlice';

import style from './index.module.scss';
import iconSearch from '../../assets/img/search.svg';
import iconCancel from '../../assets/img/cancel.svg';

const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 200),
    []
  );

  const onChangeInput = (event: any) => {
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
};

export { Search };
