
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
var $editLink = '';

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
                if (document.getElementById('message') === null){
                    alert($message_list[0]);
                } else {
                    document.getElementById('alert.modalTitle').innerHTML='INFORMACION';
                    document.getElementById('alert.message').innerHTML=$message_list[0];
                    document.getElementById("alert.button").click();
                }
            } else {
                console.log($xhr.responseText);
            }
            /* comprobar path si admin */
            if(typeof($path) != "undefined"){
                if ( $path.indexOf('admin') > -1 ) {
                    window.location.href = $path;
                }
            } 
        } else {
            if ($message_list.length>1) {
                if (document.getElementById('message') === null){
                    alert($message_list[1]);
                } else {
                    document.getElementById('alert.modalTitle').innerHTML='INFORMACION';
                    document.getElementById('alert.message').innerHTML=$message_list[1];
                    document.getElementById("alert.button").click();
                }
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