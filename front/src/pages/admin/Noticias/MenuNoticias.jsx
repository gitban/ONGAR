import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const MenuNoticias = () => {
  return (
    <div className="panel-page">
      {/* Encabezado Naranja */}
      <header className="panel-header">
        <h1>Administrar Noticias</h1>
      </header>

      <div className="panel-container">
        <div className="panel-grid-tarjetas">
          
          {/* Tarjeta 1: Alta */}
          <Link to="/admin/noticias/alta" className="panel-card">
            <span className="panel-card-text">Alta<br/>Noticia</span>
          </Link>

          {/* Tarjeta 2: Modificar */}
          <Link to="/admin/noticias/modificar" className="panel-card">
            <span className="panel-card-text">Modificar<br/>Noticia</span>
          </Link>

          {/* Tarjeta 3: Baja */}
          <Link to="/admin/noticias/baja" className="panel-card">
            <span className="panel-card-text">Baja<br/>Noticia</span>
          </Link>

          {/* Tarjeta 4: Volver al Panel Principal */}
          <Link to="/admin" className="panel-card">
            <span className="panel-card-text">Volver al<br/>Panel</span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default MenuNoticias;