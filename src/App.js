import { createContext } from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';
import Search from './components/Search';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/app.scss';

export const AppContext = createContext('');

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className='wrapper'>
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className='content'>
          <div className='container'>
            <Search />
            <Routes>
              <Route path='/' element={<Home searchValue={searchValue} />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
};

export default App;
