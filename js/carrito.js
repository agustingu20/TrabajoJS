// Definicion de Variables

const DatosCard = document.getElementById("contenidoCard");
const TituloInput = document.getElementById("tituloCard");
const PrecioInput = document.getElementById("precioCard");
const BtonCarrito = document.getElementById("botoncarrito");
const productoscarritoTable = document.getElementById("modalCarrito");
const tablacarrito = document.getElementById("tablacard");

// const editarForm = document.getElementById("formularioEditar");
// const editarNombreInput = document.getElementById("editarNombre");
// const editarDescripcionInput = document.getElementById("editarDescripcion");
// const editarCantidadInput = document.getElementById("editarCantidad");
// const editarPrecioInput = document.getElementById("editarPrecio");
// const editarUrlInput = document.getElementById("editarUrl");
// const busquedaForm = document.getElementById("formBusqueda");
const json1 = localStorage.getItem("productoscarrito"); // Traer de localStorage el dato asociado a la key del producto.
const data1 = JSON.parse(json1); // Convertir datos de un string JSON a código JavaScript.
let productoscarrito = data1 || [];
//  let productocarritoId = "";

// // Funcion para vista previa del producto
// UrlInput.onchange = function () {
//   srcimagen.src = UrlInput.value;
//   UrlInput.value;
// };
// limpiar localstorage
// let productosFiltrados = [];
//   const json = JSON.stringify(productosFiltrados);
//   localStorage.setItem("productoscarrito", json);
//   productoscarrito = productosFiltrados;

// Alta de Productos EN CARRITO
function generarID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// //funcion que guarda en json lo que se ingresa en el form
function submitCarrito(id1) {
  const prodEncontrado = productos.find((producto1) => producto1.id === id1);
  Nombre = prodEncontrado.nombre;
  Precio = prodEncontrado.precio;
  const producto1 = {
    id: generarID(),
    nombre: prodEncontrado.nombre,
    precio: prodEncontrado.precio,
  };

  productoscarrito.push(producto1);
  const json1 = JSON.stringify(productoscarrito); // Convertir datos a un string JSON.
  localStorage.setItem("productoscarrito", json1); // Guardar en localStorage un dato asociado a la key "productoscarrito".
}

// function mostrarDetalle(id) {
//   const prodEncontrado = productos.find((producto) => producto.id === id);
//   const cuerpoProd = document.getElementById("detalleProducto");
//   const fecha = new Date(prodEncontrado.registro);
//   const ProductosDetalles = `
//     <p>Nombre: ${prodEncontrado.nombre}</p>
//     <p>Descripcion: ${prodEncontrado.descripcion}</p>
//     <p>Cantidad: ${prodEncontrado.cantidad}</p>
//     <p>Precio: ${prodEncontrado.precio}</p>
//     <p>Url: ${prodEncontrado.url}</p>
//     <p>Fecha de registro: ${fecha.toLocaleString()}</p>
//     `;
//   cuerpoProd.innerHTML = ProductosDetalles;
// }

function mostrarProductos() {
  const productosCarritoMap = productoscarrito.map(function (producto) {
    return `
          <tr>
              <td>${producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>
                <button onclick="eliminarcarrito('${producto.id}')" class="btn btn-danger btn-sm ">Elimina   <i class="fa fa-eraser" aria-hidden="true"></i></button>
                
              </td>
              
          </tr>
          `;
  });

  tablacarrito.innerHTML = productosCarritoMap.join("");
  // mostrarProductos();
  //   formularioForm.reset();
}

// Eliminar Productos  Carrito
function eliminarcarrito(id) {
  const confirmar = confirm("Acepta eliminar del Carrito? ");
  if (!confirmar) {
    return;
  }
  let productosFiltrados = [];
  for (let i = 0; i < productoscarrito.length; i++) {
    const producto1 = productoscarrito[i];
    const coincideId = producto1.id === id;

    if (!coincideId) {
      productosFiltrados.push(producto1);
    }
  }
  const json = JSON.stringify(productosFiltrados);
  localStorage.setItem("productoscarrito", json);
  productoscarrito = productosFiltrados;
  console.log("Se eliminó exitosamente el Producto. 👨‍💻");
  //mostrarProductos();
}

// // Muestra Detalle del Producto

