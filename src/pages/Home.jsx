import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { AppContext } from '../App';
import { setActiveCategory, setSort } from '../redux/slices/filterSlice';

import { Categories, BlockPizza, SortPizza, Skeleton } from '../components/';
import NotFound from './NotFound';
import { useLocation, useSearchParams } from 'react-router-dom';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const { searchValue } = useContext(AppContext);
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId, sort, sortFields } = useSelector((state) => state.filter);

  useEffect(() => {
    if (location.search) {
      const category = searchParams.get('category');
      const sort = sortFields.find(
        (el) => el.sortProperty === searchParams.get('sort')
      );
      dispatch(setActiveCategory(category));
      dispatch(setSort(sort));
    } else {
      dispatch(setActiveCategory(0));
    }
  }, []);

  useEffect(() => {
    if (categoryId === 0) {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId, sort: sort.sortProperty });
    }
  }, [categoryId, sort]);

  useEffect(() => {
    setIsLoading(true);
    let category = categoryId > 0 ? `category=${categoryId}` : '';
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
      <div className='content__items items__pizza'>
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
