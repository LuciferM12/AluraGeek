import { tiposError, mensajes } from "./customErrors.js";
import { conexionAPI } from "./conexionAPI.js";

const camposDeFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");
const lista = document.querySelector("[data-lista]");
const limpiar = document.querySelector("#limpiar");
const campos = document.querySelectorAll(".campo__completo");

limpiar.addEventListener("click", () => {
  campos.forEach((texto) => {
    texto.value = "";
  });
});

async function crearProducto(e) {
  e.preventDefault();
  const listaRespuestas = {
    nombre: e.target.elements["nombre"].value,
    precio: e.target.elements["precio"].value,
    imagen: e.target.elements["imagen"].value,
  };
  lista.appendChild(
    crearCard(
      e.target.elements["nombre"].value,
      e.target.elements["precio"].value,
      e.target.elements["imagen"].value
    )
  );
  await conexionAPI.enviarProducto(JSON.stringify(listaRespuestas));
}

formulario.addEventListener("submit", (e) => crearProducto(e));

camposDeFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificarCampo(campo));
  campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

function verificarCampo(campo) {
  let mensaje = "";
  campo.setCustomValidity("");
  if (campo.name === "precio") {
    if (campo.value <= 0) {
      campo.setCustomValidity("Ingrese un precio válido");
    }
  }

  tiposError.forEach((error) => {
    if (campo.validity[error]) {
      mensaje = mensajes[campo.name][error];
    }
  });

  const mensajeError = campo.parentNode.querySelector(".mensaje-error");
  const validarInputCheck = campo.checkValidity();

  if (!validarInputCheck) {
    mensajeError.textContent = mensaje;
  } else {
    mensajeError.textContent = "";
  }
}

function crearCard(nombre, precio, imagen, id) {
  const producto = document.createElement("div");
  producto.className = "card";
  producto.innerHTML = `<img src="${imagen}" alt="producto"  />
    <div class="card-container--info">
        <p>${nombre}</p>
        <div class="card-container--value">
            <p>$${precio}</p>
            <img src="https://img.icons8.com/?size=100&id=13086&format=png&color=000000" class="borrar" data-id=${id}/>
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
          e.target.closest(".card").remove();
          await conexionAPI.eliminarProducto(id);
          window.location.reload();
        } catch (error) {
          console.error("Error al eliminar el producto");
        }
      });
    });
  }
}

listarProductos();
