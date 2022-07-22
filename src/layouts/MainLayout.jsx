import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Search } from '../components';

const MainLayout = () => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <Search />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
