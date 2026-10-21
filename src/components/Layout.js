import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="container">
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;