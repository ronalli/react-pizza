import './scss/app.scss';
import { Categories, Header, BlockPizza, SortPizza } from './components';
import { useEffect, useState } from 'react';

const App = () => {
  const [pizza, setPizza] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/data')
      .then((res) => res.json())
      .then((data) => setPizza(data));
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
            {pizza.length ? (
              pizza.map((item) => {
                return <BlockPizza key={item.id} {...item} />;
              })
            ) : (
              <h3>Данных нет</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
