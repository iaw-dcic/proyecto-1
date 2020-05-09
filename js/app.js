var inputChequear = document.getElementById("inputChequear");
var inputAnterior = document.getElementById("inputAnterior");
var inputSiguiente = document.getElementById("inputSiguiente");

var textoResultadoChequear = document.getElementById("resultadoChequear");
var textoResultadoAnterior = document.getElementById("resultadoAnterior");
var textoResultadoSiguiente = document.getElementById("resultadoSiguiente");
var n, resBool, resInt;
var arrDivs = ["chequear", "anterior", "siguiente"];

inputChequear.addEventListener("keydown", function (e) {
    if (e.keyCode === 13){ //controla que la tecla presionada sea enter
        n = inputChequear.value;
        resBool = esPrimo(n);
        asignarTextoResChequear(resBool);
        colorResChequear(resBool);
    }
});

inputAnterior.addEventListener("keydown", function (e) {
    if (e.keyCode === 13){ 
        n = inputAnterior.value;
        resInt = anteriorPrimo(n);
        asignarTextoResAnt(resInt);
    }
});

inputSiguiente.addEventListener("keydown", function (e) {
    if (e.keyCode === 13){ 
        n = inputSiguiente.value;
        resInt = siguientePrimo(n);
        asignarTextoResSig(resInt);
    }
});

function esPrimo(n){
    if (n <= 1)  return  false;  
    if (n <= 3)  return true;  
    if (n % 2 == 0 || n % 3 == 0)
        return false;  

    /* los 3 if de arriba sirven para saltear los primeros
       5 números en el bucle de abajo*/
    
    for (var i = 5; i * i <= n; i = i + 6)  
        if (n % i == 0 || n % (i + 2) == 0)  
            return false;  

    return true;  
} 

function anteriorPrimo(n){
        var i, j, winner;
        var arr = [0, 0];

        for(i = 2; i <= n; ++i) 
            arr[i] = 1;
        for(i = 2; i <= n; ++i) {
            if(arr[i]) {
                winner = i;
                for(j = i+i; j <= n; j += i) 
                    arr[j] = 0;
            }
        }
        return winner;
    }

function siguientePrimo(n){
    if (n <= 1)  
        return 2;  
      
    var aux = n;  
    var encontre = false;  
      
    // Loopea continuamente hasta que esPrimo devuelve  
    // true para un número más grande que n

    while (!encontre){  
        aux++;
        if (esPrimo(aux))  
            encontre = true;  
    }     
    return aux;  
}

function asignarTextoResChequear(res){
    if(res == true)
        textoResultadoChequear.innerHTML = "es un número primo";
    else
        textoResultadoChequear.innerHTML = "no es un número primo";
}

function asignarTextoResAnt(res){
    textoResultadoAnterior.innerHTML = res;
}

function asignarTextoResSig(res){
    textoResultadoSiguiente.innerHTML = res;
}

function colorResChequear(bool){
    if(bool == true) 
            textoResultadoChequear.className = "resultado verdadero";
        else
            textoResultadoChequear.className = "resultado falso";

}

function mostrarDiv(str) {
    var divMostrar = document.getElementById(str+"Primo");
    var divOcultar;
    if (divMostrar.style.display === "none") 
        divMostrar.style.display = "block";
    
    for(i = 0; i < 3; i++){
        if(arrDivs[i] != str){
            divOcultar = document.getElementById(arrDivs[i]+"Primo");
            divOcultar.style.display = "none";
        }

    }
}