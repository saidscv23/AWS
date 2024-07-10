const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({
  region: 'us-east-1'
});

exports.handler = async (event) => {
  const { eleccion } = JSON.parse(event.body); 
  const opciones = ['piedra', 'papel', 'tijera']; 
  const eleccionComputadora = opciones[Math.floor(Math.random() * opciones.length)]; 

  let resultado;

  if (eleccion === eleccionComputadora) {
    resultado = 'Empate';
  } else if (
    (eleccion === 'piedra' && eleccionComputadora === 'tijera') ||
    (eleccion === 'papel' && eleccionComputadora === 'piedra') ||
    (eleccion === 'tijera' && eleccionComputadora === 'papel')
  ) {
    resultado = 'Ganaste';
  } else {
    resultado = 'Perdiste';
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      eleccionJugador: eleccion,
      eleccionComputadora: eleccionComputadora,
      resultado: resultado
    }),
  };
};
