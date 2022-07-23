import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemPizza, selectPizza } from '../redux/slices/pizzaSlice';

const FullPizza = () => {
  const dispatch = useDispatch();
  const { item } = useSelector(selectPizza);
  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchItemPizza({ id }));
  }, [id]);

  return (
    <div>
      <img src={item.imageUrl} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.price} ₽</p>
    </div>
  );
};

export default FullPizza;
