
/* Asociar eventos a elementos y ejecutar una funcion */
function addEvent($e,eventtype,func,capture) {
  /* eventos posibles */
  //  onblur    	Deseleccionar el elemento
  //  onchange  	Deseleccionar un elemento que se ha modificado
  //  onclick   	Pinchar y soltar el raton
  //  ondblclick 	Pinchar dos veces seguidas con el raton
  //  onfocus 	Seleccionar un elemento 	
  //  onkeydown 	Pulsar una tecla (sin soltar) 	
  //  onkeypress 	Pulsar una tecla 	
  //  onkeyup 	Soltar una tecla pulsada 	
  //  onload 		La pagina se ha cargado completamente 	
  //  onmousedown Pulsar (sin soltar) un boton del raton 	
  //  onmousemove Mover el raton 	Todos los elementos
  //  onmouseout 	El raton "sale" del elemento (pasa por encima de otro elemento) 	
  //  onmouseover El raton "entra" en el elemento (pasa por encima del elemento) 	
  //  onmouseup 	Soltar el boton que estaba pulsado en el raton 	
  //  onreset 	Inicializar el formulario (borrar todos sus datos) 	
  //  onresize 	Se ha modificado el tamano de la ventana del navegador 	
  //  onselect 	Seleccionar un texto 	
  //  onsubmit 	Enviar el formulario 	
  //  onunload 	Se abandona la pagina (por ejemplo al cerrar el navegador)
  //
  //  capture   true o false
  if ($e!=null) {
      if ($e.attachEvent) {
    	  $e.attachEvent(eventtype,func);
    	  return true;
      } else if ($e.addEventListener) {
      	  $e.addEventListener(eventtype,func,capture=false);
      	  return true;
      } else {
      	  return false;
      }
  }
}