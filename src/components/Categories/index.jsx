import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory } from '../../redux/slices/filterSlice';

const Categories = () => {
  const { categories, categoryId } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const onChangeCategory = useCallback((idx) => {
    dispatch(setActiveCategory(idx));
  }, []);

  return (
    <div className='categories'>
      <ul>
        {categories.map((item, idx) => (
          <li
            key={idx}
            onClick={() => onChangeCategory(idx)}
            className={categoryId === idx ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Categories };
