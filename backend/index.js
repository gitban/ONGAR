const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./database/db');
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(bodyParser.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Agrego al header del archivo configuraciones para que acepte conexiones CORS
app.use(function (req, res, next) {

    // Sitio al que permitiremos acceso
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Metodos que se permiten
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(async (req, res, next) => {
  try {
    await db.authenticate();
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
});


const MiembrosRouter = require('./routers/miembrosRoutes');
const AdopcionesRouter = require('./routers/adopcionesRoutes');

//rutas o Endpoints

app.get('/', (req, res) => {
  res.status(200).end("Bienvenido a la API con MySQL y Sequelize");
});

app.use('/api', MiembrosRouter);
app.use('/api', AdopcionesRouter);


// Arrancamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});