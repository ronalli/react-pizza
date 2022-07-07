import React from 'react';
import { useEffect, useState } from 'react';
import { Categories, BlockPizza, SortPizza, Skeleton } from '../components/';

const Home = () => {
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [sortType, setSortType] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/data')
      .then((res) => res.json())
      .then((data) => {
        setPizza(data);
        setIsLoading(false);
      });
  }, []);

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
