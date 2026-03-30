import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { historiasService } from '../services/historiasService'
import { API_BASE_URL } from '../../config';

const HistoriasLista = () => {
  //url para las imagenes

  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Usamos una función asíncrona interna
    const obtenerDatos = async () => {
      try {
        //PRODUCCION
        const respuesta = await historiasService.getAll();
        setDatos(respuesta);
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
                <Link to={`/historias/${item.id}`} state={item}>
                <img src={`${ API_BASE_URL}${item.imagenes[0]}`} alt={item.imagenes[1]} />
                </Link>
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