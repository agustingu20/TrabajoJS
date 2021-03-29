// Obtener referencia al input y a la imagen

const $seleccionArchivos = document.querySelector("#seleccionArchivos"),
  $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");

// Escuchar cuando cambie
$seleccionArchivos.addEventListener("change", () => {
  // Los archivos seleccionados, pueden ser muchos o uno
  const archivos = $seleccionArchivos.files;
  // Si no hay archivos salimos de la función y quitamos la imagen
  if (!archivos || !archivos.length) {
    $imagenPrevisualizacion.src = "";
    return;
  }
  // Ahora tomamos el primer archivo, el cual vamos a previsualizar
  const primerArchivo = archivos[0];
  // Lo convertimos a un objeto de tipo objectURL
  const objectURL = URL.createObjectURL(primerArchivo);
  // Y a la fuente de la imagen le ponemos el objectURL
  $imagenPrevisualizacion.src = objectURL;
});

// Alta de Productos

const formularioForm = document.getElementById("form-producto");
const DescripInput = document.getElementById("descripcion");

const CantidadInput = document.getElementById("cantidad");
const PrecioInput = document.getElementById("precio");
const productosTable = document.getElementById("tabla");
const editarForm = document.getElementById("formularioEditar");
const editarDescripcionInput = document.getElementById("editarDescripcion");
const editarCantidadInput = document.getElementById("editarCantidad");
const editarPrecioInput = document.getElementById("editarPrecio");
const json = localStorage.getItem("productos"); // Traer de localStorage el dato asociado a la key del producto.
const data = JSON.parse(json); // Convertir datos de un string JSON a código JavaScript.
let productos = data || [];
let productoId = "";

// Alta de Productos
function generarID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

//funcion que guarda en json lo que se ingresa en el form
function submitFormulario(e) {
  e.preventDefault();
  const producto = {
    id: generarID(),
    descripcion: DescripInput.value,
    cantidad: CantidadInput.value,
    precio: PrecioInput.value,
  };
  productos.push(producto);
  console.log(
    "🚀 ~ file: productos.js ~ line 27 ~ DescripInput",
    DescripInput.value
  );
  const json = JSON.stringify(productos); // Convertir datos a un string JSON.
  localStorage.setItem("productos", json); // Guardar en localStorage un dato asociado a la key "productos".
  mostrarProductos();
  formularioForm.reset();
}

function mostrarProductos() {
  const productosMap = productos.map(function (producto) {
    return `
          <tr>
              <td>${producto.descripcion}</td>
              <td>${producto.cantidad}</td>
              <td>${producto.precio}</td>
              <td>
                <button onclick="eliminarProducto('${producto.id}')" class="btn btn-danger btn-sm">Eliminar</button>
                <button onclick="mostrarDetalle('${producto.id}')" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#mDetalles">Detalles</button>
                
              </td> 
          </tr>
          `;
  });
  productosTable.innerHTML = productosMap.join("");
}

// Eliminar Productos
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

// Muestra Detalle del Producto

function mostrarDetalle(id) {
  const prodEncontrado = productos.find((producto) => producto.id === id);
  const cuerpoProd = document.getElementById("detalleProducto");
  const fecha = new Date(prodEncontrado.registro);
  const ProductosDetalles = `
    <p>Descripcion: ${prodEncontrado.descripcion}</p>
    <p>Cantidad: ${prodEncontrado.cantidad}</p>
    <p>Precio: ${prodEncontrado.precio}</p>
    <p>Fecha de registro: ${fecha.toLocaleString()}</p> 
    `;
  cuerpoProd.innerHTML = ProductosDetalles;
}

// Edita Productos

// Esta función carga los datos del producto seleccionado,
// en los campos del formulario del documento HTML.
function cargarModalEditar(id) {
  // Buscar la nota en el array usando el método find().
  const ProdEncontrado = productos.find((producto) => producto.id === id);
  editarDescripcionInput.value = ProdEncontrado.descripcion;
  editarCantidadInput.value = ProdEncontrado.cantidad;
  editarPrecioInput.value = ProdEncontrado.precio;
  // Actualizar el valor de la variable global productoId, con el id del producto encontrado.
  productoId = ProdEncontrado.id;
}

// Al evento submit del formulario de edición le asignamos esta función,
// que actualiza al producto seleccionado, con los datos ingresados.
function editarProducto(e) {
  e.preventDefault();
  // Actualizar una articullo del array, usando map().
  const productosModificado = productos.map((producto) => {
    // Usamos el id del producto guardado en productoId,
    // para modificar solo al producto que coincida con este.
    if (producto.id === productoId) {
      // Usar spread syntax para copiar las propiedades de un objeto a otro.
      const productosModificado = {
        ...producto,
        descripcion: editarDescripcionInput.value,
        cantidad: editarCantidadInput.value,
        precio: editarPrecioInput.value,
      };
      return productosModificado;
    } else {
      // Retornar el produc sin modificar en los casos que no coincida el id.
      return producto;
    }
  });
  const json = JSON.stringify(productosModificado);
  // Guardar lista de productos en localStorage.
  localStorage.setItem("productos", json);
  productos = productosModificado;
  console.log("Se modificó exitosamente el articulo. 👨‍💻");
  mostrarProductos();
  // Ocultar el modal con las funciones incluidas en bootstrap.
  const modalDiv = document.getElementById("modalEditar");
  const modalBootstrap = bootstrap.Modal.getInstance(modalDiv);
  modalBootstrap.hide();
}
mostrarProductos();
formularioForm.onsubmit = submitFormulario;
editarForm.onsubmit = editarProducto;
