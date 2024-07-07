import React from 'react';
import {NavLink} from 'react-router-dom';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div>
      <header className="bg-dark text-white p-3">
        <NavLink to='/' className="navbar-brand fs-1">Calorie Tracker</NavLink>
        <NavLink to='/new-meal' className="nav-link">New Meals</NavLink>
      </header>
      <main className="container mt-3">{children}</main>
    </div>
  );
};

export default Layout;