import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AdopcionesLista = () => {

  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Usamos una función asíncrona interna
    const obtenerDatos = async () => {
      try {
        //PRODUCCION
        const respuesta = await fetch('/api/animales');
        const resultado = await respuesta.json();
        setDatos(resultado);
        console.log(resultado);
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
      <section className="hero hero-adopciones">
        <div className="hero-inner hero-inner-adopciones">
          <div className="hero-dog-left">
            <img src="/Imágenes/Adopciones/Perro_Hero_Section_Adopciones_Izq.png" alt="Perro Izq" />
          </div>
          <div className="hero-content-center">
            <h1>Te ayudamos a agrandar tu familia</h1>
            <p>Cada animal espera una segunda oportunidad para dar amor, lealtad y alegría sin medida.
              Al adoptar, no solo transformás una vida, también agrandas tu familia con un compañero
              que te recordará cada día lo hermoso que es elegir con el corazón.
            </p>
            <a href="#integrantes" className="btn-contact">Comencemos</a>
          </div>
          <div className="hero-dog-right">
            <img src="/Imágenes/Adopciones/Perro_Hero_Section_Adopciones_Der.png" alt="Perro Der" />
          </div>
        </div>
      </section>

      <section id="integrantes" className="integrantes-section">
        <h2>Tu próximo/a integrante</h2>
        <div className="grid-adopcion">

          {datos.map(item => (
            <article className="card-adopcion">
              <div className="card-img-container">
                {console.log(item)}
                <img src={`${item.foto[0]}`} alt={item.foto[0]} />
              </div>
              <h3>{item.nombre}</h3>
              <Link to={`/adopciones/detalle/${item.nombre.toLowerCase()}`} state={item} className="btn-conoce">Conocé mi historia</Link>
            </article>
          ))}

        </div>
      </section>
    </>
  );
};
export default AdopcionesLista;