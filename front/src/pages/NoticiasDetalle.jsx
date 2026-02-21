import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

const NoticiaDetalle = () => {

  const location = useLocation();
  const datos = location.state;
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    // Busca todos los archivos .png, .jpg, .jpeg o .svg en la carpeta de imagenes
    const archivos = import.meta.glob('/Public/Imágenes/Noticias/*.{png,jpg,jpeg,svg}', { eager: true });

    // Convertimos el objeto en un array de rutas
    const rutas = Object.keys(archivos)
      .filter((ruta) => ruta.includes(`${datos.imagenes}`))
      .map((ruta) => archivos[ruta].default);
    setImagenes(rutas);
  }, []);

  const { id } = useParams();

  useEffect(() => { window.scrollTo(0, 0); }, [id]); // Scroll arriba

  useEffect(() => {
    // Esta lógica se ejecutará cada vez que el state del Link cambie
    if (location.state?.datos) {
      console.log("Datos actualizados:", datos);
    }
    // Aquí ponés tu lógica para refrescar la pantalla o llamar a la API
    if (datos) {
      // cargarNuevosDatos(user.id);
    }
  }, [location]); // <--- LA CLAVE: Agregar location aquí

  if (!datos) return <div>Noticia no encontrada</div>;

  return (
    <>
      <section className="hero-noticias-section">
        <div className="hero-inner">
          <h1>Noticias</h1>
        </div>
      </section>

      <section className="detalle-noticia-section">
        <div className="layout-noticia-inner">
          {/* CONTENIDO IZQUIERDA */}
          <article className="noticia-principal-content">
            <div className="detalle-img-full">
              <img src={`/Imágenes/Noticias/${datos.item.imagen}.png`} alt={datos.item.imagen} />
            </div>
            <div className="noticia-header-block">
              <h2>{datos.item.titulo}</h2>
              <p className="detalle-fecha">{datos.item.fecha_publicacion}</p>
            </div>
            <div className="noticia-cuerpo-texto" dangerouslySetInnerHTML={{ __html: datos.item.contenido }} />
            <div className="noticia-action-area">
              <Link to="/noticias" className="btn-volver">Volver a Noticias</Link>
            </div>
          </article>

          {/* SIDEBAR DERECHA */}
          <aside className="sidebar-noticias">
            <h3 className="sidebar-title">Noticias Recientes</h3>
            <div className="lista-recientes">

              {Object.keys(datos.datos).map((key) => {
                // No mostramos la noticia actual en el sidebar
                const item = datos.datos[key];
                if (key == datos.item.id - 1) {
                  return null;
                } else {
                  return (
                    <Link to={`/noticias/${item.id}`} state={{ item: item, datos: datos.datos }} className="card-reciente-link">
                      <article className="card-reciente">
                        <div className="reciente-img"><img src={`/Imágenes/Noticias/${item.imagen}.png`} alt="Miniatura" /></div>
                        <div className="reciente-info">
                          <h4>{item.titulo}</h4>
                          <span className="leer-mas-small">Leer más &rarr;</span>
                        </div>
                      </article>
                    </Link>
                  )
                }
              })}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};
export default NoticiaDetalle;