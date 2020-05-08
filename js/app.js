
function fun(){
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
        texto1 = valor.replace(variosPuntos,".");
        texto1 = texto1.replace (primerPunto,"");
        texto1 = texto1.replace(primerEnter,"")
        texto1 = texto1.replace(enterFinal,"")
        textoParrafos = texto1.split(/\r?\n/);
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
        texto2 = texto1.replace (variosBlancos," ");
        texto2 = texto2.replace (primerBlanco,"");
        texto2 = texto2.replace (ultimoBlanco,"");
        textoParrafos2 = texto2.split(/\r?\n/);
        cantPalabras = 0;
        i=0;
        while (i<textoParrafos2.length){
            miCadena=textoParrafos2[i];  
            m=miCadena.split(" ");
            cantPalabras=cantPalabras+m.length;
            i++;
        }  
        document.getElementById("Cantidad palabras").innerHTML="Cantidad de palabras: "+cantPalabras;
    }
}