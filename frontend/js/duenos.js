const listaDuenos = document.getElementById('lista-duenos');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const dni = document.getElementById('dni');
const indice = document.getElementById('indice')
const pais = document.getElementById('pais');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const btnCerrar = document.getElementsByClassName('btn-cerrar')
const miModal = new bootstrap.Modal(document.getElementById('exampleModal'));
const formulario = document.getElementById("formulario");
const url = 'http://localhost:5000/duenos';

let duenos = [];

async function listarDuenos() {
    try {
        const respuesta = await fetch(url);
        const duenosDelServer = await respuesta.json();
        if (Array.isArray(duenosDelServer)) {
            duenos = duenosDelServer;
        }
        if (duenos.length > 0) {
            const htmlDuenos = duenos.map((dueno, index) =>
            `<tr>
            <th scope="row">${index}</th>
            <td>${dueno.dni}</td>
            <td>${dueno.nombre}</td>
            <td>${dueno.apellido}</td>
            <td>${dueno.pais}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-primary editar"><i class="bi bi-pencil"></i></button>
                    <button type="button" class="btn btn-danger eliminar"><i class="bi bi-trash"></i></button>
                </div>
            </td>
            </tr>`).join("");
            listaDuenos.innerHTML = htmlDuenos;
            Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
            Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
            return;
        } else {
            listaDuenos.innerHTML = `<tr><td colspan="6" class="lista-vacia">No hay dueños</td></tr>`
        }
    } catch (error) {
        $(".alert-danger").show();
    }
}

async function enviarDatos(e) {
    e.preventDefault();
    try {
        const datos = {
            dni: dni.value,
            nombre: nombre.value,
            apellido: apellido.value,
            pais: pais.value
        }
        if (validar(datos)) {
            let method = 'POST';
            let urlEnvio = url;
            const accion = btnGuardar.innerHTML;
            if (accion === 'Editar') {
                method = 'PUT';
                duenos[indice.value] = datos;
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
                listarDuenos();
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

function editar(index) {
    return function cuandoClickeo() {
        btnGuardar.innerHTML = 'Editar';
        miModal.toggle();
        btnGuardar.classList.remove("btn-success");
        btnGuardar.classList.add("btn-primary");
        const dueno = duenos[index];
        indice.value = index;
        dni.value = dueno.dni;
        nombre.value = dueno.nombre;
        apellido.value = dueno.apellido;
        pais.value = dueno.pais;
    }
}

function resetModal() {
    btnGuardar.innerHTML = 'Crear';
    [dni, nombre, apellido, pais, indice].forEach((inputActual) => {
        inputActual.value = "";
        inputActual.classList.remove("is-invalid");
    })
    btnGuardar.classList.remove("btn-primary");
    btnGuardar.classList.add("btn-success");
    $(".alert-warning").hide();
}

function eliminar(index) {
    const urlEnvio = `${url}/${index}`;
    return async function cuandoClickeo() {
        try {
            const respuesta = await fetch(urlEnvio, {
                method: 'DELETE',
            });
            if (respuesta.ok) {
                listarDuenos();
                resetModal();
            }
        } catch (error) {
            $(".alert-danger").show();
        }
    }
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

listarDuenos();
form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnCerrar[0].onclick = resetModal;
btnCerrar[1].onclick = resetModal;