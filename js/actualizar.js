
var puntaje;

function actualizar() {

	puntaje = 0;

    var pass = document.getElementById("password").value;
    var longitud = pass.length;
    //HAGO UN SOLO RECORRIDO Y CUENTO TODOS DE UNA
    //OBTENGO UN OBJETO QUE TIENE TODOS LOS CONTADORES
    var registroContadores = contarTodo(pass, longitud);

    procesar(longitud, longitud * 4, "cantCaracteres", "puntosLongitud");
    procesar(registroContadores.cantMayusculas, (longitud - registroContadores.cantMayusculas) * 2, "cantMayusculas", "puntosMayusculas");
    procesar(registroContadores.cantMinusculas, (longitud - registroContadores.cantMinusculas) * 2, "cantMinusculas", "puntosMinusculas");
    procesar(registroContadores.cantNumeros, registroContadores.puntosNumero * registroContadores.cantNumeros * 4, "cantNumeros", "puntosNumeros");
    procesar(registroContadores.cantSimbolos, registroContadores.cantSimbolos * 6, "cantSimbolos", "puntosSimbolos");
    procesar(registroContadores.midChar,registroContadores.midChar*2,"cantSYN","puntosSYN");
    procesar(registroContadores.reqMin, registroContadores.reqMin * 2, "cantRequerimientos", "puntosRequerimientos");
    procesar(registroContadores.soloLetras, (0-registroContadores.soloLetras)*longitud,"cantSoloLetras","puntosSoloLetras");
    procesar(registroContadores.soloNumeros,(0-registroContadores.soloNumeros)*longitud,"cantSoloNumeros","puntosSoloNumeros");
    procesar(registroContadores.mayusConsec,(0-registroContadores.mayusConsec)*2,"cantMayusculasConsecutivas","puntosMayusculasConsecutivas");
    procesar(registroContadores.minConsec,(0-registroContadores.minConsec)*2,"cantMinusculasConsecutivas","puntosMinusculasConsecutivas");
    procesar(registroContadores.numConsec,(0-registroContadores.numConsec)*2,"cantNumerosConsecutivos","puntosNumerosConsecutivos");
    procesar(registroContadores.secLetras,(0-registroContadores.secLetras)*3,"cantSecuenciaLetras","puntosSecuenciaLetras");
    procesar(registroContadores.secNumeros,(0-registroContadores.secNumeros)*3,"cantSecuenciaNumeros","puntosSecuenciaNumeros");
    procesar(registroContadores.secSimbolos,(0-registroContadores.secSimbolos)*3,"cantSecuenciaSimbolos","puntosSecuenciaSimbolos");

}

function procesar(cantidad, puntos, idCantidad, idPuntos) {

    var celda = document.getElementById(idCantidad);
    celda.innerHTML = cantidad;

    celda = document.getElementById(idPuntos);
    if (cantidad > 0) {
        celda.innerHTML = puntos;
        puntaje += puntos;
    }
    else
        celda.innerHTML = 0;

    //AJUSTO EL PUNTAJE
    if (puntaje > 100) { 
        puntaje = 100; 
    } 
    else if (puntaje < 0) { 
        puntaje = 0; 
    }

    celda = document.getElementById("puntaje");
    celda.innerHTML = puntaje;

    //ASIGNO COMPLEJIDAD

    celda = document.getElementById("complejidad");

    var etiqueta = '<div class="alert alert-danger" role="alert">'+"Muy debil"+'</div>';

    if (puntaje >= 0 && puntaje < 20) { 
        etiqueta = '<div class="alert alert-danger" role="alert">'+"Muy debil"+'</div>';
    }
    else if (puntaje >= 20 && puntaje < 40) { 
        etiqueta = '<div class="alert alert-warning" role="alert">'+"debil"+'</div>';
    }
    else if (puntaje >= 40 && puntaje < 60) { 
        etiqueta = '<div class="alert alert-success" role="alert">'+"Buena"+'</div>';
    }
    else if (puntaje >= 60 && puntaje < 80) { 
        etiqueta = '<div class="alert alert-primary" role="alert">'+"Muy buena"+'</div>';
    }
    else if (puntaje >= 80 && puntaje <= 100) { 
        etiqueta = '<div class="alert alert-info" role="alert">'+"Excelente"+'</div>'; 
    }

    celda.innerHTML = etiqueta;
}