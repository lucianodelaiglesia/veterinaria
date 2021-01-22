module.exports = function mascotasHandler(mascotas) {
    return {
        GET: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (mascotas[data.indice]) {
                    return callback(200, mascotas[data.indice]);
                }
                return callback(404, { mensaje: `mascota ${data.indice} no encontrada` });
            }
            callback(200, mascotas);
        },
        POST: (data, callback) => {
            mascotas.push(data.payload);
            callback(201, data.payload);
        },
        PUT: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (mascotas[data.indice]) {
                    mascotas[data.indice] = data.payload;
                    return callback(200, mascotas[data.indice]);
                }
                return callback(404, { mensaje: `mascota ${data.indice} no encontrada` });
            }
            callback(400, { mensaje: "indice no enviado" });
        },
        DELETE: (data, callback) => {
            if (typeof data.indice !== 'undefined') {
                if (mascotas[data.indice]) {
                    mascotas = mascotas.filter(
                        (_mascota, indice) => indice != data.indice);
                    return callback(204, { mensaje: `mascota ${data.indice} ha sido eliminada` });
                }
                return callback(404, { mensaje: `mascota ${data.indice} no encontrada` });
            }
            callback(400, { mensaje: "indice no enviado" });
        },
    };
};