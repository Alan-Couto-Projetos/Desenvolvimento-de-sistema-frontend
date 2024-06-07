import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid justify-content-center">
        <NavLink to="/" className="btn btn-outline-light mx-2">
          Página inicial
        </NavLink>
        <NavLink to="/cardetail" className="btn btn-outline-light mx-2">
          Carros
        </NavLink>
        <NavLink to="/add-car" className="btn btn-outline-light mx-2">
          Adicionar carro
        </NavLink>
        <NavLink to="/about" className="btn btn-outline-light mx-2">
          Sobre
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;