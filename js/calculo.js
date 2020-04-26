function contarTodo(text, longitud) {
    //OBJETO PARA ALMACENAR LOS VALORES
    var registroContadores = {
        cantMinusculas: 0,
        cantMayusculas: 0,
        cantNumeros: 0,
        cantSimbolos: 0,
        puntosNumero: 0,
        reqMin: 0,

        soloLetras : 0,
        soloNumeros : 0
    }

    //RECORRO UNA UNICA VEZ
    for (var i = 0; i < longitud; i++) {
        var charCode = text.charCodeAt(i);
        //SI EL CARACTER ES MINUSCULA
        if (97 <= charCode && charCode <= 122) {
            registroContadores.cantMinusculas = registroContadores.cantMinusculas + 1;
        }
        else {
            //SI EL CARACTER ES MAYUSCULA
            if (65 <= charCode && charCode <= 90) {
                registroContadores.cantMayusculas = registroContadores.cantMayusculas + 1;
            }
            else {
                //SI EL CARACTER ES UN NUMERO
                if (!isNaN(text[i])) {
                    registroContadores.cantNumeros = registroContadores.cantNumeros + 1;
                }
                else {
                    //SI EL CARACTER ES UN SIMBOLO
                    registroContadores.cantSimbolos = registroContadores.cantSimbolos + 1;
                }
            }
        }
    }

    //ALMACENO EL VALOR PARA PUNTOS NUMERO EN CASO DE SER VERDADERO
    if (registroContadores.cantMinusculas > 0 || registroContadores.cantMayusculas > 0 || registroContadores.cantSimbolos > 0) {
        registroContadores.puntosNumero = 1;
    }

    //CALCULO Y ALMACENO REQUERIMIENTO MINIMO
    var cant = 0;
    if (longitud >= 8) {
        cant++;
        if (registroContadores.cantMinusculas > 0)
            cant++;
        if (registroContadores.cantMayusculas > 0)
            cant++;
        if (registroContadores.cantSimbolos > 0)
            cant++;
        if (registroContadores.cantNumeros > 0)
            cant++;
    }

    if (cant >= 4) {
        registroContadores.reqMin = cant;
    }

    //CHEQUEO SI SOLO TENGO LETRAS
    if(registroContadores.cantMayusculas + registroContadores.cantMinusculas == longitud && longitud>0)
    	registroContadores.soloLetras = longitud;

    //SI SOLO TENGO NUMEROS
    if(registroContadores.cantNumeros == longitud && longitud>0)
    	registroContadores.soloNumeros=longitud;



    return registroContadores;
}