
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
        alert ('XMLHttpRequest NO soportado !!!');
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

function xData($opts) {
    /*
      $opts.method = "GET","POST","PUT","DELETE"
      $opts.url 
      $opts.async = true | false => asynchronous | synchronous
      $opts.timeout  value number of milliseconds (set timeout to 4 seconds = 4000 milliseconds)
      $opts.content_type
      $opts.accept
      $opts.file  Ajax file uploads     file.fileName "my-file-name.jpg"
                                        file.size     1282632
                                        file.type     image/jpeg

      $opts.return_function = function to data receive | OnStateChange
      $opts.message = message for true | message error
      $xhr.responseType = "", "arraybuffer", "blob", "document", "json", "text" (default)
    */
    return new Promise(function (resolve, reject) {
    var arrayMethod = ["GET","POST","PUT","DELETE","HEAD"];
    if ($opts.method == null || $opts.method == undefined) {
        $opts.method = "GET";
    }
    if ($opts.timeout !== undefined) {
        $xhr.timeout = $opts.timeout;
        $xhr.ontimeout = function () { $xhr.abort(); alert("Timed out!!!"); }
    }
    if ($opts.method !== null && $opts.method !== undefined) {
        if (arrayMethod.indexOf($opts.method.toUpperCase())>-1) {

            if ($opts.return_function==null || $opts.return_function === undefined) {
                $opts.return_function = OnStateChange;
            }
            if ($opts.message !== undefined && $opts.message !== null) {
                $message_list = $opts.message.split("|");
            } else {
                $message_list = [];
            }
            if ($opts.async === undefined || $opts.async == null){
                $opts.async = true;
            }
            if ($opts.data === undefined){
                return false;
            } else {
                if ($opts.method == "GET") {
                    var url = $opts.url+'?_=' + new Date().getTime() +'&'+ $opts.data;
                    $xhr.open($opts.method, url, $opts.async);
                } else if ($opts.method == "HEAD") {
                    $xhr.open($opts.method, $opts.url, $opts.async);
                } else {
                    $xhr.open($opts.method, $opts.url, $opts.async);
                }
                /* if error */
                $xhr.onerror = function (e) {
                    console.error($xhr.statusText);
                };
                /*$xhr.onreadystatechange = $opts.return_function;*/
                $xhr.setRequestHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0');
                $xhr.setRequestHeader('Pragma', 'no-cache');
                $xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');

    $xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(eval($opt.return_function()));
      } else {
        reject({
          status: this.status,
          statusText: $xhr.statusText
        });
      }
    };
    $xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: $xhr.statusText
      });
    };


                if ($opts.file !== undefined){
                    $xhr.open('POST', $opts.url, $opts.async);
                    $xhr.setRequestHeader('X-File-Name', $opts.file.fileName);
                    $xhr.setRequestHeader("Content-Type", $opts.file.type);
                    $xhr.upload.addEventListener('progress', onprogressHandler, false);
                    $xhr.send($opts.file);
                } else {
                    $xhr.setRequestHeader('Content-Type', $opts.content_type+';charset=UTF-8');
                    $xhr.setRequestHeader('Accept',$opts.accept);
                    if ($opts.method == "GET" || $opts.method == "HEAD") {
                        $xhr.send(null);
                    } else {
                        $xhr.send($opts.data);
                    }
                }
            }
        } else {
            console.log("ERROR method "+ $opts.method +" not allowed, only [GET,POST,PUT,DELETE]");
        }
    } else {
        console.log("ERROR no method [GET,POST,PUT,DELETE]");
    }
    });
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
                if (Boolean($debug)){
                  console.log($xhr.responseText);
                }
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
                if (Boolean($debug)){
                  console.log($xhr.responseText);
                }
            }
        } 
        if (Boolean($debug)){
          console.log($xhr.status);
        }
    } else {
        if (Boolean($debug)){
          console.log('readyState ' + $xhr.readyState);
          console.log('status ' + $xhr.status); 
        }
    }
}

function onprogressHandler(evt) {
    var percent = evt.loaded/evt.total*100;
    /* progressBar.value = percent; */
    console.log('Upload progress: ' + percent + '%');
}
