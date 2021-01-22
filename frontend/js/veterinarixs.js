const listaDuenos = document.getElementById('lista-veterinarixs');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const dni = document.getElementById('dni');
const indice = document.getElementById('indice')
const pais = document.getElementById('pais');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const btnCerrar = document.getElementsByClassName('btn-cerrar')
const miModal = new bootstrap.Modal(document.getElementById('exampleModal'));

let duenos = [{
    dni: "40536830",
    nombre: "Luciano",
    apellido: "de la Iglesia",
    pais: "Argentina"
},
{
    dni: "42656320",
    nombre: "Ailen",
    apellido: "Aguino",
    pais: "Argentina"
}];

function listarDuenos() {
    const htmlVeterinarixs = duenos.map((veterinarix, index) =>
        `<tr>
        <th scope="row">${index}</th>
        <td>${veterinarix.dni}</td>
        <td>${veterinarix.nombre}</td>
        <td>${veterinarix.apellido}</td>
        <td>${veterinarix.pais}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary editar"><i class="bi bi-pencil"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="bi bi-trash"></i></button>
            </div>
        </td>
        </tr>`).join("");
    listaDuenos.innerHTML = htmlVeterinarixs;
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
}

function enviarDatos(e) {
    e.preventDefault();
    const datos = {
        dni : dni.value,
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value
    }
    const accion = btnGuardar.innerHTML;
    if (btnGuardar.innerHTML === 'Editar') {
        duenos[indice.value] = datos;
    } else if (btnGuardar.innerHTML === 'Crear') {
        duenos.push(datos);
    } else {
        return;
    }
    listarDuenos();
    resetModal();
}

function editar(index) {
    return function cuandoClickeo() {
        btnGuardar.innerHTML = 'Editar';
        miModal.toggle();
        btnGuardar.classList.remove("btn-success");
        btnGuardar.classList.add("btn-primary");
        const veterinarix = duenos[index];
        dni.value = veterinarix.dni;
        nombre.value = veterinarix.nombre;
        apellido.value = veterinarix.apellido;
        pais.value = veterinarix.pais;
        indice.value = index;
    }
}

function resetModal() {
    dni.value = '';
    nombre.value = '';
    apellido.value = '';
    pais.value = '';
    indice.value = '';
    btnGuardar.innerHTML = 'Crear'
    btnGuardar.classList.remove("btn-primary");
    btnGuardar.classList.add("btn-success");
}

function eliminar(index) {
    return function cuandoClickeo() {
        duenos = duenos.filter((veterinarix, indiceVeterinarix) => indiceVeterinarix !== index);
        listarDuenos();
    }
}

listarDuenos();
form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnCerrar[0].onclick = resetModal;
btnCerrar[1].onclick = resetModal;