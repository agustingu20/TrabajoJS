const formulario = document.getElementById('formularioRegistroUsuario');
const usuariosTabla = document.getElementById('tabla');
const nombreInput = document.getElementById('inputNombre');
const emailInput = document.getElementById('inputEmail');
const nacimientoInput = document.getElementById('inputFechaNacimiento');
const sexoInput = document.getElementById('inputSexo');
const contraseñaInput = document.getElementById('inputContraseña');
const habilitacionInput = document.getElementById('habilitacionUsuario');

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


formulario.onsubmit = function (e) {
    e.preventDefault();
    const usuario = {
        id: generarID(),
        nombre: inputNombre.value,
        email: inputEmail.value,
        nacimiento: inputFechaNacimiento.value,
        sexo: inputSexo.value,
        pass: contraseñaInput.value,
        habilitacion: habilitacionInput.value,
        registro: Date.now(),
    };
    usuarios.push(usuario);
    const json = JSON.stringify(usuarios);
    localStorage.setItem('usuarios', json);
    mostrarUsuarios();
    formularioForm.reset();
}



