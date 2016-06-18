
// funcion para crear forms o forms IN TABLE desde JSON  
//  jForm = {'id':'','name': '', 'action':'/action_page', 'method':"get" , 'target':'_blank', 'accept-charset':'UTF-8', 'enctype':'application/x-www-form-urlencoded','autocomplete':'off','novalidate':'',
//           'form_elements': [ {'label':'','type':'','id':'','name':'','value':'', 'class':'', 'style':'',...}, ...]    // type : text, number, date, hidden, file, password, email, submit, reset, radio, checkbox, button, url, tel, range, search
//                                                                                  // attributes : disabled, max, maxlength, min, pattern, readonly, required, size, step, value
//                                                                                  // events ...
//                              {'legend':'','type':'fieldset',...},
//                            ]
//          };
//
//	jForm = {'id':'form_address','name': 'form_address', 'action':'/action_address', 'method':'get' , 'target':'_blank', 'accept-charset':'UTF-8', 'enctype':'application/x-www-form-urlencoded','autocomplete':'off','novalidate':'novalidate','class':'w3-container w3-card-4 w3-light-grey',
//	           'form_elements': [ {'tag':'TABLE','class':'w3-table w3-striped w3-bordered w3-border w3-hoverable w3-card-4'},
//		                         {'tag':'THEAD'},
//		                         {'tag':'TR','class':'w3-blue'},
//		                         {'head':'Direccion', 'field':{'type':'text','id':'address','name':'address','value':'','placeholder':'Nombre'}},
//		                         {'head':'Localidad','field':{'type':'text','id':'city','name':'city','value':'','placeholder':'Ciudad'}},
//		                         {'head':'Codigo Postal','field':{'type':'text','id':'postcode','name':'postcode','value':'','placeholder':'Codigo Postal'}},
//		                         {'head':'Provincia','field':{'type':'text','id':'zone_code','name':'zone_code','value':'','placeholder':'Provincia'}},
//		                         {'head':'Pais','field':{'type':'text','id':'country_iso_code_2','name':'country_iso_code_2','value':'','placeholder':'Pais'}},
//		                         {'endtag':'/TR'},
//		                         {'endtag':'/THEAD'},
//                               {'tag':'TBODY'};
//                               {'endtag':'/TBODY'}
//		                         {'endtag':'/TABLE'}
//	                          ]
//	        };
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

//var jPattern = {'email':'/^[w-.+]+@[a-zA-Z0-9.]+.[a-zA-Z0-9]{2,4}$/',
//               'url':'(http|https)://.+',
//               'password':'/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/',
//               'time24hhmmss': '^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$',
//               'time24hhmm': '^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$',
//               'time12hhmmss': '^(1[0-2]|0?[1-9]):([0-5]?[0-9]):([0-5]?[0-9])$',
//               'time12hhmm': '^(1[0-2]|0?[1-9]):([0-5]?[0-9])$',
//               'percentage': '^(100|[1-9]?[0-9])$',
//               'number': '/^[0-9]+$/'
//           };

