import './scss/app.scss';
import { Categories, Header, BlockPizza, SortPizza } from './components';

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
            <BlockPizza />
            <BlockPizza />
            <BlockPizza />
            <BlockPizza />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
