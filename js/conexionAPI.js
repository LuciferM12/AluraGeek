async function listarProductos() {
  const conexion = await fetch("https://fake-api-nine-gold.vercel.app/productos");
  const conexionConvertida = await conexion.json();

  return conexionConvertida;
}

async function enviarProducto(producto) {
  const conexion = await fetch("https://fake-api-nine-gold.vercel.app/productos", {
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
  const conexion = await fetch(`https://fake-api-nine-gold.vercel.app/productos/${id}`, {
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
