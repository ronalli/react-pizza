import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { useContext} from 'react';
import { useEffect, useState } from 'react';
import qs from 'qs';

import { AppContext } from '../App';
import { Categories, BlockPizza, SortPizza, Skeleton } from '../components/';
import NotFound from './NotFound';
import { setFilters} from '../redux/slices/filterSlice';
import { useRef } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchValue } = useContext(AppContext);

  const isSearchRef = useRef(false);
  const isMountedRef = useRef(false);
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId, sort, sortFields } = useSelector((state) => state.filter);

  const fetchPizza = () => {
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
  };

  useEffect(() => {
    if (isMountedRef.current) {
      const querySearch = qs.stringify({
        categoryId,
        sort: sort.sortProperty,
      });
      navigate(`?${querySearch}`);
    }
    isMountedRef.current = true;
  }, [categoryId, sort]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortFields.find((el) => el.sortProperty === params.sort);
      dispatch(setFilters({ ...params, sort }));
      isSearchRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearchRef.current) {
      fetchPizza();
    }
    isSearchRef.current = false;
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
        {!pizza.length && !isLoading && <NotFound />}
      </div>
    </>
  );
};

export default Home;
