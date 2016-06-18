// funcion para crear TABLE desde JSON 
//var jFAddress = {'id':'table_address','name': 'table_address','class':'w3-table w3-striped w3-bordered w3-border w3-hoverable w3-card-4',
//           'table_elements': [ {'tag':'THEAD'},
//                         {'tag':'TR','class':'w3-blue'},
//                         {'head':'Direccion','style':'cursor:pointer;','onclick':'javascript:alert("que bien");void(0);','field':{'type':'text','id':'address','name':'address','value':'','placeholder':'Nombre','class':'w3-input'}},
//                         {'head':'Localidad','field':{'type':'text','id':'city','name':'city','value':'','placeholder':'Ciudad','class':'w3-input'}},
//                         {'head':'Codigo Postal','field':{'type':'text','id':'postcode','name':'postcode','value':'','placeholder':'Codigo Postal','class':'w3-input'}},
//                         {'head':'Provincia','field':{'type':'select','id':'zone_code','name':'zone_code','class':'w3-input'}},
//                         {'head':'Pais','field':{'type':'text','id':'country_iso_code_2','name':'country_iso_code_2','value':'','placeholder':'Pais','class':'w3-input'}},
//                         {'head':'','field':{'type':'button','id':'edit','name':'edit','value':'','icon':'fa fa-pencil','class':'w3-btn-floating w3-white border-ligth-grey w3-hover-blue w3-border w3-text-shadow','data-id-row':''}},
//                         {'head':'','field':{'type':'button','id':'delete','name':'delete','value':'','icon':'fa fa-times','class':'w3-btn-floating w3-white border-ligth-grey w3-hover-blue w3-border w3-text-shadow','data-id-row':''}},
//                         {'endtag':'/TR'},
//                         {'endtag':'/THEAD'},
//                         {'tag':'TBODY'},
//                         {'endtag':'/TBODY'},
//                         {'endtag':'/TABLE'}
//                       ]
//          };
//var jVAddress = [[{'id':'address','value':'C/LOS EJEMPLOS 41','readonly':'readonly'},{'id':'city','value':'CITY EJEMPLO','readonly':'readonly'},{'id':'postcode','value':'28900','readonly':'readonly'},{'id':'zone_code','options':[{'value':08,'text':'Barcelona'},{'value':41,'text':'Sevilla'},{'value':28,'text':'Madrid','selected':'selected'}],'disabled':'disabled'},{'id':'country_iso_code_2','value':'ES','readonly':'readonly'},{'id':'edit','data-id-row':1},{'id':'delete','data-id-row':1}],[{'id':'address','value':'C/LOS EJEMPLOS 4'},{'id':'city','value':'MADRID'},{'id':'postcode','value':'28000'},{'id':'zone_code','options':[{'value':08,'text':'Barcelona'},{'value':41,'text':'Sevilla'},{'value':28,'text':'Madrid','selected':'selected'}]},{'id':'country_iso_code_2','value':'ES'},{'id':'edit','data-id-row':1},{'id':'delete','data-id-row':2}]];
//
//var jAddress = new jsonTable(document.getElementById('myTable'),jFAddress,jVAddress);
//

