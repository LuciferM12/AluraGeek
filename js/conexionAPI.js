async function listarProductos() {
  const conexion = await fetch("http://localhost:3001/productos");
  const conexionConvertida = await conexion.json();

  return conexionConvertida;
}

async function enviarProducto(producto) {
  const conexion = await fetch("http://localhost:3001/productos", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: producto,
  });

  //const conexionConvertida = conexion.json();

  if (!conexion.ok) {
    throw new Error("Ha ocurrido un error enviando el producto");
  }
}

async function eliminarProducto(id) {
  const conexion = await fetch(`http://localhost:3001/productos/${id}`, {
    method: "DELETE",
  });
  if (!conexion.ok) {
    throw new Error("Error de eliminación");
  }
  return true;
}

export const conexionAPI = {
  listarProductos,
  enviarProducto,
  eliminarProducto,
};
