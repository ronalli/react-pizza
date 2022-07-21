import axios from 'axios';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
      console.log('1', category);
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
    console.log('2', categoryId);
  }, [categoryId, sort]);

  useEffect(() => {
    setIsLoading(true);
    if (categoryId !== null) {
      let category = categoryId > 0 ? `category=${categoryId}` : '';
      axios
        .get(
          `http://localhost:3001/data?${category}&_sort=${sort.sortProperty}&_order=desc&title_like=${searchValue}`
        )
        .then((res) => {
          console.log('res', res.data);
          setPizza(res.data);
          setIsLoading(false);
        });
    }
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
        {!pizza.length && !isLoading && <NotFound />}
      </div>
    </>
  );
};

export default Home;
