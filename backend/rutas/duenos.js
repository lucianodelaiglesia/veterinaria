module.exports = function duenosHandler(duenos) {
    return {
        GET: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (duenos[data.indice]) {
                    return callback(200, duenos[data.indice]);
                }
                return callback(404, { mensaje: `dueno ${data.indice} no encontrado` });
            }
            callback(200, duenos);
        },
        POST: (data, callback) => {
            duenos.push(data.payload);
            callback(201, data.payload);
        },
        PUT: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (duenos[data.indice]) {
                    duenos[data.indice] = data.payload;
                    return callback(200, duenos[data.indice]);
                }
                return callback(404, { mensaje: `dueno ${data.indice} no encontrado` });
            }
            callback(400, { mensaje: "indice no enviado" });
        },
        DELETE: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (duenos[data.indice]) {
                    duenos = duenos.filter(
                        (_dueno, indice) => indice != data.indice);
                    return callback(204, { mensaje: `dueno ${data.indice} ha sido eliminado` });
                }
                return callback(404, { mensaje: `dueno ${data.indice} no encontrado` });
            }
            callback(400, { mensaje: "indice no enviado" });
        },
    };
};