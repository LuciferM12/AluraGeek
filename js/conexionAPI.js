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

  const conexionConvertida = conexion.json();
  return conexionConvertida;
}

export const conexionAPI = {
  listarProductos,
  enviarProducto,
};
