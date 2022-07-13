import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory } from '../../redux/slices/filterSlice';

const Categories = () => {
  const categoriesPizza = useSelector((state) => state.filter.categories);
  const activeCategory = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();
  return (
    <>
      <div className='categories'>
        <ul>
          {categoriesPizza.map((item, idx) => (
            <li
              key={idx}
              onClick={() => dispatch(setActiveCategory(idx))}
              className={activeCategory === idx ? 'active' : ''}
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
