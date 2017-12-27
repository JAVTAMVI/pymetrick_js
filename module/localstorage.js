
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
    /* asignar un valor a una referencia */
    if (localStorageSupported()){
        localStorage.setItem($ref, $data);
    }
}
function ls_getItem($ref) {
    /* obtener un valor de una referencia */
    if (localStorageSupported()){
        return localStorage.getItem($ref);
    }
} 
function ls_setJsonItem($ref,$json_data) {
    /* asignar un grupo de valores JSON a una referencia */
    if (localStorageSupported()){
        localStorage.setItem($ref, JSON.stringify($json_data));
    }
}
function ls_getJsonItem($ref) {
    /* obtener un grupo de valores JSON de una referencia */
    if (localStorageSupported()){
        return JSON.parse(localStorage.getItem($ref));
    }
}   
function ls_removeItem($ref) {
    /* eliminar una referencia */
    if (localStorageSupported()){
        localStorage.removeItem($ref);
    }
}
function ls_Clear() {
    /* eliminar todos los valores de un localStorage */
    if (localStorageSupported()){
        localStorage.clear();
    }
}
function ls_Items() {
    /* comprobar el numero de elementos en localStorage */
    if (localStorageSupported()){
        return localStorage.length();
    }
}