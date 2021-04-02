const formularioIngreso = document.getElementById('formularioIngresoUsuario');
const alertaDiv = document.getElementById('alerta');
const emailInputModal = document.getElementById('inputEmailModal');
const contraseñaInputModal = document.getElementById('inputContraseñaModal');

const adminLogin = { email: 'admin@admin.com', pass: 'Admin123' };

formularioIngreso.onsubmit = function (e) {
    e.preventDefault();
    const usuariosLocal = JSON.parse(localStorage.getItem('usuarios')) || [];
    for (let i = 0; i < usuariosLocal.length; i++) {
        const usuario = usuariosLocal[i];
        const coincideEmailUsuario = emailInputModal.value === usuario.email;
        const coincidePassUsuario = contraseñaInputModal.value === usuario.pass;
        const coincideEmailAdmin = adminLogin.email === emailInputModal.value;
        const coincidePassAdmin = adminLogin.pass === contraseñaInputModal.value;
        if (coincideEmailUsuario && coincidePassUsuario) {
            window.location.href = './index.html';
            alertaDiv.classList.add('d-none');
        } else if (coincideEmailAdmin && coincidePassAdmin) {
            window.location.href = './admin.html';
        } else {
            alertaDiv.classList.remove('d-none');
        }
    }
    formularioIngreso.reset();
}