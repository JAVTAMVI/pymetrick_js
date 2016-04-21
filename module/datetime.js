// UTILIDADES VARIAS **********************************************************************************************

/* Poner fecha y hora en HTML
   para utilizar esta funcion debe insertar un codigo igual al siguiente en HTML
   <SCRIPT LANGUAGE="JavaScript">
   document.write(customDateString(new Date()))
    </SCRIPT>
*/
dayNames_es = new Array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado")
dayNames_fr = new Array("dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi")
dayNames_pt = new Array("Domingo","Segunda-feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sabado")
dayNames_en = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
monthNames_es = new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
monthNames_fr = new Array("janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre");
monthNames_pt = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");
monthNames_en = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
function customDateString(oneDate) {
    var ln = (window.navigator.language||navigator.browserLanguage).substring(0,2);
    ln = 'fr'
    if(ln == 'en'){ 
       var theDay = dayNames_en[oneDate.getDay() ];
       var theMonth = monthNames_en[oneDate.getMonth() ];
    }else if(ln == 'es'){
       var theDay = dayNames_es[oneDate.getDay() ];
       var theMonth = monthNames_es[oneDate.getMonth() ];
    }else if(ln == 'fr'){
       var theDay = dayNames_fr[oneDate.getDay() ];
       var theMonth = monthNames_fr[oneDate.getMonth() ];
    }else if(ln == 'pt'){
       var theDay = dayNames_pt[oneDate.getDay() ];
       var theMonth = monthNames_pt[oneDate.getMonth() ];
    } else {
       var theDay = dayNames_es[oneDate.getDay() ];
       var theMonth = monthNames_es[oneDate.getMonth() ];
    }
    var theYear = oneDate.getYear()
    theYear += (theYear < 1000) ? 1900 : 0
    if(ln == 'en'){ 
       return theDay + ", " + theMonth + oneDate.getDate() + "th, "+ theYear
    }else if(ln == 'es' || ln == 'pt' || ln == 'de'){
       return theDay + ", " + oneDate.getDate() + " de "+ theMonth + " de " + theYear
    }else if(ln == 'fr' ){
       return theDay + ", le " + oneDate.getDate() + " "+ theMonth + " " + theYear
    } else {
       return theDay + ", " + oneDate.getDate() + " de "+ theMonth + " de " + theYear
    }
    
}

/* Poner fecha y hora local en formato serial
   para utilizar esta funcion debe insertar un codigo igual al siguiente en HTML
   <SCRIPT LANGUAGE="JavaScript">
   document.write(customDateSerial()
    </SCRIPT>
*/
function customDateSerial() {
   var $dat = new Date();
   var $y = dat.getFullYear();
   var $m = "0" + ($dat.getMonth()+1);
   var $d = "0" + $dat.getDate();
   var $h = "0" + $dat.getHours();
   var $mm = "0" + $dat.getMinutes();
   var $s = "0" + $dat.getSeconds();
   var $ds = $y + $m.substr(-2) + $d.substr(-2) + $h.substr(-2) + $mm.substr(-2) + $s.substr(-2);
   return $ds;
}

/* Poner fecha y hora UTC en formato serial
   para utilizar esta funcion debe insertar un codigo igual al siguiente en HTML
   <SCRIPT LANGUAGE="JavaScript">
   document.write(customDateUTCSerial()
    </SCRIPT>
*/
function customDateUTCSerial() {
   var $dat = new Date();
   var $y = $dat.getUTCFullYear();
   var $m = "0" + ($dat.getUTCMonth()+1);
   var $d = "0" + $dat.getUTCDate();
   var $h = "0" + $dat.getUTCHours();
   var $mm = "0" + $dat.getUTCMinutes();
   var $s = "0" + $dat.getUTCSeconds();
   var $ds = $y + $m.substr(-2) + $d.substr(-2) + $h.substr(-2) + $mm.substr(-2) + $s.substr(-2);
   return $ds;
}