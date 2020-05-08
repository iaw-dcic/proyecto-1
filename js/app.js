// next prime geeksforgeeks
// previous prime algorithm
var entrada = document.getElementById("entrada");
var textoResultado = document.getElementById("resultado");
var n, res;
var arrDivs = ["chequear", "anterior", "siguiente"];

entrada.addEventListener("keydown", function (e) {
    if (e.keyCode === 13){ //controla que la tecla presionada sea enter
        n = entrada.value;
        res = esPrimo(n);
        asignarTextoResultado(res);
        colorTextoResultado(res);
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

function asignarTextoResultado(bool){
    if(bool == true)
        textoResultado.innerHTML = "es primo";
    else
        textoResultado.innerHTML = "no es primo";
}

function colorTextoResultado(bool){
    if(bool == true) 
            textoResultado.className = "verdadero";
        else
            textoResultado.className = "falso";

}

function mostrar(str) {
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

