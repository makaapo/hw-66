import React from 'react';
import { NavLink } from 'react-router-dom';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <header className="bg-primary text-white p-3">
        <NavLink to="/" className="navbar-brand fs-1">
          Calorie Tracker
        </NavLink>
      </header>
      <main className="container mt-3">{children}</main>
    </div>
  );
};

export default Layout;
