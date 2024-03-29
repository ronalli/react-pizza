import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, CartItem, selectCart } from '../../redux/slices/cartSlice';


type BlockPizzaProps = { id: number, imageUrl: string, title: string, types: number[], sizes: number[], price: number }

const BlockPizza: React.FC<BlockPizzaProps> = ({ id, imageUrl, title, types, sizes, price }) => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);
  const cartItems = items.find((obj: any) => obj.id === id);

  const typesPizza = ['тонкое', 'традиционное'];
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(0);

  const selectionType = (e: React.MouseEvent<HTMLLIElement>, type: number) => {
    e.preventDefault();
    type === activeType ? setActiveType(NaN) : setActiveType(type);
  };

  const selectionSize = (e: React.MouseEvent<HTMLLIElement>, idx: number) => {
    e.preventDefault();
    idx === activeSize ? setActiveSize(NaN) : setActiveSize(idx);
  };

  const onClickAdd = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const obj: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typesPizza[activeType],
      size: activeSize,
			count: 0
    };
    dispatch(addItem(obj));
  };

  return (
    <Link to={`pizza/${id}`} className='pizza-block'>
      <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
      <h4 className='pizza-block__title'>{title}</h4>
      <div className='pizza-block__selector'>
        <ul>
          {types.map((type, idx) => {
            return (
              <li
                className={activeType === type ? 'active' : ''}
                onClick={(e) => selectionType(e, type)}
                key={type + idx}
              >
                {typesPizza[type]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, idx) => {
            return (
              <li
                className={activeSize === idx ? 'active' : ''}
                onClick={(e) => selectionSize(e, idx)}
                key={size + idx}
              >
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {price} ₽</div>
        <div
          onClick={onClickAdd}
          className='button button--outline button--add'
        >
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          {cartItems ? <i>{cartItems.count}</i> : ''}
        </div>
      </div>
    </Link>
  );
};

export { BlockPizza };
