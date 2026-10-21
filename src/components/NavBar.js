import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end className="nav-item">
        Trang chủ
      </NavLink>
      <NavLink to="/books" end className="nav-item">
        Danh sách
      </NavLink>
      <NavLink to="/books/new" end className="nav-item">
        Thêm mới
      </NavLink>
    </nav>
  );
};

export default NavBar;