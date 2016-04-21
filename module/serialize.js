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