import axios from 'axios';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppContext } from '../App';
import { setActiveCategory, setSort } from '../redux/slices/filterSlice';
import { setItems } from '../redux/slices/pizzaSlice';

import { Categories, BlockPizza, SortPizza, Skeleton } from '../components/';
import NotFound from './NotFound';
import { useLocation, useSearchParams } from 'react-router-dom';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const { searchValue } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId, sort, sortFields } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);

  const requestPizz = async () => {
    setIsLoading(true);
    if (categoryId !== null) {
      let category = categoryId > 0 ? `category=${categoryId}` : '';
      try {
        const response = await axios.get(
          `http://localhost:3001/data?${category}&_sort=${sort.sortProperty}&_order=desc&title_like=${searchValue}`
        );
        dispatch(setItems(response.data));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

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
  }, [searchParams]);

  useEffect(() => {
    if (categoryId === 0) {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId, sort: sort.sortProperty });
    }
  }, [categoryId, sort]);

  useEffect(() => {
    requestPizz();
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
          ? items.map((item) => {
              return <BlockPizza key={item.id} {...item} />;
            })
          : [...new Array(10)].map((_, idx) => {
              return <Skeleton key={idx} />;
            })}
        {!items.length && !isLoading && <NotFound />}
      </div>
    </>
  );
};

export default Home;