class jsonForm {
	  constructor(id,_jsForm,_jsValue) {
	  	  this.$jsForm = _jsForm;
	  	  this.$jsValue = _jsValue;
	  	  this.$_id = id;
	  	  this.$_tag = [];
	  	  this.createForm();

	  }
	  /* crear Form */
	  createForm(){	  
	      /* crear form */
	      if (typeof this.$_form == "undefined"){
	          this.$_form = document.createElement('FORM');
              this.$_tag = [];

		      /* incorporar elementos al form */
		      if(!(typeof this.$jsForm["id"] == "undefined") || !(typeof this.$jsForm["name"] == "undefined")){
		          for (var $j in this.$jsForm){
		          	  if (!(Object.prototype.toString.call( this.$jsForm[$j] ) === "[object Object]") && !(Object.prototype.toString.call( this.$jsForm[$j] ) === "[object Array]")){
			          	  /* seleccionar datos form */
			          	  switch ($j){
			          	  	  case 'id':
			          	  	      this.$_form.setAttribute("id",this.$jsForm[$j]);
			          	  	      this.$_form.setAttribute("name",this.$jsForm[$j]);
			          	  	      break;
			          	  	  case 'name':
			          	  	      this.$_form.setAttribute("id",this.$jsForm[$j]);
			          	  	      this.$_form.setAttribute("name",this.$jsForm[$j]);
			          	  	      break;
			          	  	  default:
			                      try {
			                          this.$_form.setAttribute($j,this.$jsForm[$j]); 
			                      } catch(err) {
			                          console.log(err.message);
			                      }   
			                      break;
			          	  }
			          }
		          }
		      }
	          this.addElement();
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
	  }

	  addElement(){
	      /* incorporar elementos */
	      for (var $j in this.$jsForm){
	      	  /* comprobar elementos de objeto form */
	      	  if ($j=="form_elements" && Object.prototype.toString.call( this.$jsForm[$j] ) === "[object Array]"){
	      	  	  for (var $e=0; $e<this.$jsForm[$j].length; $e++){
	      	  	  	  /* seleccionar elementos */
	      	  	  	  switch (this.$jsForm[$j][$e]["type"]){
	      	  	  	  	  case "text":
	      	  	  	  	  case "number":
	      	  	  	  	  case "date":
	      	  	  	  	  case "hidden":
	      	  	  	  	  case "file":
	      	  	  	  	  case "password":
	      	  	  	  	  case "email":
	      	  	  	  	  case "submit":
	      	  	  	  	  case "reset":
	      	  	  	  	  case "radio":
	      	  	  	  	  case "checkbox":
	      	  	  	  	  case "url":
	      	  	  	  	  case "tel":
	      	  	  	  	  case "range":
	      	  	  	  	  case "search":
	      	  	  	  	      this.addInput(this.$jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "button":
	      	  	  	  	      this.addButton(this.$jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  case "select":
	      	  	  	  	      this.addSelect(this.$jsForm[$j][$e]);
	      	  	  	  	      break;
	      	  	  	  	  default:
	      	  	  	  	      try{
		      	  	  	  	      // tag posibles DIV, FIELDSET
	                              if(!(typeof this.$jsForm[$j][$e]["tag"] == "undefined") || !(typeof this.$jsForm[$j][$e]["endtag"] == "undefined")){
	                              	  this.addTag(this.$jsForm[$j][$e]);
	                              	  if (this.$jsForm[$j][$e]["tag"]=='TBODY'){
	                              	  	  /* incorporar datos en filas de TABLE */
	                              	  	  this.addTableRows();
	                              	  	  break;
	                              	  }
	                              }
	                              // tag posibles DIV, FIELDSET
	                              if(!(typeof this.$jsForm[$j][$e]["head"] == "undefined")){
	                              	  /* incorporar TEXTO de cabecera en TABLE */
	                                  this.addHead(this.$jsForm[$j][$e]);
	                                  break;
	                              } 
                              } catch(err) {
                          		  console.log(err.message);
                      		  }  
	      	  	  	  }
	      	  	  }
	      	  }
	      }
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
	      	  	  default:
                      try {
                          $_input.setAttribute($n,$m[$n]); 
                      } catch(err) {
                          console.log(err.message);
                      }   
                      break;
	  	  	  }
	  	  }
	  	  /* incorporar valor al INPUT */
  	  	  if (!(typeof this.$jsValue == "undefined")){
  	  	  	  if (Object.prototype.toString.call( this.$jsValue ) === "[object Array]"){
	  	  	  	  for (var $h=0;$h<this.$jsValue.length;$h++){
	  	  	  	  	  if (Object.prototype.toString.call( this.$jsValue[$h] ) === "[object Object]"){
		  	  	  	  	  if ($_input['id']==this.$jsValue[$h]['id']){
		  	  	  	  	      for (var $i in this.$jsValue[$h]){
   		  	  	  	  	      	  $_input[$i]=this.$jsValue[$h][$i];
		  	  	  	  	      }	 
		  	  	  	  	  }
		  	  	  	  }
	  	  	  	  }
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
	      	  	  case 'value':
                      $_button.appendChild(document.createTextNode($m['value']));
                      break;
	      	  	  case 'icon':
	      	  	  	  $_button.innerHTML = "<i class='"+$m['icon']+"'></i>";
	      	  	  	  break;
	      	  	  default:
                      try {
                          $_button.setAttribute($n,$m[$n]); 
                      } catch(err) {
                          console.log(err.message);
                      }   
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
          try{
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
		      	  	  case 'options':
	                    /* incorporar opciones de SELECT si desea incluir valores                                                  */
	                    /* 'options' puede contener un array de diccionario o un string                                            */
	                    /* por ejemplo: [{"text":"ES","value":"España"},{"text":"FR","value":"FRANCIA","selected":"selected"}]     */
	                    /*              o "/v1/country"                                                                            */
	                    if (typeof $m[$n] === 'string'){
	                       /* '/v1/country|{"value":"ES"}' y con '/v1/country|{"value":"ES","readonly":"readonly"}'                */
	                       var $_data = '';
	                       var $_url = '';
	                       if ($m[$n].split('|').length>1){
	                          $_url = $m[$n].split('|')[0];
	                          $_data = JSON.stringify(JSON.parse($m[$n].split('|')[1]));
	                       } else {
	                          $_url = $m[$n];
	                       }                                                                               
	                       var $xhr_values = Object.create({'Data':$_data,'Url':$_url,'Return':OnStateChange,'Type':false,'Content_Type':'text/html','Accept':'application/json'});
	                       postData($xhr_values);
	                       $m[$n] = JSON.parse($xhr.responseText);
	                    }
		      	  	      if (Object.prototype.toString.call( $m[$n] ) === "[object Array]"){
		      	  	      	  /* [{'option':'','value':'','selected':'selected'},{...}]  */
		      	  	      	  for (var $h=0;$h<$m[$n].length;$h++){
		      	  	      	  	  if (Object.prototype.toString.call( $m[$n][$h] ) === "[object Object]"){
	                                  var $opt = document.createElement('OPTION');
	                                  if(!(typeof $m[$n][$h]['value'] == 'undefined')){
	                                      $opt.value =  $m[$n][$h]['value'];
	                                  }
	                                  if(!(typeof $m[$n][$h]['text'] == 'undefined')){
	                                      $opt.text = $m[$n][$h]['text'];
	                                  }
	                                  if(!(typeof $m[$n][$h]['selected'] == 'undefined')){
	                                      $opt.setAttribute("selected", "selected");
	                                  }
	                                  $_select.appendChild($opt);
		      	  	      	  	  }
		      	  	      	  }
		      	  	      }
		      	  	      break;
		      	  	  default:
	                      try {
	                          $_select.setAttribute($n,$m[$n]); 
	                      } catch(err) {
	                          console.log(err.message);
	                      }   
	                      break;
		  	  	  }
		  	  }
		  	  /* incorporar opciones de SELECT si se definen como valores */
		  	  if (!(typeof this.$jsValue == "undefined")){
	  	  	  	  if (Object.prototype.toString.call( this.$jsValue ) === "[object Array]"){
		  	  	  	  for (var $h=0;$h<this.$jsValue.length;$h++){
		  	  	  	  	  if (Object.prototype.toString.call( this.$jsValue[$h] ) === "[object Object]"){
			  	  	  	  	  if ($m['id']==this.$jsValue[$h]['id']){
			  	  	  	  	  	  if ('options' in this.$jsValue[$h]){
									  /* options puede ser un array de diccionarios o un string */
									  if (typeof this.$jsValue[$h]['options'] === 'string'){
									      var $_data = '';
									      var $_url = '';
									      if (this.$jsValue[$h]['options'].split('|').length>1){
									          $_url = this.$jsValue[$h]['options'].split('|')[0];
									          $_data = JSON.stringify(JSON.parse(this.$jsValue[$h]['options'].split('|')[1]));
									      } else {
									          $_url = this.$jsValue[$h]['options'];
									      }
									      var $xhr_values = Object.create({'Data':$_data,'Url':$_url,'Return':OnStateChange,'Type':false,'Content_Type':'text/html','Accept':'application/json'});
									      postData($xhr_values);
									      this.$jsValue[$h]['options'] = JSON.parse($xhr.responseText);
									  }
					                  for (var $j=0;$j<this.$jsValue[$h]['options'].length;$j++){
						  	              if (Object.prototype.toString.call( this.$jsValue[$h]['options'][$j] ) === "[object Object]"){
											  var $opt = document.createElement('OPTION');
										      if(!(typeof this.$jsValue[$h]['options'][$j]['value'] == 'undefined')){
											      $opt.value =  this.$jsValue[$h]['options'][$j]['value'];
											  }
											  if(!(typeof this.$jsValue[$h]['options'][$j]['text'] == 'undefined')){
											      $opt.text =this.$jsValue[$h]['options'][$j]['text'];
											  }
											  if(!(typeof this.$jsValue[$h]['options'][$j]['selected'] == 'undefined')){
											      $opt.setAttribute("selected", "selected");
											  }
											  $_select.appendChild($opt);
										  }
									  }
								  }
							  }
						  }
					  }
				  }
		      }
		  	  /* asociar a un subnodo o form */
	  	      if (this.$_tag.length>0){
	  	      	  this.$_tag[this.$_tag.length-1].appendChild($_select);
	  	      } else {
	  	          this.$_form.appendChild($_select);
	  	      } 
          } catch(err) {
              console.log(err.toString());
          } 
	  }
	  /* crear y cerrar nodos (DIV,P,A,FIELDSET,...) */ 
	  addTag($m) {
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
		      	  	  default:
	                      try {
	                          $tag.setAttribute($n,$m[$n]); 
	                      } catch(err) {
	                          console.log(err.message);
	                      }   
	                      break;
		  	  	  }
		  	  }
		  	  this.$_tag.push($tag);
	  	  }
	  	  /* asociar un subnodo a otro de mayor nivel o a form */
	  	  if(!(typeof $m["endtag"] == "undefined")){
	  	  	  if (this.$_tag.length>0) {
	  	  	  	  if (this.$_tag.length>1) {
	  	  	  	  	  /* existe mas de un tag, el último tag se incorpora al anterior en orden */
	  	  	  	  	  var $next_tag = this.$_tag.pop();
	  	  	  	  	  this.$_tag[this.$_tag.length-1].appendChild($next_tag);
	  	  	  	  } else {
	  	  	          this.$_form.appendChild(this.$_tag.pop());
	  	  	      }
	  	  	  }    
	  	  }
	  }
	  /* incorporar cabecera de Table */ 
	  addHead($m) {
	      var $td = document.createElement("TD");
          var $head = document.createTextNode($m['head']);
          $td.appendChild($head);
          /* incorporar atributos a head */
          if(!(typeof $m["class"] == "undefined")){
              $td.setAttribute('class',$m['class']);
          }
          if(!(typeof $m["style"] == "undefined")){
              $td.setAttribute('style',$m['style']);
          }
          if(!(typeof $m["onclick"] == "undefined")){
              $td.setAttribute('onclick',$m['onclick']);
          } 
          /* incorporar cabecera a ultimo tag */             
          if (this.$_tag.length>0){
              this.$_tag[this.$_tag.length-1].appendChild($td);
          }
	  }
	  /* incorporar linea de Table */
	  addTableRows(){
	  	  if (this.$_tag[this.$_tag.length-1].nodeName == "TBODY"){
  	  	  	  // insertar input
  	  	  	  if (Object.prototype.toString.call( this.$jsValue ) === "[object Array]"){
  	  	  	  	  /* recorrer array de filas de valor */
                  for (var $h=0;$h<this.$jsValue.length;$h++){
                  	  if (Object.prototype.toString.call( this.$jsValue[$h] ) === "[object Array]"){
                          this.addTag({'tag':'TR'});
                          /* seleccionar definicion de elemento registro como 'field'*/
                          for (var $j=0;$j<this.$jsForm['form_elements'].length;$j++){
                              if(!(typeof this.$jsForm['form_elements'][$j]['field'] == "undefined")){
                                  /* seleccionar columna de valor */
                                  for (var $i=0;$i<this.$jsValue[$h].length;$i++){
                                      /* comprobar 'id' definicion de registro e 'id' de valor */
                                      if (this.$jsValue[$h][$i]['id']==this.$jsForm['form_elements'][$j]['field']['id']){
                                          var $inputField = clone(this.$jsForm['form_elements'][$j]['field']);
                                          /* actualizar definicion de registro con datos de valor */
                                          for (var $k in this.$jsValue[$h][$i]){
                                              $inputField[$k] = this.$jsValue[$h][$i][$k];
                                          }
                                          /* mostrar valor en fila */
                                          this.addTag({'tag':'TD'});
                                          if ($inputField['type']=='select'){
                                              this.addSelect($inputField);
                                          } else if ($inputField['type']=='button'){
                                              this.addButton($inputField);
                                          } else {
                                              this.addInput($inputField);
                                          }
                                          this.addTag({'endtag':'/TD'});
                                          /* out of this.$jsValue for */
                                          break;
                                      }
                                  }      
                              }
                          }
                          this.addTag({'endtag':'/TR'});
                      }
                  }
  	  	  	  }
	  	  }
      }
      /* form sin valores */
      resetForm(){
   	  	  this.$jsValue = [];
   	  	  this.$_tag = [];
  	      this.createForm();
  	      this.$_form.reset();
      }
      /* actualizar form con nuevos valores */
      setFormValue(_jsOtherValue){
      	  if (!(typeof _jsOtherValue == "undefined")){
      	  	  this.$jsValue = _jsOtherValue;
      	  	  this.$_tag = [];
      	  	  this.removeForm();
	  	      this.createForm();
      	  }
      }
      /* eliminar form */
      removeForm(){
          if (!(typeof this.$_id == "undefined")){
          	  this.$_id.removeChild(document.getElementById(this.$jsForm['id']));
          	  /* eliminar objeto form*/
          	  this.$_form == null;
          	  delete this.$_form;
          }
      }
	  /* listado de atributos de un objeto */
	  recorrerObjeto($objeto){
		  var $respuesta="";
		  for (var $i in $objeto){
		      $respuesta+=$i+": "+$objeto[i];
		  }
		  console.log($respuesta);
	  }
}

function clone($obj) {
	/* clone an object */
	if ($obj === null || !(typeof($obj) == 'object') || 'isActiveClone' in $obj){
	    return $obj;
	}
	if ($obj instanceof Date){
	    var $temp = new $obj.constructor(); //or new Date(obj);
	} else {
	    var $temp = $obj.constructor();
	}
    for (var $key in $obj) {
        if (Object.prototype.hasOwnProperty.call($obj, $key)) {
            $obj['isActiveClone'] = null;
            $temp[$key] = clone($obj[$key]);
            delete $obj['isActiveClone'];
        }
    }
    return $temp;
}