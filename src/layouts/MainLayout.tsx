import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header, Search } from '../components';

const MainLayout: React.FC = () => {

	const location = useLocation();
	
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
         { location.pathname !== '/cart' && <Search /> }
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
