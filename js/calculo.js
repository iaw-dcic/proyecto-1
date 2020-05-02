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
        soloNumeros : 0,
        mayusConsec : 0,
        minConsec : 0,
        numConsec : 0
    }

    //RECORRO UNA UNICA VEZ

    var mayusConsecAux=0;
    var minConsecAux=0;
    var numConsecAux=0;

    for (var i = 0; i < longitud; i++) {
        var charCode = text.charCodeAt(i);
        //SI EL CARACTER ES MINUSCULA
        if (97 <= charCode && charCode <= 122) {
            registroContadores.cantMinusculas = registroContadores.cantMinusculas + 1;

            //AHORA CUENTO LAS MINUSCULAS CONSECUTIVAS
             minConsecAux++;
                var j = i-1;
                if(j>0 || i == 0){
                    var anterior = text.charCodeAt(j);
                    if(!(97 <= anterior && anterior <= 122))
                        minConsecAux--;
                }
                if(minConsecAux>registroContadores.minConsec)
                        registroContadores.minConsec=minConsecAux;
        }
        else {
            //SI EL CARACTER ES MAYUSCULA
            if (65 <= charCode && charCode <= 90) {
                registroContadores.cantMayusculas = registroContadores.cantMayusculas + 1;

                //AHORA CUENTO LAS MAYUSCULAS CONSECUTIVAS
                mayusConsecAux++;
                var j = i-1;
                if(j>0 || i == 0){
                    var anterior = text.charCodeAt(j);
                    if(!(65 <= anterior && anterior <= 90))
                        mayusConsecAux--;
                }
                if(mayusConsecAux>registroContadores.mayusConsec)
                        registroContadores.mayusConsec=mayusConsecAux;
            }
            else {
                //SI EL CARACTER ES UN NUMERO
                if (!isNaN(text[i])) {
                    registroContadores.cantNumeros = registroContadores.cantNumeros + 1;

                //CUENTO NUMEROS CONSECUTIVOS.
                numConsecAux++;
                var j = i-1;
                if(j>0 || i == 0){
                    var anterior = text.charCodeAt(j);
                    if(isNaN(text[j]))
                        numConsecAux--;
                }
                if(numConsecAux>registroContadores.numConsec)
                        registroContadores.numConsec=numConsecAux;

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

    //SI SOLO TENGO LETRAS
    if(registroContadores.cantMayusculas + registroContadores.cantMinusculas == longitud && longitud>0)
    	registroContadores.soloLetras = longitud;

    //SI SOLO TENGO NUMEROS
    if(registroContadores.cantNumeros == longitud && longitud>0)
    	registroContadores.soloNumeros=longitud;


    //SECUENCIA DE LETRAS

    //SECUENCIA DE NUMEROS

    //SECUENCIA DE SIMBOLOS

    return registroContadores;
}
