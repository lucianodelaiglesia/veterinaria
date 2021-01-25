const listaConsultas = document.getElementById("lista-consultas");
const mascota = document.getElementById("mascota");
const veterinarix = document.getElementById("veterinarix");
const url = 'http://localhost:5000';

let consultas = [];
let mascotas = [];
let veterinarixs = [];

async function listarConsultas() {
    try {
        const entidad = "consultas";
        const respuesta = await fetch(`${url}/${entidad}`);
        const consultasDelServer = await respuesta.json();
        if (Array.isArray(consultasDelServer)) {
            consultas = consultasDelServer;
        };
        if (respuesta.ok) {
            const htmlConsultas = consultas.map((consulta, index) =>
                `<tr>
                <th scope="row">${index}</th>
                <td>${consulta.mascota.nombre}</td>
                <td>${consulta.veterinarix.nombre} ${consulta.veterinarix.apellido}</td>
                <td>${consulta.diagnostico}</td>
                <td>${consulta.fechaCreacion}</td>
                <td>${consulta.fechaEdicion}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary editar"><i class="bi bi-pencil"> Editar</i></button>
                    </div>
                </td>
                </tr>`).join("");
            listaConsultas.innerHTML = htmlConsultas;
        };
    } catch (error) {
        $(".alert").show();
    };
};

listarConsultas();

async function listarMascotas() {
    const entidad = "mascotas";
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const mascotasDelServidor = await respuesta.json();
        if (Array.isArray(mascotasDelServidor)) {
            mascotas = mascotasDelServidor;
        };
        if (respuesta.ok) {
            mascotas.forEach((_mascota, index) => {
                const optionActual = document.createElement("option");
                optionActual.innerHTML = _mascota.nombre;
                optionActual.value = index;
                mascota.appendChild(optionActual);
            });
        };
    } catch (error) {
        $(".alert").show();
    };
};

listarMascotas();

async function listarVeterinarixs() {
    const entidad = "veterinarixs";
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const veterinarixsDelServidor = await respuesta.json();
        if (Array.isArray(veterinarixsDelServidor)) {
            veterinarixs = veterinarixsDelServidor;
        };
        if (respuesta.ok) {
            veterinarixs.forEach((_veterinarix, index) => {
                const optionActual = document.createElement("option");
                optionActual.innerHTML = `${_veterinarix.nombre} ${_veterinarix.apellido}`;
                optionActual.value = index;
                veterinarix.appendChild(optionActual);
            });
        };
    } catch (error) {
        $(".alert").show();
    };
};

listarVeterinarixs();