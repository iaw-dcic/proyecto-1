google.charts.load('current', {'packages':['corechart']});
var input = document.querySelector('input');
input.addEventListener('input', analizar);

function interactivo(){
    analizar();
    proporciones();
}

function analizar(){
    var valor = document.getElementById("texto").value;
    var numeroCaracteres = valor.length;
   document.getElementById("Cantidad caracteres").innerHTML="Cantidad de caracteres: "+numeroCaracteres;
    if(numeroCaracteres==0){
            document.getElementById("Cantidad parrafos").innerHTML="Cantidad de párrafos: 0";
            document.getElementById("Cantidad palabras").innerHTML="Cantidad de palabras: 0";
            document.getElementById("Cantidad oraciones").innerHTML="Cantidad de oraciones: 0";
    }
    else{
        primerPunto = /^./
        variosPuntos = /[.]+/g
        enterFinal = /\r?\n$/
        primerEnter = /^\r?\n/
        variosEnters = /[\r?\n]+/g
        textoAcomodado = valor.replace(variosPuntos,".");
        textoAcomodado = textoAcomodado.replace (primerPunto,"");
        textoAcomodado= textoAcomodado.replace(variosEnters,"\r?\n");
        textoAcomodado= textoAcomodado.replace(primerEnter,"")
        textoAcomodado = textoAcomodado.replace(enterFinal,"")
        textoParrafos = textoAcomodado.split(/\r?\n/);
        document.getElementById("Cantidad parrafos").innerHTML="Cantidad de párrafos: "+textoParrafos.length;


        cantOraciones = 0;
        numeroOraciones = 0;
        j=0;
        while (j<textoParrafos.length){
            miCadena=textoParrafos[j];  
            posicion = miCadena.indexOf(".");
            cantOraciones=0;
            while ( posicion != -1 ) {
                cantOraciones++;
                posicion = miCadena.indexOf(".",posicion+1);
            }
            if(cantOraciones==0)
                numeroOraciones++;
            else
                numeroOraciones=cantOraciones+numeroOraciones;
            j++;
        }
        document.getElementById("Cantidad oraciones").innerHTML="Cantidad de oraciones: "+numeroOraciones;
    
        primerBlanco = /^ /
        ultimoBlanco = / $/
        variosBlancos = /[ ]+/g
        textoSinBlancos = textoAcomodado.replace (variosBlancos," ");
        textoSinBlancos = textoSinBlancos.replace (primerBlanco,"");
        textoSinBlancos = textoSinBlancos.replace (ultimoBlanco,"");
        textoPalabras = textoSinBlancos.split(/\r?\n/);
        cantPalabras = 0;
        i=0;
        while (i<textoPalabras.length){
            miCadena=textoPalabras[i];  
            palabras=miCadena.split(" ");
            cantPalabras=cantPalabras+palabras.length;
            i++;
        }  
        document.getElementById("Cantidad palabras").innerHTML="Cantidad de palabras: "+cantPalabras;
    }
}

function buscar(){
    var palabra="";
    var palabra = document.getElementById("palabra").value;
    var valor = document.getElementById("texto").value;
    if(valor.lenght==0 || palabra=="")
        document.getElementById("Repeticiones").innerHTML="Cantidad de repeticiones: 0";
    else{
        var reemplazado=valor;
        numero = 0;
        j=0;
        posicion = valor.indexOf(palabra);
        while ( posicion != -1 ) {
            numero++;
            posicion = valor.indexOf(palabra,posicion+1);
            var reemplazado=reemplazado.replace(palabra,"<rojo>"+"°°°"+"</rojo>");
        }
        posicion=reemplazado.indexOf("°°°")        
         while ( posicion != -1 ) {
            posicion = reemplazado.indexOf("°°°",posicion+1);
            var reemplazado=reemplazado.replace("°°°","<rojo>"+palabra+"</rojo>");
        }
        document.getElementById("Repeticiones").innerHTML="Cantidad de repeticiones: "+numero;
        document.getElementById("Resaltado").innerHTML=reemplazado;
    }
}

function proporciones(){
    var valor = document.getElementById("texto").value;
    var numeroCaracteres = valor.length;
     var oracionesRojo=0;
    var oracionesVerde=0;
    var oracionesAmarillo=0;
    if(numeroCaracteres==0){
            document.getElementById("Proporciones").innerHTML="No hay oraciones";
    }
    else{
        puntoYenter=/\r?\n/
        variosEnters = /[\r?\n]+/g
        textoAcomodado = valor.replace(puntoYenter,"");
        textoAcomodado = textoAcomodado.replace(". ",".");
        textoAcomodado = textoAcomodado.replace(" .",".");
        textoAcomodado = textoAcomodado.replace("..",".");
        miC1 = textoAcomodado.split(".");
        k=0;
            while(k<miC1.length){
                var palabras=miC1[k].split(" ");
                if(palabras.length <11){
                    valor=valor.replace(miC1[k],"<verde>"+miC1[k]+"</verde>");
                    oracionesVerde++;
                }
                else{
                    if(palabras.length>25){
                        valor=valor.replace(miC1[k],"<rojo>"+miC1[k]+"</rojo>");
                        oracionesRojo++;
                    }
                    else{
                        valor=valor.replace(miC1[k],"<amarillo>"+miC1[k]+"</amarillo>");
                        oracionesAmarillo++;
                    }
                }
                k++;
            }
    caracteres=textoAcomodado.split("");
    if(caracteres[(caracteres.length-1)]==".")
           oracionesVerdes--;
  
    document.getElementById("Proporciones").innerHTML=valor;
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Mala proporción', oracionesRojo],
        ['Se recomienda revisar las oraciones', oracionesAmarillo],
        ['Buena proporción', oracionesVerde],
    ]);

    var options = {
    chartArea: {
        height: 0,
        width: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    height: 150,
    width: 150,
    backgroundColor: 'transparent',
    fontName: 'Lemonada',
    fontSize: '10',
    legend: {'position': 'none'},
    colors: ['red', '#F1C503', '#9FF103'],
    is3D: true
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data, options);
    }
}
