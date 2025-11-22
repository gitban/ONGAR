require('dotenv').config();

const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
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

// Manejo de sesiones //
app.use(session({
  secret: 'contraseña',
  resave: false,
  saveUninitialized: false
})
);
// fin de manejo de sesiones //

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

const LoginRouter = require('./routers/login');
const RegistroRouter = require('./routers/registro');
const UsuariosRouter = require('./routers/usuariosRoutes');
const AdministradoresRouter = require('./routers/administradoresRoutes');
const AdopcionesRouter = require('./routers/adopcionesRoutes');
const AnimalesRouter = require('./routers/animalesRoutes');
const DonacionesRouter = require('./routers/donacionesRoutes');
const HistoriasRouter = require('./routers/historiasRoutes');
const NoticiasRouter = require('./routers/noticiasRoutes');

//rutas o Endpoints

app.get('/', (req, res) => {
  res.status(200).end("Bienvenido a la API con MySQL y Sequelize");
});

app.use('/auth', LoginRouter);
app.use('/auth', RegistroRouter);
app.use('/api', UsuariosRouter);
app.use('/api', AdministradoresRouter);
app.use('/api', AdopcionesRouter);
app.use('/api', AnimalesRouter);
app.use('/api', DonacionesRouter);
app.use('/api', HistoriasRouter);
app.use('/api', NoticiasRouter);

// Exporta el handler para Lambda
module.exports.handler = serverless(app);

// Arrancamos el servidor en caso de uso local, sin AWS-Lambda
// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en el puerto ${PORT}`);
// });