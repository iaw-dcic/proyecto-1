function analizar(){
    var valor = document.getElementById("texto").value;
    localStorage.setItem('valor1',valor);
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
        texto1= texto1.replace(variosEnters,"\r?\n");
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

function buscar(){
    var palabra="";
    var palabra = document.getElementById("palabra").value;
    var valor = document.getElementById("texto").value;
    if(valor.lenght==0 || palabra=="")
        document.getElementById("Repeticiones").innerHTML="Cantidad de repeticiones: 0";
    else{
        var re=valor;
        numero = 0;
        j=0;
        posicion = valor.indexOf(palabra);
        while ( posicion != -1 ) {
            numero++;
            posicion = valor.indexOf(palabra,posicion+1);
            var re=re.replace(palabra,"<rojo>"+"°"+"</rojo>");
        }
        document.getElementById("Repeticiones").innerHTML="Cantidad de repeticiones: "+numero;
        document.getElementById("Resaltado").innerHTML=re;
    }
}

function proporciones(){
    var valor = document.getElementById("texto").value;
    var numeroCaracteres = valor.length;
    if(numeroCaracteres==0){
            document.getElementById("Proporciones").innerHTML="No hay oraciones";
    }
    else{
        miCadena = valor.split(/\r?\n/);
        j=0;
        k=0;
        while (j<miCadena.length){
            k=0;
            miC1=miCadena[j].split(".");
            while(k<miC1.length){
                var palabras=miC1[k].split(" ");
                if(palabras.length <8){
                    valor=valor.replace(miC1[k],"<verde>"+miC1[k]+"</verde>");
                }
                else{
                    if(palabras.length>15){
                        valor=valor.replace(miC1[k],"<rojo>"+miC1[k]+"</rojo>");
                    }
                    else{
                        valor=valor.replace(miC1[k],"<amarillo>"+miC1[k]+"</amarillo>");
                    }
                }
                k++;
            }
            j++;
        }
        document.getElementById("Proporciones").innerHTML=valor;
    }
}