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
        <div class="card1 medio1 bg-transparent">
            <div class="frente">
                <img id="imagenCard" class="img-card"
                    src="${producto.url}" alt="">
            </div>
            <div class="atras">
                <div id="contenidoCard" class="contenidoatras medio">
                    <h1 id="tituloCard">${producto.nombre}</h1>
                    <h2 id="precioCard">${producto.precio}</h2>
                    <P id="descCard">${producto.descripcion}</P>
                    <div class="iconoscard">
                    <button id="botoncarrito" onclick="submitCarrito('${producto.id}')" class="fas fa-shopping-cart btn-cart bg-transparent border-0" ></button>
                    </div>
                </div>
            </div>
        </div>
    `;
    });
    cardsDiv.innerHTML = cardsMap.join("");
}

mostrarCards();
