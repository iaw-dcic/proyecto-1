
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
    procesar(registroContadores.reqMin, registroContadores.reqMin * 2, "cantRequerimientos", "puntosRequerimientos");
    procesar(registroContadores.soloLetras, (0-registroContadores.soloLetras)*longitud,"cantSoloLetras","puntosSoloLetras");
    procesar(registroContadores.soloNumeros,(0-registroContadores.soloNumeros)*longitud,"cantSoloNumeros","puntosSoloNumeros");
    procesar(registroContadores.mayusConsec,(0-registroContadores.mayusConsec)*2,"cantMayusculasConsecutivas","puntosMayusculasConsecutivas");
    procesar(registroContadores.minConsec,(0-registroContadores.minConsec)*2,"cantMinusculasConsecutivas","puntosMinusculasConsecutivas");
    procesar(registroContadores.numConsec,(0-registroContadores.numConsec)*2,"cantNumerosConsecutivos","puntosNumerosConsecutivos");
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
    

    celda = document.getElementById("puntaje");
    celda.innerHTML = puntaje;
    
}