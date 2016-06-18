
/* Asociar eventos a elementos y ejecutar una funcion */
function addEvent($e,nomevento,funcion,captura) {
  /*eventos posibles */
  //  onblur    	Deseleccionar el elemento
  //  onchange  	Deseleccionar un elemento que se ha modificado
  //  onclick   	Pinchar y soltar el raton
  //  ondblclick 	Pinchar dos veces seguidas con el raton
  //  onfocus 	Seleccionar un elemento 	
  //  onkeydown 	Pulsar una tecla (sin soltar) 	
  //  onkeypress 	Pulsar una tecla 	
  //  onkeyup 	Soltar una tecla pulsada 	
  //  onload 		La pÃ¡gina se ha cargado completamente 	
  //  onmousedown Pulsar (sin soltar) un botÃ³n del ratÃ³n 	
  //  onmousemove Mover el ratÃ³n 	Todos los elementos
  //  onmouseout 	El ratÃ³n "sale" del elemento (pasa por encima de otro elemento) 	
  //  onmouseover El ratÃ³n "entra" en el elemento (pasa por encima del elemento) 	
  //  onmouseup 	Soltar el botÃ³n que estaba pulsado en el ratÃ³n 	
  //  onreset 	Inicializar el formulario (borrar todos sus datos) 	
  //  onresize 	Se ha modificado el tamaÃ±o de la ventana del navegador 	
  //  onselect 	Seleccionar un texto 	
  //  onsubmit 	Enviar el formulario 	
  //  onunload 	Se abandona la pÃ¡gina (por ejemplo al cerrar el navegador)
  if ($e!=null) {
  	if ($e.attachEvent) {
    	$e.attachEvent(nomevento,funcion);
    	return true;
  	} else if ($e.addEventListener) {
      	$e.addEventListener(nomevento,funcion,captura);
      	return true;
    } else {
      	return false;
    }
  }
}