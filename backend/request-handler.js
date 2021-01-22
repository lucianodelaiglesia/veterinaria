const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require('./enrutador');

module.exports = (req, res) => {
    // obtener la URL
    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);

    // obtener la ruta
    const ruta = urlParseada.pathname;

    // quitar slash a ruta
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');

    // obtener el metodo http
    const metodo = req.method.toUpperCase();

    // obtener variables del query url
    const { query = {} } = urlParseada;

    // obtener los headers
    const { headers = {} } = req;

    // obtener payload, si es que hay
    const decoder = new StringDecoder('UTF-8');
    let buffer = '';

    // acumular data cuando el req reciba un payload
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    // terminar acumulacion y cerrar decoder
    req.on('end', () => {
        buffer += decoder.end();

        if (headers["content-type"] === 'application/json') {
            buffer = JSON.parse(buffer);
        }

        // revisar si tiene subrutas
        if (rutaLimpia.indexOf("/") > -1) {
            //separar rutas
            var [rutaPrincipal, indice] = rutaLimpia.split("/");
        }

        // ordenar la data
        const data = {
            indice,
            ruta: rutaPrincipal || rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer,
        };

        // elegir handler dependiendo de la ruta
        let handler;
        if (data.ruta &&
            enrutador[data.ruta] &&
            enrutador[data.ruta][metodo]
        ) {
            handler = enrutador[data.ruta][metodo];
        } else {
            handler = enrutador.noEncontrado;
        }

        // ejecutar handler
        if (typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.setHeader("Content-Type", "application/json");
                res.writeHead(statusCode);
                res.end(respuesta);
            });
        };
    });
};