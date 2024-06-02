/* primero obtengo los elementos del html para js - catch the dom */


/* estos son los elementos que van a recibir la accion del usuario
y entregar al programa una informacion dinamica */
const cronometro = document.getElementById('cronometro');

const botonInicioPausa = document.getElementById('boton-inicio-pausa');
const botonReiniciar = document.getElementById('boton-reiniciar');


/* ahora creamos con esta sintaxis tres variables, y les asignamos sus correspondientes
valores.
esto se puede hacer ubicandolas dentro de arrays - entre corchetes */
let [horas, minutos, segundos] = [0, 0, 0];


let intervaloDeTiempo;/*cuanto tiempo debe transcurrir para actualizar el estado del cron.*/
let estadoCronometro = 'pausado';


function actualizarCronometro() {
  /* logica de la mecanica del relog */
  /* cuando se llama a la fc transcurrio un segundo */

  /* inicio en un segundo */
  segundos++;

  if(segundos / 60 === 1 ) {
    segundos = 0;
    minutos++;

    if(minutos / 60 === 1) {
      minutos = 0;
      horas++;
    }
  }

  /* para manejar como se presentaran en el cronometro
  los numeros de un solo digito
  se define entonces agregar un 0 antes del numero d un solo digito
  se asigna un formato, por eso creamos esas variables y esa funcion */
  const segundosConFormato = asignarFormato(segundos);
  const minutosConFormato = asignarFormato(minutos);
  const horasConFormato = asignarFormato(horas);


  /* actualizar el contenido del cronometro, lo que se le muestra al usuario */
  cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`;
}

function asignarFormato(unidadDeTiempo) {
  return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
}


/* ahora falta vincular el relog con los botones */

botonInicioPausa.addEventListener('click', function() {
  if (estadoCronometro === 'pausado') {
    intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);
    /* la unidad de actualizacion para el metodo setInterval es de milisegundos
    por eso ponemos mil, para un segundo. -window es un tipo de obj */

    botonInicioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>';
    /* aqui actualizo el html dinamicamente con la direccion del icono */

    /* tambien necesito actualizar algunas clases
    porque el mismo boton que ahora estando pausado el cronometro tiene la clase iniciar 
    si el cronometro ya inicio, va a necesitar la clase pausar, porque cambia el objetivo 
    del boton*/
    botonInicioPausa.classList.remove('iniciar');
    botonInicioPausa.classList.add('pausar');
    estadoCronometro = 'andando';
  } else {
    window.clearInterval(intervaloDeTiempo); 
    botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
    botonInicioPausa.classList.remove('pausar');
    botonInicioPausa.classList.add('iniciar');
    estadoCronometro = 'pausado';
  }
});


/* ahora debemos trabajar en reiniciar el cronometro */
 
botonReiniciar.addEventListener('click', function() {
  window.clearInterval(intervaloDeTiempo);

  horas = 0;
  minutos = 0;
  segundos = 0;

  /* reiniciar */
  cronometro.innerText = '00:00:00';

  /* actualizar botones */
  botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
  botonInicioPausa.classList.remove('pausar');
  botonInicioPausa.classList.add('iniciar');

  estadoCronometro = 'pausado';
})