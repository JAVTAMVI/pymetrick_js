/* funcion para crear forms o forms IN TABLE desde JSON  */
//  jForm = {'id':'','name': '', 'action':'/action_page', 'method':"get" , 'target':'_blank', 'accept-charset':'UTF-8', 'enctype':'application/x-www-form-urlencoded','autocomplete':'off','novalidate':'',
//           'elements': [ {'label':'','type':'','id':'','name':'','value':'', 'class':'', 'style':'',...}, ...]    // type : text, number, date, hidden, file, password, email, submit, reset, radio, checkbox, button, url, tel, range, search
//                                                                                  // attributes : disabled, max, maxlength, min, pattern, readonly, required, size, step, value
//                                                                                  // events ...
//                         {'legend':'','type':'fieldset',...},
//                         ]
//            'table'  : [ {'table_name': [{'head_title':'','type':'','id':'','name':'','value':'', 'class':'', 'style':'',...},   // crear form en tablas
//                       ]
//          }
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

var jPattern = {'email':'/^[w-.+]+@[a-zA-Z0-9.]+.[a-zA-Z0-9]{2,4}$/',
               'url':'(http|https)://.+',
               'password':'/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/',
               'time24hhmmss': '^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$',
               'time24hhmm': '^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$',
               'time12hhmmss': '^(1[0-2]|0?[1-9]):([0-5]?[0-9]):([0-5]?[0-9])$',
               'time12hhmm': '^(1[0-2]|0?[1-9]):([0-5]?[0-9])$',
               'percentage': '^(100|[1-9]?[0-9])$',
               'number': '/^[0-9]+$/'
           }

