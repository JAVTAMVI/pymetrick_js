
function is_null(mixed_var){
	return (mixed_var === null);
}
function is_int(mixed_var){
	return mixed_var === +mixed_var && isFinite(mixed_var) && !(mixed_var % 1);
}
function is_float(mixed_var){
	return +mixed_var === mixed_var && (!isFinite(mixed_var) || !! (mixed_var % 1));
}
function is_string(mixed_var){
	return (typeof mixed_var === 'string');
}
function is_numeric(mixed_var){
	var whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
      return (typeof mixed_var === 'number' || (typeof mixed_var === 'string' && whitespace.indexOf(mixed_var.slice(-1)) === -1)) && mixed_var !== '' && !isNaN(mixed_var);
}
function trim(mixed_var){
	return mixed_var.replace(/^\s+/g,'').replace(/\s+$/g,'');
}
function numbersonly(e){
      var unicode=e.charCode? e.charCode : e.keyCode;
      if (unicode!==8){                 //if the key isn't the backspace key
         if (unicode<48||unicode>57) {  //if not a number
         	return false;               //disable key press
         }                   
      }
      return true;
}
/* redondear numeros decimales */
function roundNumber(num, places) {
    return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
}
function decimalsonly(e){
      var unicode=e.charCode? e.charCode : e.keyCode;
      if (unicode!==8){ //if the key isn't the backspace key
         if (unicode<44||unicode>57) {  //if not a number
             return false;              //disable key press
         }
      }
      return true;
}
function is_array(mixed_var){
      return (mixed_var instanceof Array);
}
function is_date(mixed_var){
      return (mixed_var instanceof Date);
}

function displayunicode(e){
      var unicode=e.charCode? e.charCode : e.keyCode;
	/* var unicode=e.keyCode? e.keyCode : e.charCode */
	alert(unicode);
}
function detectspecialkeys(e){
	var evtobj=window.event? event : e;
	if (evtobj.altKey || evtobj.ctrlKey || evtobj.shiftKey) {
		alert("Ha pulsado 'Alt', 'Ctrl', o 'Shift'");
      }
}
/* document.onkeypress=detectspecialkeys */
function moveOnMax(field,nextFieldID){
  if(field.value.length >= field.maxLength){
    document.getElementById(nextFieldID).focus();
  }
}
function esc(text) {
    return text.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;');
}

/* Pausar la ejecucion una cantidad de segundos */
function sleep(ss)
  {
    var dt = Math.floor(Date.now() / 1000);
    while ( Math.floor(Date.now() / 1000) < (dt+ss));
  }

/* Ocultar un elemento */
function hideElement(elementID) {
   document.getElementById(elementID).style.display ='none';
}

/* Mostrar un elemento */
function showElement(elementID) {
   document.getElementById(elementID).style.display ='inline';
}

/* Insertar un elemento */
function insertElement(elementID,mixed_var) {
   document.getElementById(elementID).innerHTML=mixed_var;
}

/* Obtener focus - for FIREFOX */
function focusMe(id){
     setTimeout(function(){ document.getElementById(id).focus(); }, 500);
}

/* Rellenar las opciones de un select */
function fillOptions(elementID,json_object) {
    /* parametro recibido como json con estructura [{'text':...,'value':...,'selected':...},{'text':...,'value':...},...] */
    /* eliminar contenido previamente */
    var $e = elementID;
    while($e.options.length){
      $e.remove(0);
    }
    var $option_selected = 0;
    for(var $i = 0, $l = json_object.length; $i < $l; $i++){
        var $o = json_object[$i];
        $e.options.add( new Option($o.text, $o.value) );
        if(typeof $o.selected !== 'undefined'){
            $option_selected = $i;
        }
    }
    /* inicializa la vista de opciones disponibles */
    $e.selectedIndex = $option_selected;
}

/* Tratamiento de TABLE */
function addRow(id){
   /* incorporar una fila al final de una tabla */
   t = document.getElementById(id);
   var newRow = t.tBodies[0].rows[0].cloneNode(true);
   for (var n=0;n<newRow.cells.length;n++){
       newRow.cells[n].innerHTML = '';
   }
   /*newRow.cells[0].innerHTML = "cell 1 content";
   newRow.cells[1].innerHTML = "cell 2 content";*/
   t.tBodies[0].appendChild(newRow);
}

/* comprobar dimension de un objeto dict si el navegador no soportara Object.keys */
/* uso if(Object.keys(obj).length>0){  */
if (!Object.keys) {
    Object.keys = function (obj) {
        var arr = [],
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push(key);
            }
        }
        return arr;
    };
}
