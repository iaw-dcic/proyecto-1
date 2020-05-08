// next prime geeksforgeeks
// previous prime algorithm
var entrada = document.getElementById("entrada");
var textoResultado = document.getElementById("resultado");
var n, res;

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
    
    // This is checked so that we can skip   
    // middle five numbers in below loop

    if (n % 2 == 0 || n % 3 == 0)
        return false;  
    
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