import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';

import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { AppContext } from '../App';

import { Categories, BlockPizza, SortPizza, Skeleton } from '../components/';
import NotFound from './NotFound';

const Home = () => {
  const { searchValue } = useContext(AppContext);
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId, sort } = useSelector((state) => state.filter);

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    axios
      .get(
        `http://localhost:3001/data?${category}&_sort=${sort.sortProperty}&_order=desc&title_like=${searchValue}`
      )
      .then((res) => {
        setPizza(res.data);
        setIsLoading(false);
      });
  }, [sort, categoryId, searchValue]);

  return (
    <>
      <div className='content__top'>
        <Categories />
        <SortPizza />
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
