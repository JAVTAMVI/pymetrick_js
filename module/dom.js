// FUNCIONES LECTURA DOM **********************************************************************************************

/* Lectura de valores de META por NAME
   obtener el valor content de las etiquetas meta a partir del name :
   getMetaContentByName("authenticity-token")
*/

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