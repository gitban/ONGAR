import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HistoriasDetalle from './HistoriasDetalle';

const HistoriasLista = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Usamos una función asíncrona interna
    const obtenerDatos = async () => {
      try {
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
    <>
      <section className="hero-historias-section">
        <div className="hero-inner">
          <h1>Historias</h1>
        </div>
      </section>

      <section id="historias" className="historias-section">
        <div className="grid-historias">
           {datos.map(item => (
          <article className="card-historias">
            <div className="card-img-container-historias">
              <Link to={`/historias/${item.id}`} state={item}><img src={`/Imágenes/Historias/${item.imagenes}.png`} alt={item.imagenes} /></Link>
            </div>
            <div className="historias-content">
              <h3>{item.titulo}</h3>
              <Link to={`/historias/${item.id}`} state={item} className="btn-leer-historias">Leer historia</Link>
            </div>
          </article>
           ))}
        </div>
      </section>
    </>
  );
};
export default HistoriasLista;