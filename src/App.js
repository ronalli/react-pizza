import './scss/app.scss';
import { Categories, Header, BlockPizza, SortPizza } from './components';
import pizza from './assets/pizza.json';

const App = () => {
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
            {pizza.map((item) => {
              return <BlockPizza key={item.id} {...item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
