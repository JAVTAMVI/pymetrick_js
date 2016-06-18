
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