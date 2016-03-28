/**************************************************************************************
  pymetrick.js v0.2
  
  Copyright (c) 2014, Fco. Javier Tamarit
  All Rights Reserved

  Redistribution and use in source and binary forms, with or without modification, are 
    permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of 
      conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list 
      of conditions and the following disclaimer in the documentation and/or other materials 
      provided with the distribution.
    * Neither the name of the product nor the names of its contributors may be used to 
      endorse or promote products derived from this software without specific prior 
      written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS 
  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
  MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL 
  THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE 
  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
  AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
  OF THE POSSIBILITY OF SUCH DAMAGE.
***************************************************************************************/



/* Implementacion de XMLHTTPRequest para comunicacion AJAX */
function getXMLHTTPRequest(){
    var $xmlHttp = false;
    if (!$xmlHttp && typeof XMLHTTPRequest === "undefined") {
        try{
	         $xmlHttp = new XMLHttpRequest();
        } catch (e) {
           $xmlHttp = false;
        }
    }
    if (!$xmlHttp && window.createRequest) {
        try{
            $xmlHttp = new window.createRequest();
        } catch (e) {
            $xmlHttp = false;
        }
    }
    if (!$xmlHttp && window.ActiveXObject) {
        var $ieXMLHttpVersions = ['MSXML2.XMLHTTP.6.0','MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
        for (var i = 0; i < $ieXMLHttpVersions.length; i++) {
            try {
                $xmlHttp = new ActiveXObject($ieXMLHttpVersions[i]);
            } catch (e) {
                $xmlHttp = false;
            }
        }
    }
    if (!$xmlHttp) {
        alert ('IMPOSIBLE crear objeto AJAX !!!');
        return false;
    } else {
        return $xmlHttp;
    }
}
var $xhr = getXMLHTTPRequest();
var $editLink = ''

/* Link para la edicion de formularios simples */
function getEditLink(Link) {
    $editLink = Link;
}

var $message_list = [];

function getData($xhr_values) {
    /*var xhr_values = Object.create({'data':,'url':,'f_return':,'com_type':,'content-type':,'accept':,'message':}) */
    if ($xhr_values.Return==null || $xhr_values.Return === undefined) {
        $xhr_values.Return = OnStateChange;
    }
    if ($xhr_values.Message !== undefined && $xhr_values.Message !== null) {
        $message_list = $xhr_values.Message.split("|");
    } else {
        $message_list = [];
    }
    if ($xhr_values.Type === undefined || $xhr_values.Type == null){
        $xhr_values.Type = true;
    } 
    if ($xhr_values.Data === undefined){
        return false;
    } else {
    	var miAleatorio = new Date().getTime();
    	var url = $xhr_values.Url+'?' + $xhr_values.Data;
        $xhr.open("GET", url, $xhr_values.Type);
        $xhr.setRequestHeader('Content-Type', $xhr_values.Content_Type+';charset=UTF-8');
        $xhr.setRequestHeader('Accept',$xhr_values.Accept);
        $xhr.setRequestHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0');
        $xhr.setRequestHeader('Pragma', 'no-cache');
        $xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        $xhr.onreadystatechange = $xhr_values.Return;
        $xhr.send(null);
    }
}
/* Envio de informacion con method POST */
function postData($xhr_values) {
    if ($xhr_values.Return==null || $xhr_values.Return === undefined) {
        $xhr_values.Return = OnStateChange;
    }
    if ($xhr_values.Message !== undefined && $xhr_values.Message !== null) {
        $message_list = $xhr_values.Message.split("|");
    } else {
        $message_list = [];
    }
    if ($xhr_values.Type === undefined || $xhr_values.Type == null){
        $xhr_values.Type = true;
    } 
    if ($xhr_values.Data === undefined){
        return false;
    } else {
        var miAleatorio = new Date().getTime();
        $xhr.open("POST", $xhr_values.Url , $xhr_values.Type);
        $xhr.setRequestHeader('Content-Type', $xhr_values.Content_Type+';charset=UTF-8');
        $xhr.setRequestHeader('Accept',$xhr_values.Accept);
        $xhr.setRequestHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0');
        $xhr.setRequestHeader('Pragma', 'no-cache');
        $xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        $xhr.onreadystatechange = $xhr_values.Return;
        $xhr.send($xhr_values.Data);
    }
}
/* Envio de informacion con method PUT */
function putData($xhr_values) {
    if ($xhr_values.Return==null || $xhr_values.Return === undefined) {
        $xhr_values.Return = OnStateChange;
    }
    if ($xhr_values.Message !== undefined && $xhr_values.Message !== null) {
        $message_list = $xhr_values.Message.split("|");
    } else {
        $message_list = [];
    }
    if ($xhr_values.Type === undefined || $xhr_values.Type == null){
        $xhr_values.Type = true;
    } 
    if ($xhr_values.Data === undefined){
        return false;
    } else {
        var miAleatorio = new Date().getTime();
        $xhr.open("PUT", $xhr_values.Url , $xhr_values.Type);
        $xhr.setRequestHeader('Content-Type', $xhr_values.Content_Type+';charset=UTF-8');
        $xhr.setRequestHeader('Accept',$xhr_values.Accept);
        $xhr.setRequestHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0');
        $xhr.setRequestHeader('Pragma', 'no-cache');
        $xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        $xhr.onreadystatechange = $xhr_values.Return;
        $xhr.send($xhr_values.Data);
    }
}
/* Envio de informacion con method DELETE */
function deleteData($xhr_values) {
    if ($xhr_values.Return==null || $xhr_values.Return === undefined) {
        $xhr_values.Return = OnStateChange;
    }
    if ($xhr_values.Message !== undefined && $xhr_values.Message !== null) {
        $message_list = $xhr_values.Message.split("|");
    } else {
        $message_list = [];
    }
    if ($xhr_values.Type === undefined || $xhr_values.Type == null){
        $xhr_values.Type = true;
    } 
    if ($xhr_values.Data === undefined){
        return false;
    } else {
        var miAleatorio = new Date().getTime();
        $xhr.open("DELETE", $xhr_values.Url , $xhr_values.Type);
        $xhr.setRequestHeader('Content-Type', $xhr_values.Content_Type+';charset=UTF-8');
        $xhr.setRequestHeader('Accept',$xhr_values.Accept);
        $xhr.setRequestHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0');
        $xhr.setRequestHeader('Pragma', 'no-cache');
        $xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        $xhr.onreadystatechange = $xhr_values.Return;
        $xhr.send($xhr_values.Data);
    }
}
function OnStateChange() {
    if ($xhr.readyState==4) {
        if ($xhr.status==200) {
            if ($message_list.length>0) {
                document.getElementById('alert.modalTitle').innerHTML='INFORMACION';
                document.getElementById('alert.message').innerHTML=$message_list[0];
                $('#message').modal("toggle",{backdrop: true});
            } else {
                console.log($xhr.responseText);
            }
        } else {
            if ($message_list.length>1) {
                document.getElementById('alert.modalTitle').innerHTML='INFORMACION';
                document.getElementById('alert.message').innerHTML=$message_list[1];
                $('#message').modal("toggle",{backdrop: true});
            } else {
                console.log($xhr.responseText);
            }
        } 
        console.log($xhr.status);
    } else if ($xhr.readyState==1) {
        /* conexion establecida */
        /* consulta recibida    */
        console.log('readyState ' + $xhr.readyState);
        console.log('status ' + $xhr.status); 
    } else if ($xhr.readyState==2) {
        /* en espera */
        console.log('readyState ' + $xhr.readyState);
        console.log('status ' + $xhr.status); 
    } else if ($xhr.readyState==3) {
        /* procesando */ 
        console.log('readyState ' + $xhr.readyState);
        console.log('status ' + $xhr.status); 
    } else {
        console.log('readyState ' + $xhr.readyState);
        console.log('status ' + $xhr.status); 
    }
}
/*funciones de localStorage*/
function localStorageSupported() {
    console.log("window.localStorage: "+window.localStorage);
    console.log("window.indexedDB: "+window.indexedDB);
    console.log("window.msIndexedDB: "+window.msIndexedDB); 
    console.log("window.mozIndexedDB: "+window.mozIndexedDB); 
    if ('localStorage' in window && window['localStorage'] !== null) {
        /* localStorage esta soportado */
        return true;
    } else { 
        /* localStorage no esta soportado */
        return false;
    }
}    
function ls_setItem($ref,$data) {
    if (localStorageSupported()){
        localStorage.setItem($ref, $data);
    }
}
function ls_getItem($ref) {
    if (localStorageSupported()){
        return localStorage.getItem($ref);
    }
} 
function ls_setJsonItem($ref,$json_data) {
    if (localStorageSupported()){
        localStorage.setItem($ref, JSON.stringify($json_data));
    }
}
function ls_getJsonItem($ref) {
    if (localStorageSupported()){
        return JSON.parse(localStorage.getItem($ref));
    }
}   
function ls_removeItem($ref) {
    if (localStorageSupported()){
        localStorage.removeItem($ref);
    }
}
function ls_Clear() {
    if (localStorageSupported()){
        localStorage.clear();
    }
}
function ls_Items() {
    if (localStorageSupported()){
        return localStorage.length();
    }
}
/* crear tabla a partir de un JSON*/
function createTable($tbl,$json){
    /* recibe un JSON donde el primer dict contiene la cabecera */
    var $table = document.getElementById($tbl);
    /* inicializar tabla */
    $table.deleteTHead();
    while ($table.hasChildNodes()) {  
        $table.removeChild($table.firstChild);
    }
    /* crear cabecera de columnas de tabla */
    var $header = $table.createTHead();
    var $row = $header.insertRow(0);
    $nCell = 0;
    for (var $key in $json){
        var $cell = $row.insertCell($nCell);
        $cell.innerHTML = "<b>"+$json[$key][2]+"</b>";
        $nCell++;
    }
    var $tbody = document.createElement('tbody');
    /* recorre el array referenciado con la variable global '$array' */
    for (var $i1 = 0; $i1 < $array.length; $i1++){
        /* comprobar si es un objeto json */
        if (Object.prototype.toString.call($array[$i1])=="[object Object]"){
            /* seleccionar cada json que compone el array referenciado por la variable global '$array' */
            var $obj = $array[$i1];
            var $tr = document.createElement('tr');
            for(var $key in $json){                    
                /* buscar id de json seleccionado necesarios para el formulario en linea de tabla */
                for(var $i2 in $obj){
                    if ($key == $i2){
                        var $td = document.createElement('td');
                        switch ($json[$key][0]) {
                        case 'input':
                            switch ($json[$key][1]) {
                            case 'text':
                            case 'email':
                            case 'tel':
                            case 'hidden':
                            case 'password':
                            case 'button':
                            case 'reset':
                            case 'submit':
                            case 'number':
                                var $input = document.createElement('input');
                                $input.type = $json[$key][1];
                                $input.id = $key;
                                $input.value = $obj[$i2];
                                $input.className = "form-control"; 
                                $td.appendChild($input);
                                break;
                            case 'checkbox':
                            case 'radio':
                                /*if (form.elements[i].checked) {
                                    q.push( '"' + form.elements[i].name + '":"' + form.elements[i].value + '"' );
                                }  */                     
                                break;
                            case 'file':
                                break;
                            }
                            break;           
                        case 'textarea':
                            break;
                        case 'select':
                            var $select = document.createElement('select');
                            $select.id = $key;
                            $select.className = "form-control";
                            /* no se cargara ningun select de forma automatica */
                            $selectBox = null;
                            /* solicitud de datos sincrona */
                            var xhr_values = Object.create({'Data':$json[$key][4]+"="+$obj[$i2],'Url':$json[$key][3],'Return':load_sync_option,'Type':false,'Content_Type':'text/plain','Accept':'application/json','Message':null});
                            /*getData($json[$key][4]+"="+$obj[$i2],$json[$key][3],load_sync_option,null,false);*/
                            getData(xhr_values);
                            for(var $i = 0, $l = $options.length; $i < $l; $i++){
                                var $o = $options[$i];
                                var $opt = document.createElement('option');
                                $opt.value =  $o.value;
                                $opt.text = $o.text;
                                if ($obj[$i2]==$o.value){
                                    $opt.setAttribute("selected", "selected");
                                }
                                $select.appendChild($opt);
                                $td.appendChild($select);
                            }
                            break;
                        }                                
                        $tr.appendChild($td);
                    }
                }
            }
        }
        $tbody.appendChild($tr);
    }
    $table.appendChild($tbody);
}
/* Serializar elementos de un formulario como string URL */
function _serialize(form) {
	if (!form || form.nodeName !== "FORM") {
		return;
	}
	var i, j, q = [];
	for (i = form.elements.length - 1; i >= 0; i = i - 1) {
		if (form.elements[i].name === "") {
			continue;
		}
		switch (form.elements[i].nodeName) {
		case 'INPUT':
			switch (form.elements[i].type) {
			case 'text':
			case 'email':
			case 'tel':
			case 'hidden':
			case 'password':
			case 'button':
			case 'reset':
			case 'submit':
			case 'number':
				q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				break;
			case 'checkbox':
			case 'radio':
				if (form.elements[i].checked) {
					q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				}						
				break;
			case 'file':
				break;
			}
			break;			 
		case 'TEXTAREA':
			q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
			break;
		case 'SELECT':
			switch (form.elements[i].type) {
			case 'select-one':
				q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				break;
			case 'select-multiple':
				for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
					if (form.elements[i].options[j].selected) {
						q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
					}
				}
				break;
			}
			break;
		case 'BUTTON':
			switch (form.elements[i].type) {
			case 'reset':
			case 'submit':
			case 'button':
				q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				break;
			}
			break;
		}
	}
	return q.join('&');
}
/* Serializar elementos de un formulario como JSON */
function _serialJSON(form) {
	if (!form || form.nodeName !== "FORM") {
		return;
	}
	var i, j, q=[], s=[];
	for (i = form.elements.length - 1; i >= 0; i = i - 1) {
		if (form.elements[i].name === "") {
			continue;
		}
		switch (form.elements[i].nodeName) {
		case 'INPUT':
			switch (form.elements[i].type) {
			case 'text':
			case 'email':
			case 'tel':
			case 'hidden':
			case 'password':
			case 'button':
			case 'reset':
			case 'submit':
			case 'number':
				q.push( '"' + form.elements[i].name + '":"' + form.elements[i].value + '"' );
				break;
			case 'checkbox':
			case 'radio':
				if (form.elements[i].checked) {
					q.push( '"' + form.elements[i].name + '":"' + form.elements[i].value + '"' );
				}						
				break;
			case 'file':
				break;
			}
			break;			 
		case 'TEXTAREA':
			q.push( '"' + form.elements[i].name + '":"' + form.elements[i].value + '"' );
			break;
		case 'SELECT':
			switch (form.elements[i].type) {
			case 'select-one':
				q.push( '"' + form.elements[i].name + '":"' + form.elements[i].value + '"' );
				break;
			case 'select-multiple':
                        s = [];
				for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
					if (form.elements[i].options[j].selected) {
                                    s.push('"'+ form.elements[i].options[j].value + '"');
                              }
				q.push( '"' + form.elements[i].name + '":[' + s.join(',') + ']'  );
				}
				break;
			}
			break;
		case 'BUTTON':
			switch (form.elements[i].type) {
			case 'reset':
			case 'submit':
			case 'button':
				q.push( '"' + form.elements[i].name + '":"' + form.elements[i].value + '"' );
				break;
			}
			break;
		}
	}
    /* devuelve convertido en un objeto json javascript */
	/*return '{'+q.join(',')+'}'; */
	return JSON.stringify(JSON.parse('{'+q.join(',')+'}'));
}
/* Serializar una tabla */
function _serialTableJSON(table){
    var oTable = document.getElementById(table);
    var rowLength = oTable.rows.length;
    var f = [];
    var q = [];
    for (i = 0; i < rowLength; i++){
        var oCells = oTable.rows.item(i).cells;
        var cellLength = oCells.length;
        for(var j = 0; j < cellLength; j++){
            var input = oCells[j].firstElementChild || oCells[j].firstChild;
            if (input.id === undefined || input.type === undefined || input.type == "[object Object]") {
                        continue;
            } else {
                switch (input.nodeName) {
                case 'INPUT':
                    switch (input.type) {
                    case 'text':
                    case 'email':
                    case 'tel':
                    case 'hidden':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                    case 'number':
                        q.push( '"' + input.id + '":"' + input.value + '"' );
                        break;
                    case 'checkbox':
                    case 'radio':
                        if (input.checked) {
                            q.push( '"' + input.id + '":"' + input.value + '"' );
                        }                       
                        break;
                    case 'file':
                        break;
                    }
                    break;           
                case 'TEXTAREA':
                    q.push( '"' + input.id + '":"' + input.value + '"' );
                    break;
                case 'SELECT':
                    switch (input.type) {
                    case 'select-one':
                        q.push( '"' + input.id + '":"' + input.value + '"' );
                        break;
                    case 'select-multiple':
                                s = [];
                        for (j = input.options.length - 1; j >= 0; j = j - 1) {
                            if (input.options[j].selected) {
                                            s.push('"'+ input.options[j].value + '"');
                                      }
                        q.push( '"' + input.id + '":[' + s.join(',') + ']'  );
                        }
                        break;
                    }
                    break;
                case 'BUTTON':
                    switch (input.type) {
                    case 'reset':
                    case 'submit':
                    case 'button':
                        q.push( '"' + input.id + '":"' + input.value + '"' );
                        break;
                    }
                    break;
                }
            }
        } 
        /* devuelve convertido en un objeto json javascript */
        if (q.length>0){
            f.push('{'+q.join(',')+'}');
        }
    } 
    return JSON.stringify(JSON.parse('['+f.join(',')+']'));
}
/* Traducir elementos serializados como string URL e insertarlos en valores */
function _unserialize(mixed_var){
	if (!mixed_var || mixed_var !== null) {
		var array = mixed_var.split("&");
		for (var i in array) {
			var j = array[i].split('=');
			var name_element = document.getElementById(j[0]);
			if (j[1] !== null && name_element !== null ) {
				name_element.value = j[1];
			}
		}
	}
}
/* Traducir elementos serializados como JSON e insertarlos en valores */
function _unserialJSON(mixed_var){
      console.log('get '+mixed_var);
	if ((!mixed_var || mixed_var !== null) && mixed_var !== "None") {
		new_obj = JSON.parse(mixed_var);
 		for (var item in new_obj) {
                  var name_element = document.getElementById(item);
                  if (new_obj[item] !== null && name_element !==null) {
				name_element.value = new_obj[item]
			}
		}
 	}
}
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
/* Pausar la ejecucion una cantidad de milisegundos */
function pause(milisec){
	var d = new Date();
	var begin = d.getTime();
	while ((d.getTime() - begin ) > milisec){
        /* Esperar sin hacer nada */
        console.log(d.getTime()-begin);
	}
} 
function sleep(ms)
  {
    var dt = new Date();
    dt.setTime(dt.getTime() + ms);
    while (new Date().getTime() < dt.getTime());
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

/* Asociar eventos a elementos y ejecutar una funcion */
function addEvent(elementoID,nomevento,funcion,captura) {
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
  var $e = document.getElementById(elementoID);
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

/* funcion para sustituir a document.ready de JQuery */
// Como implementarla
//pass a function reference
//	docReady(fn);
//
//use an anonymous function
//	docReady(function() {
//    	   code here
//	});
//
//pass a function reference and a context
//the context will be passed to the function as the first argument
//	docReady(fn, context);
//
//use an anonymous function with a context
//	docReady(function(context) {
//        code here that can use the context argument that was passed to docReady
//	}, ctx);
//

(function(funcName, baseObj) {
    // The public function name defaults to window.docReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    
    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }
    
    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }
    
    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);

// UTILIDADES VARIAS **********************************************************************************************

/* Poner fecha y hora en HTML
   para utilizar esta funcion debe insertar un codigo igual al siguiente en HTML
   <SCRIPT LANGUAGE="JavaScript">
   document.write(customDateString(new Date()))
    </SCRIPT>
*/
dayNames_es = new Array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado")
dayNames_fr = new Array("dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi")
dayNames_pt = new Array("Domingo","Segunda-feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sabado")
dayNames_en = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
monthNames_es = new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
monthNames_fr = new Array("janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre");
monthNames_pt = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");
monthNames_en = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
function customDateString(oneDate) {
    var ln = (window.navigator.language||navigator.browserLanguage).substring(0,2);
    ln = 'fr'
    if(ln == 'en'){ 
       var theDay = dayNames_en[oneDate.getDay() ];
       var theMonth = monthNames_en[oneDate.getMonth() ];
    }else if(ln == 'es'){
       var theDay = dayNames_es[oneDate.getDay() ];
       var theMonth = monthNames_es[oneDate.getMonth() ];
    }else if(ln == 'fr'){
       var theDay = dayNames_fr[oneDate.getDay() ];
       var theMonth = monthNames_fr[oneDate.getMonth() ];
    }else if(ln == 'pt'){
       var theDay = dayNames_pt[oneDate.getDay() ];
       var theMonth = monthNames_pt[oneDate.getMonth() ];
    } else {
       var theDay = dayNames_es[oneDate.getDay() ];
       var theMonth = monthNames_es[oneDate.getMonth() ];
    }
    var theYear = oneDate.getYear()
    theYear += (theYear < 1000) ? 1900 : 0
    if(ln == 'en'){ 
       return theDay + ", " + theMonth + oneDate.getDate() + "th, "+ theYear
    }else if(ln == 'es' || ln == 'pt' || ln == 'de'){
       return theDay + ", " + oneDate.getDate() + " de "+ theMonth + " de " + theYear
    }else if(ln == 'fr' ){
       return theDay + ", le " + oneDate.getDate() + " "+ theMonth + " " + theYear
    } else {
       return theDay + ", " + oneDate.getDate() + " de "+ theMonth + " de " + theYear
    }
    
}

/* Poner fecha y hora local en formato serial
   para utilizar esta funcion debe insertar un codigo igual al siguiente en HTML
   <SCRIPT LANGUAGE="JavaScript">
   document.write(customDateSerial()
    </SCRIPT>
*/
function customDateSerial() {
   var $dat = new Date();
   var $y = dat.getFullYear();
   var $m = "0" + ($dat.getMonth()+1);
   var $d = "0" + $dat.getDate();
   var $h = "0" + $dat.getHours();
   var $mm = "0" + $dat.getMinutes();
   var $s = "0" + $dat.getSeconds();
   var $ds = $y + $m.substr(-2) + $d.substr(-2) + $h.substr(-2) + $mm.substr(-2) + $s.substr(-2);
   return $ds;
}

/* Poner fecha y hora UTC en formato serial
   para utilizar esta funcion debe insertar un codigo igual al siguiente en HTML
   <SCRIPT LANGUAGE="JavaScript">
   document.write(customDateUTCSerial()
    </SCRIPT>
*/
function customDateUTCSerial() {
   var $dat = new Date();
   var $y = $dat.getUTCFullYear();
   var $m = "0" + ($dat.getUTCMonth()+1);
   var $d = "0" + $dat.getUTCDate();
   var $h = "0" + $dat.getUTCHours();
   var $mm = "0" + $dat.getUTCMinutes();
   var $s = "0" + $dat.getUTCSeconds();
   var $ds = $y + $m.substr(-2) + $d.substr(-2) + $h.substr(-2) + $mm.substr(-2) + $s.substr(-2);
   return $ds;
}

// generic positive number decimal formatting function
/* Poner formato a importes de monedas
   para utilizar esta funcion debe insertar un codigo igual al siguiente en HTML
   <SCRIPT LANGUAGE="JavaScript">
   document.write(customDateUTCSerial()
    </SCRIPT>
*/
function format (expr, decplaces) {
    var $str = "" + Math.round (eval(expr) * Math.pow(10,decplaces))
    while ($str.length <= decplaces) {
        $str = "0" + $str
    }
    var $decpoint = $str.length - decplaces
    return $str.substring(0,$decpoint) + "." + $str.substring($decpoint,$str.length);
}

function eurize (expr) {
    return format(expr,2) + " €"
}

function dollarize (expr) {
    return format(expr,2) + " $"
}

// FUNCIONES LECTURA DOM **********************************************************************************************

/* Lectura de valores de META por NAME
   obtener el valor content de las etiquetas meta a partir del name :
   getMetaContentByName("authenticity-token")
*/

function getMetaContentByName(name){
    var $x = document.getElementsByTagName("META");
    var $i;
    for ($i = 0; $i < $x.length; $i++) {
        if ($x[$i].name==name)
        {
            return $x[$i].content;
        }
        
    }
}

// FUNCIONES BASE64 encode/decode *************************************************************************************

/* var cadena = Base64.encode('w00t');
   var cadena = Base64.decode('dzAwdA==');
   var cadena = Base64._utf8_encode('w00t');
   var cadena = Base64._utf8_decode('dzAwdA==');
*/
var Base64 = {
	// private property
	$keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	// public method for encoding
	encode : function (string) {
		var $output = "";
		var $chr1, $chr2, $chr3, $enc1, $enc2, $enc3, $enc4;
		var $i = 0;
		$str = Base64._utf8_encode(string);
		while ($i < $str.length) {

			$chr1 = $str.charCodeAt($i++);
			$chr2 = $str.charCodeAt($i++);
			$chr3 = $str.charCodeAt($i++);

			$enc1 = $chr1 >> 2;
			$enc2 = (($chr1 & 3) << 4) | ($chr2 >> 4);
			$enc3 = (($chr2 & 15) << 2) | ($chr3 >> 6);
			$enc4 = $chr3 & 63;

			if (isNaN($chr2)) {
				$enc3 = $enc4 = 64;
			} else if (isNaN($chr3)) {
				$enc4 = 64;
			}

			$output = $output +
			this.$keyStr.charAt($enc1) + this.$keyStr.charAt($enc2) +
			this.$keyStr.charAt($enc3) + this.$keyStr.charAt($enc4);

		}

		return $output;
	},

	// public method for decoding
	decode : function (string) {
		var $output = "";
		var $chr1, $chr2, $chr3;
		var $enc1, $enc2, $enc3, $enc4;
		var $i = 0;

		$str = string.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while ($i < $str.length) {

			$enc1 = this.$keyStr.indexOf($str.charAt($i++));
			$enc2 = this.$keyStr.indexOf($str.charAt($i++));
			$enc3 = this.$keyStr.indexOf($str.charAt($i++));
			$enc4 = this.$keyStr.indexOf($str.charAt($i++));

			$chr1 = ($enc1 << 2) | ($enc2 >> 4);
			$chr2 = (($enc2 & 15) << 4) | ($enc3 >> 2);
			$chr3 = (($enc3 & 3) << 6) | $enc4;

			$output = $output + String.fromCharCode($chr1);

			if ($enc3 != 64) {
				$output = $output + String.fromCharCode($chr2);
			}
			if ($enc4 != 64) {
				$output = $output + String.fromCharCode($chr3);
			}

		}

		$output = Base64._utf8_decode($output);

		return $output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		var $str = string.replace(/\r\n/g,"\n");
		var $utftext = "";

		for (var $n = 0; $n < $str.length; $n++) {

			var $c = $str.charCodeAt($n);

			if ($c < 128) {
				$utftext += String.fromCharCode($c);
			}
			else if(($c > 127) && ($c < 2048)) {
				$utftext += String.fromCharCode(($c >> 6) | 192);
				$utftext += String.fromCharCode(($c & 63) | 128);
			}
			else {
				$utftext += String.fromCharCode(($c >> 12) | 224);
				$utftext += String.fromCharCode((($c >> 6) & 63) | 128);
				$utftext += String.fromCharCode(($c & 63) | 128);
			}

		}

		return $utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var $str = "";
		var $i = 0;
		var $c = $c1 = $c2 = 0;

		while ( $i < utftext.length ) {

			$c = utftext.charCodeAt($i);

			if ($c < 128) {
				$str += String.fromCharCode($c);
				$i++;
			}
			else if(($c > 191) && ($c < 224)) {
				$c2 = utftext.charCodeAt($i+1);
				$str += String.fromCharCode((($c & 31) << 6) | ($c2 & 63));
				$i += 2;
			}
			else {
				$c2 = utftext.charCodeAt($i+1);
				$c3 = utftext.charCodeAt($i+2);
				$str += String.fromCharCode((($c & 15) << 12) | (($c2 & 63) << 6) | ($c3 & 63));
				$i += 3;
			}

		}

		return $str;
	}

}