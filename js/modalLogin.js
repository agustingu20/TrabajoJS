const formularioIngreso = document.getElementById('formularioIngresoUsuario');
const alertaDiv = document.getElementById('alerta');
const emailInputModal = document.getElementById('inputEmailModal');
const contraseñaInputModal = document.getElementById('inputContraseñaModal');
const alertaDivBloqueo = document.getElementById('alertaBloqueo');

// const registroNavbar = document.getElementById('navbarRegistrado');
// const sinIngreso = document.getElementById('usuarioIngreso');

const json2 = localStorage.getItem('usuarioRegistrado');
const data2 = JSON.parse(json2);
let usuarioRegistrado = data2 || [];

const adminLogin = { email: 'admin@admin.com', pass: 'Admin123' };

if (usuarioRegistrado.length !== 0) {
    function mostrarUsuarioRegistrado() {
        const registroNavbar = document.getElementById('navbarRegistrado');
        const sinIngreso = document.getElementById('usuarioIngreso');
        const usuarioReg = usuarioRegistrado.map(function (usuarioRegistrado) {
            return `
        <div class="container-fluid">
            <div class="logo-div">
                <img class="logonav" src="./img/LOGO3" alt="logO" />
            </div>
            <a id="botonborrar" onclick="limpiarCards1()" class="btn-buscarmenos-a"><i class="fas fa-trash"></i></a>
            <section class="pbusqueda">
                <form id="divBusqueda1" class="busqueda">
                    <input type="text" id="busqueda23" placeholder="Buqueda" required />
                    <div class="btn1">
                        <i class="fas fa-search-plus icon"></i>
                    </div>
                </form>
            </section>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse navbar1" id="navbarNavDropdown">
                <ul class="navlis">
                    <li><a href="./index.html#indexNav">Inicio</a></li>
                    <li><a href="./index.html#divCards">Categorias</a></li>
                    <li><a href="./index.html#about">About</a></li>
                    <li class="px-0">
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle navbar1" type="button"
                                id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                ${usuarioRegistrado.nombre}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" href="">Ver Perfil</a></li>
                                <li><a  onclick="cerrarSesion()" class="dropdown-item" href="">Cerrar Sesión</a></li>
                            </ul>
                        </div>
                    </li>
                    <a class="btn-cart-a" href="" data-bs-toggle="modal" data-bs-target="#modalCarrito"><i class="fas fa-shopping-cart btn-cart"></i></a>
                </ul>
            </div>
        </div>
                `;
        });
        registroNavbar.classList.remove('nav-registrado');
        sinIngreso.classList.add('d-none');
        registroNavbar.innerHTML = usuarioReg;

    };
    mostrarUsuarioRegistrado();
}

function cerrarSesion() {
    localStorage.removeItem('usuarioRegistrado');
    location.reload();
}


function eliminarProducto(id) {
    const confirmar = confirm("Acepta eliminar el producto? ");
    if (!confirmar) {
        return;
    }
    let productosFiltrados = [];
    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        const coincideId = producto.id === id;
        if (!coincideId) {
            productosFiltrados.push(producto);
        }
    }
    const json = JSON.stringify(productosFiltrados);
    localStorage.setItem("productos", json);
    productos = productosFiltrados;
    console.log("Se eliminó exitosamente el Producto. 👨‍💻");
    mostrarProductos();
}



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


            usuarioRegistrado.push(usuario);
            const json2 = JSON.stringify(usuarioRegistrado);
            localStorage.setItem('usuarioRegistrado', json2);

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
// mostrarUsuarioRegistrado();
