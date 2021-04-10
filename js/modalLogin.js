const formularioIngreso = document.getElementById('formularioIngresoUsuario');
const alertaDiv = document.getElementById('alerta');
const emailInputModal = document.getElementById('inputEmailModal');
const contraseñaInputModal = document.getElementById('inputContraseñaModal');
const alertaDivBloqueo = document.getElementById('alertaBloqueo');

const adminLogin = { email: 'admin@admin.com', pass: 'Admin123' };

formularioIngreso.onsubmit = function (e) {
    e.preventDefault();
    const usuariosLocal = JSON.parse(localStorage.getItem('usuarios')) || [];
    const coincideEmailAdmin = adminLogin.email === emailInputModal.value;
    const coincidePassAdmin = adminLogin.pass === contraseñaInputModal.value;

    if (coincideEmailAdmin && coincidePassAdmin) {
        window.location.href = './admin.html';
        alertaDiv.classList.add('d-none');
        alertaDivBloqueo.classList.add('d-none');
    }
    for (let i = 0; i < usuariosLocal.length; i++) {
        const usuario = usuariosLocal[i];
        const coincideEmailUsuario = emailInputModal.value === usuario.email;
        const coincidePassUsuario = contraseñaInputModal.value === usuario.pass;

        if (coincideEmailUsuario && coincidePassUsuario && usuario.habilitacion === 'Habilitado') {
            window.location.href = './index.html';
            alertaDiv.classList.add('d-none');
            alertaDivBloqueo.classList.add('d-none');
        } else if (coincideEmailUsuario && coincidePassUsuario && usuario.habilitacion === 'Deshabilitado') {
            alertaDivBloqueo.classList.remove('d-none');
            alertaDiv.classList.add('d-none');
        } else {
            alertaDiv.classList.remove('d-none');
            alertaDivBloqueo.classList.add('d-none');
        }
    }
    formularioIngreso.reset();
}