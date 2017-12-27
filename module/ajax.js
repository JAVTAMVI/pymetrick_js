
/* Implementacion de XMLHTTPRequest para comunicacion AJAX */
var $xdr = false;
function getXMLHTTPRequest(){
    var global = typeof window != 'undefined' ? window:self;
    if (typeof global.XMLHttpRequest != 'undefined'){
        try {
            return new global.XMLHttpRequest();
        } catch(err) {console.log(err.message);}
    }
    if(global.XDomainRequest){
        try {
            $xdr = true;
            console.log('XDomainRequest');
            return new XDomainRequest();
        } catch(err) {console.log(err.message);}
    }
    var $ieXMLHttpVersions = ['MSXML2.XMLHTTP.6.0','MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
    for (var i = 0; i < $ieXMLHttpVersions.length; i++) {
        try {
            console.log($ieXMLHttpVersions[i]);
            return new ActiveXObject($ieXMLHttpVersions[i]);
        } catch(err) {console.log(err.message);}
    }
    return false;
}
var $xhr = getXMLHTTPRequest();
var $editLink = '';

/* Link para la edicion de formularios simples */
function getEditLink(Link) {
    $editLink = Link;
}

var $message_list = [];

function xData($opts) {
    /*
      $opts.method = "GET","POST","PUT","DELETE","OPTIONS","HEAD"
      $opts.url 
      $opts.async = true | false => asynchronous | synchronous
      $opts.content_type
      $opts.accept
      $opts.return_function = function to data receive | OnStateChange
      $opts.message = message for true | message error
      $xhr.responseType = "", "arraybuffer", "blob", "document", "json", "text" (default)
    */
    try {
    var $methods = ["GET","POST","PUT","DELETE","OPTIONS","HEAD"];
    if (!$options.hasOwnProperty('method')){
        $options.method = "GET";
    }
    var successCallback = $options.success || function(){};
    var failureCallback = $options.failure || function(){};
    $options.user = $options.user || '';
    $options.password = $options.password || '';
    $options.withCredentials = $options.withCredentials || false;
    if ($options.method !== null && $options.method !== undefined) {
        if ($methods.indexOf($options.method.toUpperCase())>-1) {
            if (!$options.hasOwnProperty('return_function')) {
                $options.return_function = OnStateChange;
            }
            if ($options.hasOwnProperty('message')) {
                $message_list = $options.message;
            } else {
                $message_list = [];
            }
            if (!$options.hasOwnProperty('async')){
                $options.async = true;
            }
            if (isFirefox){
                /* only in firefox async=false */
                $options.async = false;
            }
            if (!$options.hasOwnProperty('data')){
                return false;
            } else {
                if ($options.method == "GET") {
                    var url = $options.url+'?_=' + new Date().getTime() +'&'+ $options.data;
                    if ($xdr){
                        $xhr.open($options.method, url);
                    } else {
                        $xhr.open($options.method, url, $options.async, $options.user, $options.password);
                    }
                } else {
                    if ($xdr){
                        $xhr.open($options.method, $options.url);
                    } else {
                        $xhr.open($options.method, $options.url, $options.async, $options.user, $options.password);
                    }
                }
                if ( "withCredentials" in $xhr && $options.async){
                    $xhr.withCredentials = $options.withCredentials;
                }
                if ("onload" in $xhr){
                    $xhr.onload = $options.return_function;
                    $xhr.onerror = function(err){
                        console.log(err.name); 
                        console.log(err.message);    
                        console.log(err.fileName);   
                        console.log(err.stack);
                        console.log(err.lineNumber); 
                        console.log(err.line);       
                    };
                } else {
                    $xhr.onreadystatechange = $options.return_function;
                }
                if ("timeout" in $xhr && $options.async){
                    $xhr.ontimeout = function () {
                        console.error("TimeOut!!!");
                        $xhr.abort();
                        return;
                    };
                    if ($options.hasOwnProperty('timeout')) {
                        $xhr.timeout = $options.timeout;
                    } else {
                        $xhr.timeout = 30000;
                    }
                }
                if ("Access-Control-Allow-Origin" in $xhr){
                    $xhr.setRequestHeader("Access-Control-Allow-Origin", '*');
                }
                if ("Access-Control-Request-Method" in $xhr){
                    $xhr.setRequestHeader("Access-Control-Request-Method", $options.method);
                }
                if ("Access-Control-Request-Headers" in $xhr){
                    $xhr.setRequestHeader("Access-Control-Request-Headers", 'X-Requested-With');
                }
                var $headers = [];
                $headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0';
                $headers['Pragma'] = 'no-cache';
                $headers['X-Requested-With'] = 'xmlhttprequest';
                $headers['Content-Type'] = $options.content_type;
                /* Set headers */
		for ( var i in $headers ) {
		    $xhr.setRequestHeader( i, $headers[ i ] );
                }
                if ($options.method == "GET" || $options.method == "HEAD") {
                    $xhr.send(null);
                } else {
                    $xhr.send($options.data);
                }
            }
        } else {
            console.log("ERROR method "+ $options.method +" not allowed, only [GET,POST,PUT,DELETE]");
        }
    } else {
        console.log("ERROR no method [GET,POST,PUT,DELETE]");
    }
    } catch(err) {
        console.log(err.name); 
        console.log(err.message);    
        console.log(err.fileName);   
        console.log(err.stack);
        console.log(err.lineNumber); 
        console.log(err.line);       
    }
    return false;
}

function OnStateChange() {
    /*
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready
    */
    try{
    var $tt;
    if (typeof $contain == "undefined"){
        var $contain = document.getElementById('contain') || null;
    }
    if (typeof $loadingMessage == "undefined"){
        var $loadingMessage = document.getElementById('loadingMessage') || null;
    }
    if (typeof $message == "undefined"){
        var $message = document.getElementById('alert.message') || null;
    }
    if (typeof $message_display == "undefined"){
        var $message_display = document.getElementById('_message') || null;
    }
    if ($contain !== null && $loadingMessage !== null){
        $contain.style.display='none';
        $loadingMessage.style.display='block';
    }
    if (typeof $debug == "undefined"){
        var $debug = false;
    }
    if ($xhr.readyState==4) {
        if ($xhr.status>=200 && $xhr.status<300) {
            if ($message_list.length>0) {
                if ($message == null){
                    alert($message_list[0]);
                } else {
                    if ($debug){
                        console.log($xhr.responseText);
                        console.log($xhr.responseType);
                    }
                    $message.innerHTML=$message_list[0];
                    console.log($message_list[0]);
                    if ($loadingMessage !== null){
                        $loadingMessage.style.display='none';
                    }
                    $message_display.style.display='block';
                    $tt=setTimeout(function(){ $message_display.style.display='none'; }, 3000);
                }
            }
        } else if($xhr.status>=400) {
            if ($message_list.length>1) {
                if ($message == null){
                    alert($message_list[1]);
                } else {
                    $message.innerHTML=$message_list[1];
                    console.log($message_list[1])
                    if ($loadingMessage !== null){
                        $loadingMessage.style.display='none';
                    }
                    $message_display.style.display='block';
                    $tt=setTimeout(function(){ $message_display.style.display='none'; }, 3000);
                }
            }
            window.location.href = "/";
        } 
    }
    } catch(err) {
        console.log(err.name); 
        console.log(err.message);    
        console.log(err.fileName);   
        console.log(err.stack);
        console.log(err.lineNumber); 
        console.log(err.line);       
    }
    if ($contain !== null && $loadingMessage !== null){
        $contain.style.display='inline';
        $loadingMessage.style.display='none';
    }
    return;
}

function onprogressHandler(evt) {
    var percent = evt.loaded/evt.total*100;
    /* progressBar.value = percent; */
    console.log('Upload progress: ' + percent + '%');
}
