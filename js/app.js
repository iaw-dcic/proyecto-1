var inputCheck = document.getElementById("inputCheck");
var inputPrevious = document.getElementById("inputPrevious");
var inputNext = document.getElementById("inputNext");

var textResultCheck = document.getElementById("resultCheck");
var textResultPrevious = document.getElementById("resultPrevious");
var textResultNext = document.getElementById("resultNext");

var themeButton = document.getElementById("themeButton");

var khakiTheme = 'css/khakiTheme.css';
var greyTheme = 'css/greyTheme.css';
var activeTheme;

var n, resBool, resInt;
var arrDivs = ["check", "previous", "next"];

function setStorage(strInput){
    var input = document.getElementById("input" + strInput);
    var aux1, aux2;

    /* Reordenar elementos en localStorage y en HTML para que aparezcan
    con el más reciente arriba del todo y el más antiguo abajo */

    for(i = 1; i <= 5; i++){
	    if(i % 2 != 0){
		    aux1 = localStorage.getItem(i.toString());
		    if(i == 1)
                localStorage.setItem(i.toString(), input.value.toString());
		    else
                localStorage.setItem(i.toString(), aux2.toString());
        }
	    else{
		    aux2 = localStorage.getItem(i.toString());
            localStorage.setItem(i.toString(), aux1.toString());
        }
        document.getElementById("hist" + i.toString()).innerHTML = localStorage.getItem(i.toString());
    }
}

function loadStorage(){
    for(i = 1; i <= 5; i++)
        document.getElementById("hist" + i.toString()).innerHTML = localStorage.getItem(i.toString());

    if (localStorage.getItem("theme") != null){
        document.getElementById("theme").href = localStorage.getItem("theme");
        activeTheme = localStorage.getItem("theme");
    }
    else{
        document.getElementById("theme").href = greyTheme;
        activeTheme = greyTheme;
    }
}

function setTheme(theme) {
    document.getElementById("theme").href = theme;
    localStorage.setItem("theme", theme);
    activeTheme = theme;
}

themeButton.addEventListener("click", function(e){
    if(activeTheme == greyTheme)
        setTheme(khakiTheme);
    else
        setTheme(greyTheme);
});

inputCheck.addEventListener("keydown", function (e) {
    if (e.keyCode === 13){ //controla que la tecla presionada sea enter
        n = inputCheck.value;
        resBool = checkPrime(n);
        assignTextResCheck(resBool);
        colorResCheck(resBool);
        setStorage("Check");
    }
});

inputPrevious.addEventListener("keydown", function (e) {
    if (e.keyCode === 13){ 
        n = inputPrevious.value;
        resInt = previousPrime(n);
        assignTextResPrev(resInt);
        setStorage("Previous");
    }
});

inputNext.addEventListener("keydown", function (e) {
    if (e.keyCode === 13){ 
        n = inputNext.value;
        resInt = nextPrime(n);
        assignTextResNext(resInt);
        setStorage("Next");
    }
});

function checkPrime(n){
    if (n <= 1)  return  false;  
    if (n <= 3)  return true;  
    if (n % 2 == 0 || n % 3 == 0)
        return false;  
    
    for (var i = 5; i * i <= n; i = i + 6)  
        if (n % i == 0 || n % (i + 2) == 0)  
            return false;  

    return true;  
} 

function previousPrime(n){
        var i, j, winner;
        var arr = [0, 0];

        for(i = 2; i <= n; ++i) 
            arr[i] = 1;
        for(i = 2; i < n; ++i) {
            if(arr[i]) {
                winner = i;
                for(j = i+i; j < n; j += i) 
                    arr[j] = 0;
            }
        }
        return winner;
}

function nextPrime(n){
    if (n <= 1)  
        return 2;  
      
    var aux = n;  
    var found = false;  
      
    // Loopea continuamente hasta que checkPrime devuelve  
    // true para un número más grande que n

    while (!found){  
        aux++;
        if (checkPrime(aux))  
            found = true;  
    }     
    return aux;  
}

function assignTextResCheck(res){
    if(res == true)
        textResultCheck.innerHTML = "es un número primo";
    else
        textResultCheck.innerHTML = "no es un número primo";
}

function assignTextResPrev(res){
    textResultPrevious.innerHTML = res;
}

function assignTextResNext(res){
    textResultNext.innerHTML = res;
}

function colorResCheck(bool){
    if(bool == true) 
            textResultCheck.className = "result true";
        else
            textResultCheck.className = "result false";
}

function showDiv(str) {
    var divMostrar = document.getElementById(str + "Prime");
    var divOcultar;
    divMostrar.style.display = "block";
    
    for(i = 0; i < 3; i++){
        if(arrDivs[i] != str){
            divOcultar = document.getElementById(arrDivs[i] + "Prime");
            divOcultar.style.display = "none";
        }

    }
}