// function mostrarDetalle(id) {
//   const prodEncontrado = productos.find((producto) => producto.id === id);
//   const cuerpoProd = document.getElementById("detalleProducto");
//   const fecha = new Date(prodEncontrado.registro);
//   const ProductosDetalles = `
//     <p>Nombre: ${prodEncontrado.nombre}</p>
//     <p>Descripcion: ${prodEncontrado.descripcion}</p>
//     <p>Cantidad: ${prodEncontrado.cantidad}</p>
//     <p>Precio: ${prodEncontrado.precio}</p>
//     <p>Url: ${prodEncontrado.url}</p>
//     <p>Fecha de registro: ${fecha.toLocaleString()}</p>
//     `;
//   cuerpoProd.innerHTML = ProductosDetalles;
// }

// // Edita Productos
// // // Esta función carga los datos dela nota seleccionada,
// // // en los campos del formulario del documento HTML.
// function cargarModalEditar(id) {
//   // Buscar nota en el array usando el método find().
//   const prodEncontrada = productos.find((producto) => producto.id === id);
//   editarNombreInput.value = prodEncontrada.nombre;
//   editarDescripcionInput.value = prodEncontrada.descripcion;
//   editarCantidadInput.value = prodEncontrada.cantidad;
//   editarPrecioInput.value = prodEncontrada.precio;
//   editarUrlInput.value = prodEncontrada.url;
//   // Actualizar el valor de la variable global productoId, con el id del prod encontrado.
//   productoId = prodEncontrada.id;
// }

// // Al evento submit del formulario de edición le asignamos esta función,
// // que actualiza al producto seleccionado, con los datos ingresados.
// function editarProducto(e) {
//   e.preventDefault();
//   // Actualizar una articullo del array, usando map().
//   const productosModificado = productos.map((producto) => {
//     // Usamos el id del producto guardado en productoId,
//     // para modificar solo al producto que coincida con este.
//     if (producto.id === productoId) {
//       // Usar spread syntax para copiar las propiedades de un objeto a otro.
//       const productosModificado = {
//         ...producto,
//         nombre: editarNombreInput.value,
//         descripcion: editarDescripcionInput.value,
//         cantidad: editarCantidadInput.value,
//         precio: editarPrecioInput.value,
//         url: editarUrlInput.value,
//       };
//       return productosModificado;
//     } else {
//       // Retornar el produc sin modificar en los casos que no coincida el id.
//       return producto;
//     }
//   });
//   const json = JSON.stringify(productosModificado);
//   // Guardar lista de productos en localStorage.
//   localStorage.setItem("productos", json);
//   productos = productosModificado;
//   console.log("Se modificó exitosamente el articulo. 👨‍💻");
//   mostrarProductos();
//   // Ocultar el modal con las funciones incluidas en bootstrap.
//   const modalDiv = document.getElementById("modalEditar");
//   const modalBootstrap = bootstrap.Modal.getInstance(modalDiv);
//   modalBootstrap.hide();
// }

// // Rutina de busqueda
// const submitBusqueda = (e) => {
//   e.preventDefault();
//   const productosLocal = JSON.parse(localStorage.getItem("productos")) || [];
//   const busquedaInput = document.getElementById("busqueda");
//   const termino = busquedaInput.value.toLowerCase();
//   const productosFiltrados = productosLocal.filter((producto) => {
//     const nombreEnMinuscula = producto.nombre.toLowerCase();
//     // const emailEnMinuscula = usuario.email.toLowerCase();
//     return nombreEnMinuscula.includes(termino);
//     // || emailEnMinuscula.includes(termino);
//   });
//   productos = productosFiltrados;
//   mostrarProductos();
//   // Condicional para mostrar u ocultar el mensaje "sin resultados".
//   const alerta = document.getElementById("alertaBusqueda");
//   if (productosFiltrados.length === 0) {
//     alerta.classList.remove("d-none");
//   } else {
//     alerta.classList.add("d-none");
//   }
// };

// const limpiarFiltro = () => {
//   productos = JSON.parse(localStorage.getItem("productos")) || [];
//   busquedaForm.reset();
//   mostrarProductos();
//   const alerta = document.getElementById("alertaBusqueda");
//   alerta.classList.add("d-none");
// };

// mostrarProductos();
// FormCard.onsubmit = submitFormulario;
// editarForm.onsubmit = editarProducto;
// busquedaForm.onsubmit = submitBusqueda;
