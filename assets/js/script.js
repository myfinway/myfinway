(function () {
  "use strict";

  const actualizarValorEnHTML = (idElemento, valor) => {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
      const fila = elemento.parentNode;
      if (valor === 0) {
        fila.classList.add('ocultar-fila');
      } else {
        fila.classList.remove('ocultar-fila');
      }
      elemento.textContent = `$${valor.toFixed(2)}`;
    }
  };

  const mostrarActualizacionEnHTML = (fecha) => {
    const fechaActualizacion = new Date(fecha);
    const horaActualizacion = fechaActualizacion.toLocaleTimeString();
    const fechaHoraActualizacion = `${fechaActualizacion.toLocaleDateString()} ${horaActualizacion}`;
    const ultimaActualizacionElemento = document.getElementById("ultimaActualizacion");
    if (ultimaActualizacionElemento) {
      ultimaActualizacionElemento.textContent = `Última actualización: ${fechaHoraActualizacion}`;
    }
  };

  const obtenerValorDolar = async (tipo, idCompra, idVenta) => {
    try {
      const response = await fetch(`https://dolarapi.com/v1/dolares/${tipo}`);

      if (!response.ok) {
        throw new Error(`Error al obtener el valor del dólar ${tipo}: ${response.statusText}`);
      }

      const data = await response.json();
      const compraDolar = data.compra;
      const ventaDolar = data.venta;

      // Actualizar los valores en el HTML
      actualizarValorEnHTML(idCompra, compraDolar);
      actualizarValorEnHTML(idVenta, ventaDolar);
      mostrarActualizacionEnHTML(data.fechaActualizacion);
    } catch (error) {
      console.error(`Error al obtener el valor del dólar ${tipo}:`, error.message);
    }
  };

  obtenerValorDolar('oficial', 'compraOficial', 'ventaOficial');
  obtenerValorDolar('blue', 'compraBlue', 'ventaBlue');
  obtenerValorDolar('tarjeta', 'compraTarjeta', 'ventaTarjeta');
  obtenerValorDolar('bolsa', 'compraBolsa', 'ventaBolsa');
  obtenerValorDolar('mayorista', 'compraMayorista', 'ventaMayorista');
  obtenerValorDolar('contadoconliqui', 'compraCCL', 'ventaCCL');
  obtenerValorDolar('cripto', 'compraCripto', 'ventaCripto');
})();
