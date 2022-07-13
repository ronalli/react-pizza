import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';

import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { AppContext } from '../App';
import { setActiveCategory } from '../redux/slices/filterSlice';

import { Categories, BlockPizza, SortPizza, Skeleton } from '../components/';
import NotFound from './NotFound';

const Home = () => {
  const { searchValue } = useContext(AppContext);
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState({
    title: 'популярности',
    sortProperty: 'rating',
  });

  const activeCategory = useSelector((state) => state.filter.value);

  useEffect(() => {
    setIsLoading(true);
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sort = sortType.sortProperty;
    axios
      .get(
        `http://localhost:3001/data?${category}&_sort=${sort}&_order=desc&title_like=${searchValue}`
      )
      .then((res) => {
        setPizza(res.data);
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
        {!pizza.length && <NotFound />}
      </div>
    </>
  );
};

export default Home;
