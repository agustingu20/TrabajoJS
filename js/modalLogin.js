const formularioIngreso = document.getElementById('formularioIngresoUsuario');
const emailInput = document.getElementById('inputEmailModal');
const contraseñaInput = document.getElementById('inputContraseñaModal');
const alertaDiv = document.getElementById('alerta');

const adminLogin = { email: 'admin@admin.com', pass: 'Admin123' };

formularioIngreso.onsubmit = function (e) {
    e.preventDefault();
    const coincideEmail = adminLogin.email === emailInput.value;
    const coincidePass = adminLogin.pass === contraseñaInput.value;
    // const coincideEmailUsuario = emailInput === usuario.email;
    // const coincidePassUsuario = contraseñaInput === usuario.pass;
    if (coincideEmail && coincidePass) {
        window.location.href = './admin.html';
    } else {
        alertaDiv.classList.remove('d-none');
    }
}



// else if (coincideEmailUsuario && coincidePassUsuario) {
//     window.location.href = './admin.html';
// }