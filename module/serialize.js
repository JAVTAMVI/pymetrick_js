
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
function _serialTableJSON(tableID){
   var $node = ['INPUT','SELECT','TEXTAREA'];
   var $tbl = document.getElementById(tableID);
   var $f=[];
   try {
      for (var $i = 0; $i < $tbl.rows.length; $i++){
           var $q = {};
           for (var $j = 0; $j < $tbl.rows[$i].cells.length;$j++){
              /* comprobar elementos de celdas */
              if ($tbl.rows[$i].cells[$j].firstElementChild !== null || $tbl.rows[$i].cells[$j].firstChild !== null ){
                  var $input = $tbl.rows[$i].cells[$j].firstElementChild || $tbl.rows[$i].cells[$j].firstChild;
                  if ($input!==null){
                      if (typeof $node[$input.nodeName] !== undefined){
                          switch ($input.nodeName) {
                            case 'INPUT':
                                switch ($input.type) {
                                  case 'text':
                                  case 'email':
                                  case 'tel':
                                  case 'hidden':
                                  case 'password':
                                  case 'button':
                                  case 'reset':
                                  case 'submit':
                                  case 'number':
                                      $q[$input.id]=$input.value;
                                      break;
                                  case 'checkbox':
                                  case 'radio':
                                      if ($input.checked) {
                                          $q[$input.id]=$input.value;
                                      }                       
                                      break;
                                  case 'file':
                                      break;
                                }
                                break;           
                            case 'TEXTAREA':
                                $q[$input.id]=$input.value;
                                break;
                            case 'SELECT':
                                switch ($input.type) {
                                  case 'select-one':
                                      $q[$input.id]=$input.value;
                                      break;
                                  case 'select-multiple':
                                      var $s = [];
                                      for ($k = $input.options.length - 1; $k >= 0; $k = $k - 1) {
                                          if ($input.options[$k].selected) {
                                              $s.push($input.options[$k].value);
                                          }
                                          $q[$input.id]=$s;
                                      }
                                      break;
                                }
                                break;
                            case 'BUTTON':
                                switch ($input.type) {
                                  case 'reset':
                                  case 'submit':
                                  case 'button':
                                      /* $q[$input.id]=$input.value; */
                                      break;
                                }
                                break;
                          }
                      
                      }
                  }
              }
           }
           if (Object.keys($q).length>0){
               $f.push($q);
           }
       }
       return JSON.stringify($f);

   } catch(err) {
        console.log(err.name); 
        console.log(err.message);    
        console.log(err.fileName);   
        console.log(err.stack);
        console.log(err.lineNumber); 
        console.log(err.line);
   }
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