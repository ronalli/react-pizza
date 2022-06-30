import React, { useState } from 'react';

const categoriesPizza = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      <div className='categories'>
        <ul>
          {categoriesPizza.map((item, idx) => (
            <li
              key={idx}
              onClick={() => setActiveCategory(idx)}
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
