import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilter,
  setActiveCategory,
} from '../../redux/slices/filterSlice';

const Categories: React.FC = () => {

  const { categories, categoryId } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const addURL = (i: number) => {
    dispatch(setActiveCategory(i));
  };

  return (
    <>
      <div className='categories'>
        <ul>
          {categories.map((item: string, i: number) => (
            <li
              key={i}
              onClick={() => addURL(i)}
              className={categoryId === i ? 'active' : ''}
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
