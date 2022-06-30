import './scss/app.scss';
import { Categories, Header, BlockPizza } from './components';

function App() {
  return (
    <div class='wrapper'>
      <Header />
      <div class='content'>
        <div class='container'>
          <div class='content__top'>
            <Categories />
          </div>
          <h2 class='content__title'>Все пиццы</h2>
          <div class='content__items'>
            <BlockPizza />
            <BlockPizza />
            <BlockPizza />
            <BlockPizza />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
