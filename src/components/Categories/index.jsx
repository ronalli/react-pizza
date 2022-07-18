import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory } from '../../redux/slices/filterSlice';

const Categories = () => {
  const { categories, categoryId } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const addURL = (idx) => {
    dispatch(setActiveCategory(idx));
  };

  return (
    <>
      <div className='categories'>
        <ul>
          {categories.map((item, idx) => (
            <li
              key={idx}
              onClick={() => addURL(idx)}
              className={categoryId === idx ? 'active' : ''}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export { Categories };
