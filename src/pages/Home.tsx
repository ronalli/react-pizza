import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

import {
  selectFilter,
  setActiveCategory,
  setSort,
} from '../redux/slices/filterSlice';
import { fetchPizzaStatus, selectPizza } from '../redux/slices/pizzaSlice';

import { Categories, BlockPizza, SortPizza, Skeleton } from '../components/';
import NotFound from './NotFound';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { categoryId, sort, sortFields, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const requestPizz = async () => {
    if (categoryId !== null) {
      let category = categoryId > 0 ? `category=${categoryId}` : '';
      dispatch(
        fetchPizzaStatus({
          category,
          sort: sort.sortProperty,
          searchValue,
        })
      );
    }
  };

  useEffect(() => {
    if (location.search) {
      const category = searchParams.get('category');
      const sort = sortFields.find(
        (el: any) => el.sortProperty === searchParams.get('sort')
      );
      dispatch(setActiveCategory(Number(category)));
			dispatch(setSort(sort ? sort : sortFields[0]));
    } else {
      dispatch(setActiveCategory(0));
    }
  }, [searchParams]);

  useEffect(() => {
    requestPizz();
    if (categoryId === 0) {
      setSearchParams({});
    } else {
      setSearchParams({ category: String(categoryId), sort: sort.sortProperty });
    }
  }, [categoryId, sort, searchValue]);

  return (
    <>
      <div className='content__top'>
        <Categories />
        <SortPizza />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items items__pizza'>
        {status === 'success' ? (
          items.map((item: any) => {
            return <BlockPizza key={item.id} {...item} />;
          })
        ) : status === 'loading' ? (
          [...new Array(10)].map((_, idx) => {
            return <Skeleton key={idx} />;
          })
        ) : (
          <NotFound />
        )}
        {!items.length && status === 'success' && <NotFound />}
      </div>
    </>
  );
};

export default Home;
