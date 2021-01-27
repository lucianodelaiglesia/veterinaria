const listaConsultas = document.getElementById("lista-consultas");
const mascota = document.getElementById("mascota");
const veterinarix = document.getElementById("veterinarix");
const historia = document.getElementById("historia");
const diagnostico = document.getElementById("diagnostico");
const indice = document.getElementById("indice");
const btnGuardar = document.getElementById('btn-guardar');
const btnCerrar = document.getElementsByClassName('btn-cerrar');
const miModal = new bootstrap.Modal(document.getElementById('exampleModal'));
const formulario = document.getElementById("formulario");
const url = 'https://veterinaria-backend-seven.vercel.app';

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
        }
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
            Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
        }
    } catch (error) {
        $(".alert-danger").show();
    }
}

listarConsultas();

async function listarMascotas() {
    const entidad = "mascotas";
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const mascotasDelServidor = await respuesta.json();
        if (Array.isArray(mascotasDelServidor)) {
            mascotas = mascotasDelServidor;
        }
        if (respuesta.ok) {
            mascotas.forEach((_mascota, index) => {
                const optionActual = document.createElement("option");
                optionActual.innerHTML = _mascota.nombre;
                optionActual.value = index;
                mascota.appendChild(optionActual);
            });
        }
    } catch (error) {
        $(".alert-danger").show();
    }
}

listarMascotas();

async function listarVeterinarixs() {
    const entidad = "veterinarixs";
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const veterinarixsDelServidor = await respuesta.json();
        if (Array.isArray(veterinarixsDelServidor)) {
            veterinarixs = veterinarixsDelServidor;
        }
        if (respuesta.ok) {
            veterinarixs.forEach((_veterinarix, index) => {
                const optionActual = document.createElement("option");
                optionActual.innerHTML = `${_veterinarix.nombre} ${_veterinarix.apellido}`;
                optionActual.value = index;
                veterinarix.appendChild(optionActual);
            });
        }
    } catch (error) {
        $(".alert-danger").show();
    }
}

listarVeterinarixs();

function editar(index) {
    return function cuandoClickeo() {
        btnGuardar.innerHTML = 'Editar';
        miModal.toggle();
        btnGuardar.classList.remove("btn-success");
        btnGuardar.classList.add("btn-primary");
        const consulta = consultas[index];
        indice.value = index;
        mascota.value = consulta.mascota.id;
        veterinarix.value = consulta.veterinarix.id;
        historia.value = consulta.historia;
        diagnostico.value = consulta.diagnostico;
    }
}

async function enviarDatos(e) {
    e.preventDefault();
    const entidad = "consultas";
    try {
        const datos = {
            mascota: mascota.value,
            veterinarix: veterinarix.value,
            historia: historia.value,
            diagnostico: diagnostico.value
        }
        if (validar(datos)) {
            let method = 'POST';
            let urlEnvio = `${url}/${entidad}`;
            const accion = btnGuardar.innerHTML;
            if (accion === 'Editar') {
                method = 'PUT';
                consultas[indice.value] = datos;
                urlEnvio += `/${indice.value}`;
            }
            const respuesta = await fetch(urlEnvio, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            if (respuesta.ok) {
                listarConsultas();
                miModal.toggle();
                resetModal();
            }
            return;
        }
        $(".alert-warning").show();
    } catch (error) {
        $(".alert-danger").show();
    }
}

function resetModal() {
    btnGuardar.innerHTML = 'Crear';
    [mascota, veterinarix, diagnostico, historia, indice].forEach((inputActual) => {
        inputActual.value = "";
        inputActual.classList.remove("is-invalid");
    })
    btnGuardar.classList.remove("btn-primary");
    btnGuardar.classList.add("btn-success");
    $(".alert-warning").hide();
}

function validar(datos) {
    let respuesta = true;
    if (typeof datos !== 'object') return false;
    for (let key in datos) {
        if (datos[key].length === 0) {
            document.getElementById(key).classList.add("is-invalid");
            respuesta = false;
        } else {
            document.getElementById(key).classList.remove("is-invalid");
            document.getElementById(key).classList.remove("is-valid");
        }
    }
    return respuesta;
}

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnCerrar[0].onclick = resetModal;
btnCerrar[1].onclick = resetModal;