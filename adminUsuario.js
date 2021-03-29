const usuariosTabla = document.getElementById('tabla');
const nombreInput = document.getElementById('inputNombre');
const emailInput = document.getElementById('inputEmail');
const nacimientoInput = document.getElementById('inputFechaNacimiento');
const sexoInput = document.getElementById('inputSexo');
const contraseñaInput = document.getElementById('inputContraseña');
const busquedaForm = document.getElementById('formBusqueda');

const json = localStorage.getItem('usuarios');
const data = JSON.parse(json);
let usuarios = data || [];
let usuarioId = '';

// Generador de IDs

function generarID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

function mostrarUsuarios() {
    const usuariosMap = usuarios.map(function (usuario) {
        return `
        <tr>
        <td class="tipo-letra">${usuario.nombre}</td>
        <td class="tipo-letra">${usuario.email}</td>
        <td class="tipo-letra">${usuario.nacimiento}</td>
        <td class="tipo-letra">${usuario.sexo}</td>
        <td id="estado" class="tipo-letra">${'Habilitado'}</td>
        <td>
        <button onclick="eliminarUsuario('${usuario.id}')" class="btn btn-danger btn-sm">Eliminar</button>
        <button onclick="estadoUsuario('${usuario.id}')" class="btn btn-warning btn-sm">Bloquear/Desbloquear</button>
        </td>
        </tr>
        `;
    });
    usuariosTabla.innerHTML = usuariosMap.join("");
};
mostrarUsuarios();


function eliminarUsuario(id) {
    let usuariosFiltrados = [];
    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        const coincideId = usuario.id === id;
        if (!coincideId) {
            usuariosFiltrados.push(usuario);
        }
    }
    const json = JSON.stringify(usuariosFiltrados);
    localStorage.setItem('usuarios', json);
    usuarios = usuariosFiltrados;
    mostrarUsuarios();
}

const submitBusqueda = (e) => {
    e.preventDefault();
    const usuariosLocal = JSON.parse(localStorage.getItem('usuarios')) || [];
    const busquedaInput = document.getElementById('busquedaUsuario');
    const termino = busquedaInput.value.toLowerCase();
    const usuariosFiltrados = usuariosLocal.filter((usuario) => {
        const nombreEnMinuscula = usuario.nombre.toLowerCase();
        const emailEnMinuscula = usuario.email.toLowerCase();
        return nombreEnMinuscula.includes(termino) || emailEnMinuscula.includes(termino);
    });
    usuarios = usuariosFiltrados;
    mostrarUsuarios();
    // Condicional para mostrar u ocultar el mensaje "sin resultados".
    const alerta = document.getElementById('alertaBusqueda');
    if (usuariosFiltrados.length === 0) {
        alerta.classList.remove('d-none');
    } else {
        alerta.classList.add('d-none');
    }
};

const limpiarFiltro = () => {
    usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    busquedaForm.reset();
    mostrarUsuarios();
    const alerta = document.getElementById('alertaBusqueda');
    alerta.classList.add('d-none');
}

busquedaForm.onsubmit = submitBusqueda;
