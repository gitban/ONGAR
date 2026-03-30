import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { noticiasService } from '../services/noticiasService';
import { API_BASE_URL } from '../../config';

const NoticiasLista = () => {

  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Usamos una función asíncrona interna
    const obtenerDatos = async () => {
          try {
            //PRODUCCION
            const respuesta = await noticiasService.getAll();
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
      <section className="hero-noticias-section">
        <div className="hero-inner"><h1>Noticias</h1></div>
      </section>

      <section className="noticias-section">
        <div className="grid-noticias">
          {datos.map(item => (
            <article className="card-noticia">
              <div className="card-img-container">
                <img src={`${API_BASE_URL}${item.imagen}`} alt={item.foto} />
              </div>
              <h3>{item.titulo}</h3>
              <Link to={`/noticias/${item.id}`} state={{ item: item, datos: datos }} className="btn-conoce">Leer más</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};
export default NoticiasLista;