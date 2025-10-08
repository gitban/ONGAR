const Sequelize = require('sequelize');
const Database = require('./config')

const sequelize = new Sequelize(
    Database.database.database,
    Database.database.username,
    Database.database.password,
    {
        host: Database.database.host ,
        port: 3306,
        dialect: 'mysql',
    });

async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log('Conexion a la BBDD establecido correctamente!!!');
    }
    catch (error) {
        console.error('Error al conectarse a la BBDD', error);

    }
}

async function closeConnection() {
    try {
        await sequelize.close();
        console.log('La conexión se cerró exitosamente!');
    } catch (error) {
        console.error('Hubo un problema al cerrar la conexion con la BBDD', error);
    }
}

module.exports = sequelize;