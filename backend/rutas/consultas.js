module.exports = function consultasHandler({ consultas, veterinarixs, mascotas }) {
    return {
        GET: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (consultas[data.indice]) {
                    return callback(200, consultas[data.indice]);
                }
                return callback(404, { mensaje: `consulta ${data.indice} no encontrado` });
            }
            const consultasConRelaciones = consultas.map((consulta) => (
                {
                    ...consulta,
                    mascota: { ...mascotas[consulta.mascota], id: consulta.mascota },
                    veterinarix: { ...veterinarixs[consulta.veterinarix], id: consulta.veterinarix },
                }));
            callback(200, consultasConRelaciones);
        },
        POST: (data, callback) => {
            let nuevaConsulta = data.payload;
            nuevaConsulta.fechaCreacion = new Date();
            nuevaConsulta.fechaEdicion = null;
            consultas = [...consultas, nuevaConsulta]
            callback(201, nuevaConsulta);
        },
        PUT: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (consultas[data.indice]) {
                    const { fechaCreacion } = consultas[data.indice];
                    consultas[data.indice] = {
                        ...data.payload,
                        fechaCreacion,
                        fechaEdicion: new Date()
                    };
                    return callback(200, consultas[data.indice]);
                }
                return callback(404, { mensaje: `consulta ${data.indice} no encontrado` });
            }
            callback(400, { mensaje: "indice no enviado" });
        },
        DELETE: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (consultas[data.indice]) {
                    consultas = consultas.filter(
                        (_consulta, indice) => indice != data.indice);
                    return callback(204, { mensaje: `consulta ${data.indice} ha sido eliminado` });
                }
                return callback(404, { mensaje: `consulta ${data.indice} no encontrado` });
            }
            callback(400, { mensaje: "indice no enviado" });
        },
    };
};