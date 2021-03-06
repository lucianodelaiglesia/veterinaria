const recursos = require('./recursos');
const mascotas = require('./rutas/mascotas');
const veterinarixs = require('./rutas/veterinarixs');
const duenos = require('./rutas/duenos');
const consultas = require('./rutas/consultas');

module.exports = {
    ruta: (data, callback) => {
        callback(200, { mensaje: 'esta es /ruta' });
    },
    mascotas: mascotas(recursos.mascotas),
    veterinarixs: veterinarixs(recursos.veterinarixs),
    duenos: duenos(recursos.duenos),
    consultas: consultas(recursos),
    noEncontrado: (data, callback) => {
        callback(404, { mensaje: 'no encontrado' });
    },
};