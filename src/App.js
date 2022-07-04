import './scss/app.scss';
import {
  Categories,
  Header,
  BlockPizza,
  SortPizza,
  Skeleton,
} from './components';
import { useEffect, useState } from 'react';

const App = () => {
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/data')
      .then((res) => res.json())
      .then((data) => {
        setPizza(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
