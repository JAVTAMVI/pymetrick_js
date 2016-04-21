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