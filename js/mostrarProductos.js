import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]");

function crearCard(nombre, precio, imagen, id) {
  const producto = document.createElement("div");
  producto.className = "card";
  producto.innerHTML = `<img src="${imagen}" alt="producto"  />
    <div class="card-container--info">
        <p>${nombre}</p>
        <div class="card-container--value">
            <p>$${precio}</p>
            <img src="../img/trash.png" class="borrar" data-id=${id}/>
        </div>
    </div>`;
  return producto;
}

async function listarProductos() {
  const listaAPI = await conexionAPI.listarProductos();
  if (listaAPI.length == 0) {
    lista.innerHTML = "<h1>No hay productos aun</h1>";
  } else {
    lista.innerHTML = "<h1>Tus productos: </h1>";
    listaAPI.forEach((producto) =>
      lista.appendChild(
        crearCard(
          producto.nombre,
          producto.precio,
          producto.imagen,
          producto.id
        )
      )
    );
    const eliminar = document.querySelectorAll(".borrar");
    eliminar.forEach((boton) => {
      boton.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        try {
          await conexionAPI.eliminarProducto(id);
          e.target.closest(".card").remove();
        } catch (error) {
          console.error("Error al eliminar el producto");
        }
      });
    });
  }
}

listarProductos();
