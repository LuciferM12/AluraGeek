import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]");

function crearCard(nombre, precio, imagen) {
  const producto = document.createElement("div");
  producto.className = "card";
  producto.innerHTML = `<img src="${imagen}" alt="producto" />
    <div class="card-container--info">
        <p>${nombre}</p>
        <div class="card-container--value">
            <p>$${precio}</p>
            <img src="../img/trash.png" />
        </div>
    </div>`;
  return producto;
}

async function listarProductos() {
    const listaAPI = await conexionAPI.listarProductos();

    listaAPI.forEach(producto => lista.appendChild(crearCard(producto.nombre, producto.precio, producto.imagen)));
}

listarProductos();