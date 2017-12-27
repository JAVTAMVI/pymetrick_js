
// FUNCIONES TRATAMIENTO DOM 

// Lectura de valores de META por NAME
// obtener el valor content de las etiquetas meta a partir del name :
// getMetaContentByName("authenticity-token")
//

function getMetaContentByName(name){
    var $x = document.getElementsByTagName("META");
    var $i;
    for ($i = 0; $i < $x.length; $i++) {
        if ($x[$i].name==name)
        {
            return $x[$i].content;
        }
        
    }
}

// Importar dinamicamente un fichero css

function ImportStyleFile (css_file) {
    if (document.createStyleSheet){
       document.createStyleSheet(css_file);
    } else {
       var $linkTag = document.createElement ("link");
       $linkTag.href = css_file;
       $linkTag.rel = "stylesheet";
       var $head = document.getElementsByTagName ("head")[0];
       $head.appendChild ($linkTag);
    }
}