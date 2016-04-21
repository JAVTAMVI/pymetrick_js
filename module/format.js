// generic positive number decimal formatting function
/* Poner formato a importes de monedas
   para utilizar esta funcion debe insertar un codigo igual al siguiente en HTML
   <SCRIPT LANGUAGE="JavaScript">
   document.write(customDateUTCSerial()
    </SCRIPT>
*/
function format (expr, decplaces) {
    var $str = "" + Math.round (eval(expr) * Math.pow(10,decplaces))
    while ($str.length <= decplaces) {
        $str = "0" + $str
    }
    var $decpoint = $str.length - decplaces
    return $str.substring(0,$decpoint) + "." + $str.substring($decpoint,$str.length);
}

function eurize (expr) {
    return format(expr,2) + " €"
}

function dollarize (expr) {
    return format(expr,2) + " $"
}