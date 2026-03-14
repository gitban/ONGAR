import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';
import { useState, useEffect } from 'react';

const MenuHistorias = () => {

  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Usamos una función asíncrona interna
    const obtenerDatos = async () => {
      try {
        //PRODUCCION
        const respuesta = await fetch('/api/historias');
        const resultado = await respuesta.json();
        setDatos(resultado);
      } catch (error) {
        console.error("Error cargando API:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []); // El array vacío [] asegura que solo se ejecute al cargar el componente

  if (cargando) return <p>Cargando datos...</p>;

  return (
    <div className="panel-page">
      {/* Encabezado */}
      <header className="panel-header">
        <h1>Administrar Historias</h1>
      </header>

      <div className="panel-container">
        <div className="panel-grid-tarjetas">

          {/* Tarjeta 1: Alta */}
          <Link to="/admin/historias/alta" className="panel-card">
            <span className="panel-card-text">Alta<br />Historia</span>
          </Link>

          {/* Tarjeta 2: Modificar */}
          <Link to="/admin/historias/modificar" state={{ historias: datos }} className="panel-card">
            <span className="panel-card-text">Modificar<br />Historia</span>
          </Link>

          {/* Tarjeta 3: Baja */}
          <Link to="/admin/historias/baja" state={{ historias: datos }} className="panel-card">
            <span className="panel-card-text">Baja<br />Historia</span>
          </Link>

          {/* Tarjeta Extra: Volver al Panel Principal */}
          <Link to="/admin" className="panel-card-salir">
            <span className="panel-card-salir-text">Volver al<br />Panel</span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default MenuHistorias;