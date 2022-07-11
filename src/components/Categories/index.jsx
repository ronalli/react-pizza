import React from 'react';

const categoriesPizza = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories = ({ activeCategory, onChangeCategory }) => {
  return (
    <>
      <div className='categories'>
        <ul>
          {categoriesPizza.map((item, idx) => (
            <li
              key={idx}
              onClick={() => onChangeCategory(idx)}
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
