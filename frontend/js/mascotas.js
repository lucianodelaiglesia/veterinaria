const listaMascotas = document.getElementById('lista-mascotas');
const nombre = document.getElementById('nombre');
const dueno = document.getElementById('dueno');
const indice = document.getElementById('indice')
const tipo = document.getElementById('tipo');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const btnCerrar = document.getElementsByClassName('btn-cerrar')
const miModal = new bootstrap.Modal(document.getElementById('exampleModal'));

let mascotas = [];

async function listarMascotas() {
    try {
        const respuesta = await fetch('http://localhost:5000/mascotas');
        const mascotasDelServer = await respuesta.json();
        if (Array.isArray(mascotasDelServer) && mascotasDelServer.length > 0) {
            mascotas = mascotasDelServer;
        }
        const htmlMascotas = mascotas
            .map((mascota, index) =>
                `<tr>
        <th scope="row">${index}</th>
        <td>${mascota.nombre}</td>
        <td>${mascota.dueno}</td>
        <td>${mascota.tipo}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary editar"><i class="bi bi-pencil"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="bi bi-trash"></i></button>
            </div>
        </td>
        </tr>`).join("");
        listaMascotas.innerHTML = htmlMascotas;
        Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
        Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
    } catch (error) {
        throw error;
    }
}

function enviarDatos(e) {
    e.preventDefault();
    const datos = {
        nombre: nombre.value,
        dueno: dueno.value,
        tipo: tipo.value
    }
    const accion = btnGuardar.innerHTML;
    if (btnGuardar.innerHTML === 'Editar') {
        mascotas[indice.value] = datos;
    } else if (btnGuardar.innerHTML === 'Crear') {
        mascotas.push(datos);
    } else {
        return;
    }
    listarMascotas();
    resetModal();
}

function editar(index) {
    return function cuandoClickeo() {
        btnGuardar.innerHTML = 'Editar';
        miModal.toggle();
        btnGuardar.classList.remove("btn-success");
        btnGuardar.classList.add("btn-primary");
        const mascota = mascotas[index];
        nombre.value = mascota.nombre;
        dueno.value = mascota.dueno;
        tipo.value = mascota.tipo;
        indice.value = index;
    }
}

function resetModal() {
    nombre.value = '';
    dueno.value = '';
    tipo.value = '';
    indice.value = '';
    btnGuardar.innerHTML = 'Crear'
    btnGuardar.classList.remove("btn-primary");
    btnGuardar.classList.add("btn-success");
}

function eliminar(index) {
    return function cuandoClickeo() {
        mascotas = mascotas.filter((mascota, indiceMascota) => indiceMascota !== index);
        listarMascotas();
    }
}

listarMascotas();
form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnCerrar[0].onclick = resetModal;
btnCerrar[1].onclick = resetModal;