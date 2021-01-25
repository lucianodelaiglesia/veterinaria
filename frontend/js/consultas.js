const listaConsultas = document.getElementById("lista-consultas");
const url = 'http://localhost:5000/consultas'

let consultas = [];


async function listarConsultas() {
    try {
        const respuesta = await fetch(url);
        const consultasDelServer = await respuesta.json();
        if (Array.isArray(consultasDelServer)) {
            consultas = consultasDelServer;
        }
        if (consultas.length > 0) {
            const htmlConsultas = consultas.map((consulta, index) =>
                `<tr>
                <th scope="row">${index}</th>
                <td>${consulta.mascota}</td>
                <td>${consulta.veterinarix}</td>
                <td>${consulta.diagnostico}</td>
                <td>${consulta.fechaCreacion}</td>
                <td>${consulta.fechaEdicion}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary editar"><i class="bi bi-pencil"></i></button>
                        <button type="button" class="btn btn-danger eliminar"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
                </tr>`).join("");
            listaConsultas.innerHTML = htmlConsultas;
        };
    } catch (error) {
        $(".alert").show();
    }
}

listarConsultas();