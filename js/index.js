const cardsDiv = document.getElementById("divCards");
const cardimagen = document.getElementById("imagenCard");
const cardtitulo = document.getElementById("tituloCard");
const carddesc = document.getElementById("descCard");
const cardprecio = document.getElementById("precioCard");
const json = localStorage.getItem("productos"); // Traer de localStorage el dato asociado a la key del producto.
const data = JSON.parse(json); // Convertir datos de un string JSON a código JavaScript.
let productos = data || [];
let productoId = "";
// const productoEnviado = document.getElementById("enviarProducto")

function mostrarCards() {
  const cardsMap = productos.map(function (producto) {
    return ` 
        <div class="card1">
                <img class="img-card" id="imagenCard"  style="max-width: 350px; max-height: 350px; min-height: 350px" src="${producto.url}" alt="Avatar">
            <div id="contenidoCard" class="containercard">
                <h4 class="border-0 mb-3" id="tituloCard"><b>${producto.nombre}</b></h4>
                <h4 class="border-0"><b>Descripción</b></h4>
                <h5 id="descCard">${producto.descripcion}</h5>
                <h4 class="border-0"><b>Precio</b></h4>
                <p id="precioCard"><b>${producto.precio}</b></p>
                <h5 class="border-0"><b>Stock</b></h5>
                <p id="descCard"><b>${producto.cantidad}</b></p>
                <button id="botoncarrito" onclick="submitCarrito('${producto.id}')" class="btn2">Carrito</i></button>
               
            </div>
        </div>
    `;
  });
  cardsDiv.innerHTML = cardsMap.join("");
}

mostrarCards();
console.log(
  "🚀 ~ file: index.js ~ line 20 ~ cardsMap ~ tituloCard",
  tituloCard
);
