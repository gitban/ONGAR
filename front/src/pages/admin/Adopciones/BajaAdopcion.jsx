import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const BajaAdopcion = () => {
  const [animalSeleccionado, setAnimalSeleccionado] = useState('');

  // Estados para datos del adoptante
  const [datosAdoptante, setDatosAdoptante] = useState({
    nombre_apellido: "",
    telefono: "",
    email: "",
    direccion: "",
    observaciones: "",
  });

  const [animales, setAnimales] = useState([]);
  const [adopciones, setAdopciones] = useState([]);

  // Estado para el feedback de la interfaz
  const [status, setStatus] = useState({
    loading: false,
    msg: "",
    error: false,
  });


  //Obtener listado de animales para adopcion
  useEffect(() => {
    // Pedimos la lista al backend
    console.log("Pidiendo datos al servidor...");
    fetch("/api/animales")
      .then((res) => res.json())
      .then((data) => setAnimales(data))
      .catch((err) => console.error("Error al recuperar lista:", err));
  }, []);

  // Carga de datos al seleccionar un animal
  const handleSelectAnimalChange = (e) => {
    const seleccion = animales.find((animal) => animal.id == e.target.value);
    setAnimalSeleccionado(seleccion);
    setDatosAdoptante({ nombre_apellido: '', telefono: '', email: '', direccion: '', observaciones: '' }); // Limpiar formulario   
    //Obtener listado de solicitudes de adopcion
    // Pedimos la lista al backend
    console.log("Pidiendo datos al servidor...");
    fetch(`/api/adopciones?id_animal=${seleccion.id}`)
      .then((res) => res.json())
      .then((data) => setAdopciones(data))
      .catch((err) => console.error("Error al recuperar lista:", err));
  };
  // Carga de datos al seleccionar un adoptante
  const handleSelectAdoptanteChange = (e) => {
    const seleccion_adoptante = adopciones.find((adoptante) => adoptante.id_adopcion == e.target.value);
    setDatosAdoptante(seleccion_adoptante)
  };

  const handleChange = (e) => {
    {
      const { name, value } = e.target;
      setDatosAdoptante({
        ...datosAdoptante,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!animalSeleccionado) {
      alert('Por favor seleccione un animal.');
      return;
    }

    setStatus({ loading: true, msg: "Enviando...", error: false });

    try {
      const response = await fetch(`/api/animales/${animalSeleccionado.id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ estado: datosAdoptante.id_adopcion, datosadicionales: datosAdoptante.observaciones })
      });

      if (response.ok) {
        // Aquí podés actualizar tu lista local de animales para que cambie el color o el texto
        alert(`Adopción registrada para ${animalSeleccionado.nombre}. ¡Felicidades!`);
        setStatus({
          loading: false,
          msg: "¡Mensaje enviado con éxito! ✅",
          error: false,
        });
      } else {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          // Redirigimos al login y limpiamos la app
          window.location.href = "/login";
          return Promise.reject("Sesión expirada");
        }
      }
    } catch (err) {
      setStatus({
        loading: false,
        msg: `Error: ${err.message} ❌`,
        error: true,
      });
    }

  };

  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      <div className="admin-container">

        <h2 className="admin-page-title">Entregar en adopción</h2>

        <div className="admin-form-card">

          <form onSubmit={handleSubmit}>
            <div className="admin-form-layout">
              {/* COLUMNA IZQUIERDA: Selector + Datos Personales */}
              <div className="admin-form-left">

                {/* Selector Animal*/}
                <div className="admin-input-group">
                  <label>Seleccionar animal</label>
                  <select
                    className="admin-select"
                    name="animal_id"
                    value={animales.id}
                    onChange={handleSelectAnimalChange}
                  >
                    <option value="">Seleccione animal a dar en adopción</option>
                    {animales.map((animal) => (
                      <option key={animal.id} value={animal.id}>
                        {animal.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Selector Adoptante*/}
                <div>
                  <label>Seleccionar adoptante</label>
                  <select
                    className="admin-select"
                    name="adoptante_id"
                    value={adopciones.id}
                    onChange={handleSelectAdoptanteChange}
                  >
                    <option value="">Seleccione adoptante</option>
                    {adopciones.map((adopciones) => (
                      <option key={adopciones.id_adopcion} value={adopciones.id_adopcion}>
                        {adopciones.nombre_apellido}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Título + Primer Input (AGRUPADOS) */}
                <div className="admin-input-group">
                  {/* CAMBIO: El título ahora está aquí adentro y usa className */}
                  <h3 className="datos-adoptante">Datos del adoptante</h3>

                  <input
                    name='nombre_apellido'
                    type="text"
                    placeholder="Nombre y apellido"
                    className="admin-input"
                    value={datosAdoptante.nombre_apellido}
                    onChange={handleChange}
                  />
                </div>

                {/* Resto de inputs (Sin cambios) */}
                <div className="admin-input-group">
                  <input
                    name='telefono'
                    type="tel"
                    placeholder="Teléfono"
                    className="admin-input"
                    value={datosAdoptante.telefono}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-input-group">
                  <input
                    name='email'
                    type="email"
                    placeholder="Email"
                    className="admin-input"
                    value={datosAdoptante.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-input-group">
                  <input
                    name='direccion'
                    type="text"
                    placeholder="Dirección"
                    className="admin-input"
                    value={datosAdoptante.direccion}
                    onChange={handleChange}
                  />
                </div>

              </div>

              {/* COLUMNA DERECHA: Datos Adicionales (Textarea grande) */}
              <div className="admin-form-right">
                <div className="admin-input-group" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <label>Datos adicionales del adoptante</label>
                  <textarea
                    name='observaciones'
                    className="admin-textarea-large"
                    value={datosAdoptante.observaciones}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>


            {/* Botón Aceptar */}
            <div className="admin-actions">
              <button
                type="submit"
                className="btn-admin-submit"
                disabled={status.loading}
              >
                {status.loading ? "Procesando..." : "Enviar"}
              </button>
            </div>
          </form>

          {/* Botón Volver */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/admin/adopciones" style={{ color: '#666', textDecoration: 'underline' }}>Cancelar y Volver</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BajaAdopcion;