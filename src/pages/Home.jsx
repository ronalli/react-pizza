import React from 'react';
import { useEffect, useState } from 'react';
import { Categories, BlockPizza, SortPizza, Skeleton } from '../components/';

const Home = ({ searchValue }) => {
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [sortType, setSortType] = useState({
    title: 'популярности',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sort = sortType.sortProperty;
    fetch(`http://localhost:3001/data?${category}&_sort=${sort}&_order=desc`)
      .then((res) => res.json())
      .then((data) => {
        setPizza(
          data.filter((el) =>
            el.title.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
        setIsLoading(false);
      });
  }, [sortType, activeCategory, searchValue]);

  return (
    <>
      <div className='content__top'>
        <Categories
          activeCategory={activeCategory}
          onChangeCategory={(id) => setActiveCategory(id)}
        />
        <SortPizza
          sortType={sortType}
          onChangeSortType={(i) => setSortType(i)}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {!isLoading
          ? pizza.map((item) => {
              return <BlockPizza key={item.id} {...item} />;
            })
          : [...new Array(10)].map((_, idx) => {
              return <Skeleton key={idx} />;
            })}
      </div>
    </>
  );
};

export default Home;
