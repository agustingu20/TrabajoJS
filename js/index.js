const cardsDiv = document.getElementById('divCards')
const cardimagen = document.getElementById('imagenCard')
const cardtitulo = document.getElementById('tituloCard')
const carddesc = document.getElementById('descCard')
const cardprecio = document.getElementById('precioCard')
const json = localStorage.getItem("productos"); // Traer de localStorage el dato asociado a la key del producto.
const data = JSON.parse(json); // Convertir datos de un string JSON a código JavaScript.
let productos = data || [];
let productoId = "";
// const productoEnviado = document.getElementById("enviarProducto")

function mostrarCards() {
    const cardsMap = productos.map(function (producto) {
        return ` 
        <div class="card1">
                <img id="imagenCard" src="${producto.url}" alt="Avatar">
            <div id="contenidoCard" class="containercard">
                <h4 class="border-0"><b>Nombre</b></h4>
                <h4 id="tituloCard"><b>${producto.nombre}</b></h4>
                <h4 class="border-0"><b>Descripción</b></h4>
                <h5 id="descCard">${producto.descripcion}</h5>
                <h4 class="border-0"><b>Precio</b></h4>
                <p id="precioCard"><b>${producto.precio}</b></p>
                <h5 class="border-0"><b>Stock</b></h5>
                <p id="descCard"><b>${producto.cantidad}</b></p>
                <p><button class="btn2">Comprar</button></p>
            </div>
        </div>
    `
    })
    cardsDiv.innerHTML = cardsMap.join("");
}

mostrarCards();





