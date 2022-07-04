import { Routes, Route } from 'react-router-dom';

import { Header } from './components';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/app.scss';

const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