class Schema {
	  constructor(id,_jsForm) {
	  	  this.jsForm = _jsForm;
	  	  this.$_id = id;
	  	  this.$_form = document.createElement('FORM');
	  	  this.$_tag = [];
	      /* comprobar form */
	      if(!(typeof this.jsForm["id"] == "undefined") || !(typeof this.jsForm["name"] == "undefined")){
	          for (var $j in this.jsForm){
	          	  if (!(Object.prototype.toString.call( this.jsForm[$j] ) === "[object Object]") && !(Object.prototype.toString.call( this.jsForm[$j] ) === "[object Array]")){
		          	  /* seleccionar datos form */
		          	  switch ($j){
		          	  	  case 'id':
		          	  	      this.$_form.setAttribute("id",this.jsForm[$j]);
		          	  	      this.$_form.setAttribute("name",this.jsForm[$j]);
		          	  	      break;
		          	  	  case 'name':
		          	  	      this.$_form.setAttribute("id",this.jsForm[$j]);
		          	  	      this.$_form.setAttribute("name",this.jsForm[$j]);
		          	  	      break;
		          	  	  case 'action':
		          	  	      this.$_form.setAttribute("action",this.jsForm[$j]);
		          	  	      break;
		          	  	  case 'method':
		          	  	      this.$_form.setAttribute("method",this.jsForm[$j]);
		          	  	      break;
		          	  	  case 'target':
		          	  	      this.$_form.setAttribute("target",this.jsForm[$j]);
		          	  	      break;
		          	  	  case 'enctype':
		          	  	      this.$_form.setAttribute("enctype",this.jsForm[$j]);
		          	  	      break;
		          	  	  case 'accept-charset':
		          	  	      this.$_form.setAttribute("accept-charset",this.jsForm[$j]);
		          	  	      break;
		          	  	  case 'autocomplete':
		          	  	     this.$_form.setAttribute("autocomplete",this.jsForm[$j]);
		          	  	      break;
		          	  	  case 'novalidate':
		          	  	      this.$_form.setAttribute("novalidate",this.jsForm[$j]);
		          	  	      break;
		          	  	  default:
		          	  	      break;
		          	  }
		          }
	          }
	      }
	      /* obtener solo elementos */
	      for (var $j in this.jsForm){
	      	  /* comprobar elementos de objeto form */
	      	  if ($j=="form_elements" && Object.prototype.toString.call( this.jsForm[$j] ) === "[object Array]"){
	      	  	  for (var $e=0; $e<this.jsForm[$j].length; $e++){
	      	  	  	  /* seleccionar elementos */
	      	  	  	  switch (this.jsForm[$j][$e]["type"]){
	      	  	  	  	  case "text":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "number":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "date":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "hidden":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "file":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "password":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "email":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "submit":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "reset":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "radio":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "checkbox":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "button":
	      	  	  	  	      this.addButton(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "url":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "tel":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "range":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "search":
	      	  	  	  	      this.addInput(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "select":
	      	  	  	  	      this.addSelect(this.jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  default:
	      	  	  	  	      // tag posibles DIV, FIELDSET
                              if(!(typeof this.jsForm[$j][$e]["tag"] == "undefined") || !(typeof this.jsForm[$j][$e]["endtag"] == "undefined")){
                              	  this.setTag(this.jsForm[$j][$e]);
                              }
                              // tag posibles DIV, FIELDSET
                              if(!(typeof this.jsForm[$j][$e]["head"] == "undefined")){
                                  this.setHead(this.jsForm[$j][$e]);
                              }
	      	  	  	  }
	      	  	  }
	      	  }
	      }
	      /* comprobar si existen tag en stack */
  	  	  while (this.$_tag.length>1) {
  	  	  	  // existe mas de un tag
  	  	  	  var $next_tag = this.$_tag.pop();
  	  	  	  var $prev_tag = this.$_tag.pop();
  	  	  	  $prev_tag.appendChild($next_tag);
  	  	  	  this.$_tag.push($prev_tag);
  	  	  } 
  	  	  if (this.$_tag.length>0){
  	  	      this.$_form.appendChild(this.$_tag.pop());
  	  	  }

	      this.$_id.appendChild(this.$_form);
	  }
      // add Input
	  addInput($m) {
	  	  /* tratamiento de label */
	  	  if(!(typeof $m["label"] == "undefined")){
	  	      var $_label = document.createElement("LABEL");
	          $_label.innerHTML = ($m["label"]);
	  	      $_label.setAttribute("for",$m["id"]);
	  	      if (!(typeof $m["label_style"] == "undefined")){
                  $_label.setAttribute('style',$m["label_style"]); 
	  	      }
	  	      if (!(typeof $m["label_class"] == "undefined")){
                   $_label.setAttribute('class',$m["label_class"]);
	  	      }
	  	      /* asociar a un subnodo o form */
	  	      if (this.$_tag.length>0){
	  	      	  this.$_tag[this.$_tag.length-1].appendChild($_label);
	  	      } else {
	  	          this.$_form.appendChild($_label);
	  	      }    
	  	  }
	  	  /* tratamiento de input */
	  	  var $_input = document.createElement("INPUT");
	  	  for (var $n in $m){
	  	  	  switch ($n){
	  	  	  	  case 'type':
	      	  	  	  $_input.setAttribute('type',$m['type']);
	      	  	  	  break;
	  	  	  	  case 'id':
	      	  	  	  $_input.setAttribute('id',$m['id']);
	      	  	  	  if (!($m['type'].toLowerCase()=='radio')){
	      	  	  	      $_input.setAttribute('name',$m['id']);
	      	  	  	  }
	      	  	  	  break;
	  	  	  	  case 'name':
	      	  	  	  $_input.setAttribute('name',$m['name']);
	      	  	  	  if (!($m['type'].toLowerCase()=='radio')){
	      	  	  	      $_input.setAttribute('id',$m['name']);
	      	  	  	  }
	      	  	  	  break;
	  	  	  	  case 'disabled':
	      	  	  	  $_input.setAttribute('disabled',$m['disabled']);
	      	  	  	  break;
	      	  	  case 'checked':
	      	  	  	  $_input.setAttribute('checked',$m['checked']);
	      	  	  	  break;
	      	  	  case 'selected':
	      	  	  	  $_input.setAttribute('selected',$m['selected']);
	      	  	  	  break;
	  	  	  	  case 'readonly':
	      	  	  	  $_input.setAttribute('readonly',$m['readonly']);
	      	  	  	  break;
	  	  	  	  case 'required':
	      	  	  	  $_input.setAttribute('required',$m['required']);
	      	  	  	  break;
	  	  	  	  case 'autofocus':
	      	  	  	  $_input.setAttribute('autofocus',$m['autofocus']);
	      	  	  	  break;
	  	  	  	  case 'value':
	      	  	  	  $_input.setAttribute('value',$m['value']);
	      	  	  	  break;
	  	  	  	  case 'size':
	      	  	  	  $_input.setAttribute('size',$m['size']);
	      	  	  	  break;
	  	  	  	  case 'max':
	      	  	  	  $_input.setAttribute('max',$m['max']);
	      	  	  	  break;
				  case 'multiple':
	      	  	  	  $_input.setAttribute('multiple',$m['multiple']);
	      	  	  	  break;
	  	  	  	  case 'min':
	      	  	  	  $_input.setAttribute('min',$m['min']);
	      	  	  	  break;
	  	  	  	  case 'maxlength':
	      	  	  	  $_input.setAttribute('maxlength',$m['maxlength']);
	      	  	  	  break;
	  	  	  	  case 'step':
	      	  	  	  $_input.setAttribute('step',$m['step']);
	      	  	  	  break;
	  	  	  	  case 'pattern':
	      	  	  	  $_input.setAttribute('pattern',$m['pattern']);
	      	  	  	  break;
	  	  	  	  case 'onblur':
	      	  	  	  $_input.setAttribute('onblur',$m['onblur']);
	      	  	  	  break;
	  	  	  	  case 'onsearch':
	      	  	  	  $_input.setAttribute('onsearch',$m['onsearch']);
	      	  	  	  break;
	  	  	  	  case 'onchange':
	      	  	  	  $_input.setAttribute('onchange',$m['onchange']);
	      	  	  	  break;
	  	  	  	  case 'onclick':
	      	  	  	  $_input.setAttribute('onclick',$m['onclick']);
	      	  	  	  break;
	  	  	  	  case 'ondblclick':
	      	  	  	  $_input.setAttribute('ondblclick',$m['ondblclick']);
	      	  	  	  break;
	  	  	  	  case 'onfocus':
	      	  	  	  $_input.setAttribute('onfocus',$m['onfocus']);
	      	  	  	  break;
	  	  	  	  case 'onkeydown':
	      	  	  	  $_input.setAttribute('onkeydown',$m['onkeydown']);
	      	  	  	  break;
	  	  	  	  case 'onkeypress':
	      	  	  	  $_input.setAttribute('onkeypress',$m['onkeypress']);
	      	  	  	  break;
	  	  	  	  case 'onkeyup':
	      	  	  	  $_input.setAttribute('onkeyup',$m['onkeyup']);
	      	  	  	  break;
	  	  	  	  case 'onload':
	      	  	  	  $_input.setAttribute('onload',$m['onload']);
	      	  	  	  break;
	  	  	  	  case 'onmousedown':
	      	  	  	  $_input.setAttribute('onmousedown',$m['onmousedown']);
	      	  	  	  break;
	  	  	  	  case 'onmousemove':
	      	  	  	  $_input.setAttribute('onmousemove',$m['onmousemove']);
	      	  	  	  break;
	  	  	  	  case 'onmouseout':
	      	  	  	  $_input.setAttribute('onmouseout',$m['onmouseout']);
	      	  	  	  break;
	  	  	  	  case 'onmouseover':
	      	  	  	  $_input.setAttribute('onmouseover',$m['onmouseover']);
	      	  	  	  break;
	  	  	  	  case 'onmouseup':
	      	  	  	  $_input.setAttribute('onmouseup',$m['onmouseup']);
	      	  	  	  break;
	  	  	  	  case 'class':
	      	  	  	  $_input.setAttribute('class',$m['class']);
	      	  	  	  break;
	   	  	  	  case 'style':
	      	  	  	  $_input.setAttribute('style',$m['style']);
	      	  	  	  break;
	   	  	  	  case 'placeholder':
	      	  	  	  $_input.setAttribute('placeholder',$m['placeholder']);
	      	  	  	  break;
	      	  	  default:
	      	  	  	  break;
	  	  	  }
	  	  }
	  	  /* asociar a un subnodo o form */
  	  	  if (this.$_tag.length>0){
  	      	  this.$_tag[this.$_tag.length-1].appendChild($_input);
  	      } else {
  	          this.$_form.appendChild($_input);
  	      }
  	      /* tratamiento de label_post */
	  	  if(!(typeof $m["label_post"] == "undefined")){
	  	      var $_label = document.createElement("LABEL");
	          $_label.innerHTML = ($m["label_post"]);
	  	      $_label.setAttribute("for",$m["id"]);
	  	      if (!(typeof $m["label_style"] == "undefined")){
                  $_label.setAttribute('style',$m["label_style"]); 
	  	      }
	  	      if (!(typeof $m["label_class"] == "undefined")){
                   $_label.setAttribute('class',$m["label_class"]);
	  	      }
	  	      /* asociar a un subnodo o form */
	  	      if (this.$_tag.length>0){
	  	      	  this.$_tag[this.$_tag.length-1].appendChild($_label);
	  	      } else {
	  	          this.$_form.appendChild($_label);
	  	      }    
	  	  } 
	  }
	  // add button 
	  addButton($m) {
	  	  var $_button = document.createElement("BUTTON");
	  	  for (var $n in $m){
	  	  	  switch ($n){
	  	  	  	  case 'id':
	      	  	  	  $_button.setAttribute('id',$m['id']);
	      	  	  	  $_button.setAttribute('name',$m['id']);
	      	  	  	  break;
	  	  	  	  case 'name':
	      	  	  	  $_button.setAttribute('id',$m['name']);
	      	  	  	  $_button.setAttribute('name',$m['name']);
	      	  	  	  break;
	  	  	  	  case 'disabled':
	      	  	  	  $_button.setAttribute('disabled',$m['disabled']);
	      	  	  	  break;
	  	  	  	  case 'value':
	  	  	  	      $_button.appendChild(document.createTextNode($m['value']));
	      	  	  	  break;
	  	  	  	  case 'href':
	      	  	  	  $_button.setAttribute('href',$m['href']);
	      	  	  	  break;
	  	  	  	  case 'onclick':
	      	  	  	  $_button.setAttribute('onclick',$m['onclick']);
	      	  	  	  break;
	  	  	  	  case 'ondblclick':
	      	  	  	  $_button.setAttribute('ondblclick',$m['ondblclick']);
	      	  	  	  break;
	  	  	  	  case 'onfocus':
	      	  	  	  $_button.setAttribute('onfocus',$m['onfocus']);
	      	  	  	  break;
	  	  	  	  case 'onkeydown':
	      	  	  	  $_button.setAttribute('onkeydown',$m['onkeydown']);
	      	  	  	  break;
	  	  	  	  case 'onkeypress':
	      	  	  	  $_button.setAttribute('onkeypress',$m['onkeypress']);
	      	  	  	  break;
	  	  	  	  case 'onkeyup':
	      	  	  	  $_button.setAttribute('onkeyup',$m['onkeyup']);
	      	  	  	  break;
	  	  	  	  case 'onload':
	      	  	  	  $_button.setAttribute('onload',$m['onload']);
	      	  	  	  break;
	  	  	  	  case 'onmousedown':
	      	  	  	  $_button.setAttribute('onmousedown',$m['onmousedown']);
	      	  	  	  break;
	  	  	  	  case 'onmousemove':
	      	  	  	  $_button.setAttribute('onmousemove',$m['onmousemove']);
	      	  	  	  break;
	  	  	  	  case 'onmouseout':
	      	  	  	  $_button.setAttribute('onmouseout',$m['onmouseout']);
	      	  	  	  break;
	  	  	  	  case 'onmouseover':
	      	  	  	  $_button.setAttribute('onmouseover',$m['onmouseover']);
	      	  	  	  break;
	  	  	  	  case 'onmouseup':
	      	  	  	  $_button.setAttribute('onmouseup',$m['onmouseup']);
	      	  	  	  break;
	  	  	  	  case 'class':
	      	  	  	  $_button.setAttribute('class',$m['class']);
	      	  	  	  break;
	   	  	  	  case 'style':
	      	  	  	  $_button.setAttribute('style',$m['style']);
	      	  	  	  break;
	      	  	  default:
	      	  	  	  break;
	  	  	  }
	  	  }
	  	  /* asociar a un subnodo o form */
	  	  if (this.$_tag.length>0){
  	      	  this.$_tag[this.$_tag.length-1].appendChild($_button);
  	      } else {
  	          this.$_form.appendChild($_button);
  	      } 
	  }
	  /* asociar SELECT a un subnodo o form */ 
	  addSelect($m) {
	  	  /*
	  	  <select name="select">
			<option value="value1">Value 1</option> 
			<option value="value2" selected>Value 2</option>
			<option value="value3">Value 3</option>
		  </select>
          */
	  	  if(!(typeof $m["label"] == "undefined")){
	  	      var $_label = document.createElement("LABEL");
	          $_label.innerHTML = ($m["label"]);
	  	      $_label.setAttribute("for",$m["id"]);
	  	      if (!(typeof $m["label_style"] == "undefined")){
                  $_label.setAttribute('style',$m["label_style"]); 
	  	      }
	  	      if (!(typeof $m["label_class"] == "undefined")){
                   $_label.setAttribute('class',$m["label_class"]);
	  	      }
	  	      if (this.$_tag.length>0){
	  	      	  this.$_tag[this.$_tag.length-1].appendChild($_label);
	  	      } else {
	  	          this.$_form.appendChild($_label);
	  	      } 
	  	  }
	  	  var $_select = document.createElement("SELECT");
	  	  for (var $n in $m){
	  	  	  switch ($n){
	  	  	  	  case 'id':
	      	  	  	  $_select.setAttribute('id',$m['id']);
	      	  	  	  $_select.setAttribute('name',$m['id']);
	      	  	  	  break;
	  	  	  	  case 'name':
	      	  	  	  $_select.setAttribute('id',$m['name']);
	      	  	  	  $_select.setAttribute('name',$m['name']);
	      	  	  	  break;
	  	  	  	  case 'disabled':
	      	  	  	  $_select.setAttribute('disabled',$m['disabled']);
	      	  	  	  break;
	  	  	  	  case 'blur':
	      	  	  	  $_select.setAttribute('blur',$m['blur']);
	      	  	  	  break;
	  	  	  	  case 'onfocus':
	      	  	  	  $_select.setAttribute('onfocus',$m['onfocus']);
	      	  	  	  break;
	  	  	  	  case 'class':
	      	  	  	  $_select.setAttribute('class',$m['class']);
	      	  	  	  break;
	   	  	  	  case 'style':
	      	  	  	  $_select.setAttribute('style',$m['style']);
	      	  	  	  break;
	      	  	  default:
		          	  break;
	  	  	  }
	  	  }
	  	  /* asociar a un subnodo o form */
  	      if (this.$_tag.length>0){
  	      	  this.$_tag[this.$_tag.length-1].appendChild($_select);
  	      } else {
  	          this.$_form.appendChild($_select);
  	      } 
	  }
	  /* crear y cerrar nodos (DIV,P,A,FIELDSET,...) */ 
	  setTag($m) {
	  	  // incluye etiquetas en FORM como DIV, P, A, SECTION,...
	  	  if(!(typeof $m["tag"] == "undefined")){
	  	  	  var $tag = document.createElement($m["tag"]);
	          
	          for (var $n in $m){
		  	  	  switch ($n){
		  	  	  	  case 'id':
		      	  	  	  $tag.setAttribute('id',$m['id']);
		      	  	  	  $tag.setAttribute('name',$m['id']);
		      	  	  	  break;
		  	  	  	  case 'name':
		      	  	  	  $tag.setAttribute('id',$m['name']);
		      	  	  	  $tag.setAttribute('name',$m['name']);
		      	  	  	  break;
		      	  	  case 'title':
		      	  	      $tag.innerHTML = ($m["title"]);
		      	  	      break;
		  	  	  	  case 'disabled':
		      	  	  	  $tag.setAttribute('disabled',$m['disabled']);
		      	  	  	  break;
		  	  	  	  case 'class':
		      	  	  	  $tag.setAttribute('class',$m['class']);
		      	  	  	  break;
		   	  	  	  case 'style':
		      	  	  	  $tag.setAttribute('style',$m['style']);
		      	  	  	  break;
		      	  	  default:
			          	  break;
		  	  	  }
		  	  }
		  	  this.$_tag.push($tag);
	  	  }
	  	  /* asociar un subnodo a otro de mayor nivel o a form */
	  	  if(!(typeof $m["endtag"] == "undefined")){
	  	  	  if (this.$_tag.length>0) {
	  	  	  	  if (this.$_tag.length>1) {
	  	  	  	  	  // existe mas de un tag
	  	  	  	  	  var $next_tag = this.$_tag.pop();
	  	  	  	  	  var $prev_tag = this.$_tag.pop();
	  	  	  	  	  $prev_tag.appendChild($next_tag);
	  	  	  	  	  this.$_tag.push($prev_tag);
	  	  	  	  } else {
	  	  	          this.$_form.appendChild(this.$_tag.pop());
	  	  	      }
	  	  	  }    
	  	  }
	  }
	         

	  /* incorporar cabecera de Table */ 
	  setHead($m) {
	  	  var $td = document.createElement("TD");
	  	  var $head = document.createTextNode($m['head']);
	  	  $td.appendChild($head);
	  	  if (this.$_tag.length>0){
	                  var last_tag = this.$_tag.pop();
	                  last_tag.appendChild($td);
	                  this.$_tag.push(last_tag);
	      }
	  }

 
    recorrerObjeto(objeto)
    {
        var respuesta="";
        for (var i in objeto)
        {
            respuesta+=i+": "+objeto[i];
        }
       console.log(respuesta);
    }
}