import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <h1>Adoptá amor, salvá vidas</h1>
            <p>Cada adopción es una segunda oportunidad. Elegí cambiar una historia. Juntos podemos construir un futuro con más empatía, respeto y corazones felices.</p>
            <Link to="/contacto" className="btn-contact">Contáctanos</Link>
          </div>
          <div className="hero-right">
            <img src="/Imágenes/Inicio/Perro_Hero_Section.png" alt="Perro Hero Section" />
          </div>
        </div>
      </section>

      {/* MAIN / ABOUT */}
      <main className="about">
        <h2>Un poco sobre nosotros</h2>
        <div className="cards-container">
          {/* CARD 1 */}
          <article className="card">
            <div className="icon-wrapper">
              <img src="/Imágenes/Inicio/Púa.png" alt="" className="icon-bg" />
              <img src="/Imágenes/Inicio/Perro_púa_1.png" alt="Icono perro" className="icon-dog" />
            </div>
            <h3>¿A qué nos dedicamos?</h3>
            <p>Somos una ONG destinada al rescate y recuperación de animales en situación de calle.</p>
          </article>
          {/* CARD 2 */}
          <article className="card">
            <div className="icon-wrapper">
              <img src="/Imágenes/Inicio/Púa.png" alt="" className="icon-bg" />
              <img src="/Imágenes/Inicio/Perro_púa_2.png" alt="Ubicación" className="icon-dog" />
            </div>
            <h3>¿Dónde nos encontrás?</h3>
            <p>Somos de la ciudad de Ramallo, provincia de Buenos Aires.</p>
          </article>
          {/* CARD 3 */}
          <article className="card">
            <div className="icon-wrapper">
              <img src="/Imágenes/Inicio/Púa.png" alt="" className="icon-bg" />
              <img src="/Imágenes/Inicio/Perro_púa_3.png" alt="Colaborar" className="icon-dog" />
            </div>
            <h3>Colaborá con nosotros</h3>
            <p>Podés ayudarnos a seguir cambiando vidas haciendo clic en el siguiente botón.</p>
            <a href="#" className="btn-donar">DONAR AQUÍ</a>
          </article>
        </div>
      </main>
    </>
  );
};
export default Inicio;