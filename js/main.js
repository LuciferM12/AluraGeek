import { tiposError, mensajes } from "./customErrors.js";

const camposDeFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const listaRespuestas = {
    nombre: e.target.elements["nombre"].value,
    precio: e.target.elements["precio"].value,
    imagen: e.target.elements["imagen"].value,
  };
  localStorage.setItem("productos", JSON.stringify(listaRespuestas));
});

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
