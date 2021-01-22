module.exports = function veterinarixsHandler(veterinarixs) {
    return {
        GET: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (veterinarixs[data.indice]) {
                    return callback(200, veterinarixs[data.indice]);
                }
                return callback(404, { mensaje: `veterinarix ${data.indice} no encontrado` });
            }
            callback(200, veterinarixs);
        },
        POST: (data, callback) => {
            veterinarixs.push(data.payload);
            callback(201, data.payload);
        },
        PUT: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (veterinarixs[data.indice]) {
                    veterinarixs[data.indice] = data.payload;
                    return callback(200, veterinarixs[data.indice]);
                }
                return callback(404, { mensaje: `veterinarix ${data.indice} no encontrado` });
            }
            callback(400, { mensaje: "indice no enviado" });
        },
        DELETE: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (veterinarixs[data.indice]) {
                    veterinarixs = veterinarixs.filter(
                        (_veterinarix, indice) => indice != data.indice);
                    return callback(204, { mensaje: `veterinarix ${data.indice} ha sido eliminado` });
                }
                return callback(404, { mensaje: `veterinarix ${data.indice} no encontrado` });
            }
            callback(400, { mensaje: "indice no enviado" });
        },
    };
};