class jsonTable {
      constructor(id,_jsTable,_jsValue) {
          this.$jsTable = _jsTable;
          this.$jsValue = _jsValue;
          this.$_id = id;
          this.$_tag = [];
          this.$_head = [];
          this.createTable();

      }
      /* crear Table */
      createTable(){   
          if (typeof this.$_table == "undefined"){
              this.$_table = document.createElement('TABLE');
              this.$_tag = [];

              /* incorporar elementos a table */
              if(!(typeof this.$jsTable["id"] == "undefined") || !(typeof this.$jsTable["name"] == "undefined")){
                  for (var $j in this.$jsTable){
                      if (!(Object.prototype.toString.call( this.$jsTable[$j] ) === "[object Object]") && !(Object.prototype.toString.call( this.$jsTable[$j] ) === "[object Array]")){
                          /* seleccionar datos table */
                          switch ($j){
                              case 'id':
                                  this.$_table.setAttribute("id",this.$jsTable[$j]);
                                  this.$_table.setAttribute("name",this.$jsTable[$j]);
                                  break;
                              case 'name':
                                  this.$_table.setAttribute("id",this.$jsTable[$j]);
                                  this.$_table.setAttribute("name",this.$jsTable[$j]);
                                  break;
                              default:
                                  try{
                                      this.$_table.setAttribute($j,this.$jsTable[$j]);
                                  } catch(err) {
                                      console.log(err.message);
                                  }
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
                  this.$_table.appendChild(this.$_tag.pop());
              }

              this.$_id.appendChild(this.$_table);
          }
      }

      addElement(){
          /* incorporar elementos */
          for (var $j in this.$jsTable){
              /* comprobar elementos de objeto table */
              if ($j=="table_elements" && Object.prototype.toString.call( this.$jsTable[$j] ) === "[object Array]"){
                  for (var $e=0; $e<this.$jsTable[$j].length; $e++){
                      /* seleccionar elementos */
                      try{
                          // Tag posibles DIV, FIELDSET
                          if(!(typeof this.$jsTable[$j][$e]["tag"] == "undefined") || !(typeof this.$jsTable[$j][$e]["endtag"] == "undefined")){
                              this.addTag(this.$jsTable[$j][$e]);
                              if (this.$jsTable[$j][$e]["tag"]=='TBODY'){
                                  /* incorporar datos en filas de TABLE */
                                  this.addTableRows();
                              }
                          } 
                          // Head
                          if (!(typeof this.$jsTable[$j][$e]["head"] == "undefined")){
                              /* incorporar TEXTO de cabecera en TABLE */
                              this.addHead(this.$jsTable[$j][$e]);
                          }
                      } catch(err) {
                          console.log(err.message);
                      }   
                  }
              }
          }
      }  
      // add Input
      addInput($m) {
          /* tratamiento de label */
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
                /* asociar a un subnodo o form */
                if (this.$_tag.length>0){
                    this.$_tag[this.$_tag.length-1].appendChild($_label);
                } else {
                    this.$_table.appendChild($_label);
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
            /* asociar a un subnodo o table */
            if (this.$_tag.length>0){
                this.$_tag[this.$_tag.length-1].appendChild($_input);
            } else {
                this.$_table.appendChild($_input);
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
                    this.$_table.appendChild($_label);
                }    
            }
          } catch(err) {
              console.log(err.message);
          } 
      }
      // add button 
      addButton($m) {
          try{
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
            /* asociar a un subnodo o table */
            if (this.$_tag.length>0){
                this.$_tag[this.$_tag.length-1].appendChild($_button);
            } else {
                this.$_table.appendChild($_button);
            }
          } catch(err) {
              console.log(err.message);
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
                    this.$_table.appendChild($_label);
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
                            /* [{'text':'','value':'','selected':'selected'},{...}]  */
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
            /* incorporar opciones de SELECT si se definen como valores                                                */
            /* 'options' es posible incorporarlo en el diccionario de creación de la tabla o bien como diccionario en  */
            /*           el valor del campo a incluir en SELECT. Comprobar formato ejemplo anterior                    */
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
                this.$_table.appendChild($_select);
            }
          } catch(err) {
              console.log(err.toString());
          }  
      }
      /* crear y cerrar nodos (DIV,P,A,FIELDSET,...) */ 
      addTag($m) {
          // incluye etiquetas en FORM como DIV, P, A, SECTION,...
          try{
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
                        this.$_table.appendChild(this.$_tag.pop());
                    }
                }    
            }
          } catch(err) {
              console.log(err.message);
          } 
      }
      /* incorporar cabecera de Table */ 
      addHead($m) {
          try{
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
          } catch(err) {
              console.log(err.message);
          } 
      }
      /* incorporar linea de Table */
      addTableRows(){
          try{
            if (this.$_tag[this.$_tag.length-1].nodeName == "TBODY"){
                // insertar input
                if (Object.prototype.toString.call( this.$jsValue ) === "[object Array]"){
                    /* recorrer array de filas de valor */
                    for (var $h=0;$h<this.$jsValue.length;$h++){
                        if (Object.prototype.toString.call( this.$jsValue[$h] ) === "[object Array]"){
                            this.addTag({'tag':'TR'});
                            /* seleccionar definicion de elemento registro como 'field'*/
                            for (var $j=0;$j<this.$jsTable['table_elements'].length;$j++){
                                if(!(typeof this.$jsTable['table_elements'][$j]['field'] == "undefined")){
                                    /* seleccionar columna de valor */
                                    for (var $i=0;$i<this.$jsValue[$h].length;$i++){
                                        /* comprobar 'id' definicion de registro e 'id' de valor */
                                        if (this.$jsValue[$h][$i]['id']==this.$jsTable['table_elements'][$j]['field']['id']){
                                            var $inputField = clone(this.$jsTable['table_elements'][$j]['field']);
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
          } catch(err) {
              console.log(err.message);
          } 
      }
      /* table sin valores */
      resetTable(){
          this.$jsValue = [];
          this.$_tag = [];
          this.createTable();
          this.$_table.reset();
      }
      /* actualizar table con nuevos valores */
      setTableValue(_jsOtherValue){
          if (!(typeof _jsOtherValue == "undefined")){
              this.$jsValue = _jsOtherValue;
              this.$_tag = [];
              this.removeTable();
              this.createTable();
          }
      }
      /* eliminar form */
      removeTable(){
          if (!(typeof this.$_id == "undefined")){
              this.$_id.removeChild(document.getElementById(this.$jsTable['id']));
              /* eliminar objeto table*/
              this.$_table == null;
              delete this.$_table;
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
    try{
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
    } catch(err) {
        console.log(err.message);
    } 
}