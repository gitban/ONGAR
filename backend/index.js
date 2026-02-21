require('dotenv').config();

const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const db = require('./database/db');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3001;
//app.use(cors());

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Tu origen de Vite/React
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Permitimos todos los métodos
  allowedHeaders: ['Content-Type', 'Authorization'], // ✅ ACÁ ESTÁ EL SECRETO: Permitir Authorization
  credentials: true // Por si después usás cookies
}));

app.use(bodyParser.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

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
const ContactoRouter = require('./routers/contactoRoutes');

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
app.use('/api', ContactoRouter);

// Esto dice: "Cuando alguien pida /imagenes, buscalo en la carpeta imagenes_test"
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes_test')));

// Arrancamos el servidor en caso de uso local, sin AWS-Lambda
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});