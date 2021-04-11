// Definicion de Variables

const DatosCard = document.getElementById("contenidoCard");
const TituloInput = document.getElementById("tituloCard");
const PrecioInput = document.getElementById("precioCard");
const BtonCarrito = document.getElementById("botoncarrito");
const productoscarritoTable = document.getElementById("modalCarrito");
const tablacarrito = document.getElementById("tablacard");
const carritoTablaModal = document.getElementById("tablaModalCarrito");

const json1 = localStorage.getItem("productoscarrito"); // Traer de localStorage el dato asociado a la key del producto.
const data1 = JSON.parse(json1); // Convertir datos de un string JSON a código JavaScript.
let productoscarrito = data1 || [];


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
  mostrarProductos();
}

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
  mostrarProductos();
}

