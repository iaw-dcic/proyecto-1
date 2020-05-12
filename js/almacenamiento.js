if(localStorage.getItem("ultimoAlmacenado")==null)
    localStorage.setItem("ultimoAlmacenado","uno");

function guardar(){
    var ultimo=localStorage.getItem('ultimoAlmacenado');
    var texto=document.getElementById("texto").value;
    switch (ultimo) {
    case "uno":
        localStorage.setItem("ultimoAlmacenado","dos");
        localStorage.setItem("valor1", texto);
        break;
    case "dos":
        localStorage.setItem("ultimoAlmacenado","tres");
        localStorage.setItem("valor2", texto);
        break;
    case "tres":
         localStorage.setItem("ultimoAlmacenado","cuatro");
        localStorage.setItem("valor3", texto);
        break; 
    case "cuatro":
        localStorage.setItem("ultimoAlmacenado","cinco");
        localStorage.setItem("valor4", texto);
        break;
    case "cinco":
        localStorage.setItem("ultimoAlmacenado","uno");
        localStorage.setItem("valor5", texto);
        break;
    }
 document.getElementById("texto").value="";
}

function mostrar(numero){
    var ultimo=localStorage.getItem('ultimoAlmacenado');
    switch (numero) {
    case "uno":
        var guardado=localStorage.getItem("valor1");
        document.getElementById("texto").value=guardado;
        break;
    case "dos":
        var guardado=localStorage.getItem("valor2");
        document.getElementById("texto").value=guardado;
        break;
    case "tres":
         var guardado=localStorage.getItem("valor3");
        document.getElementById("texto").value=guardado;
        break;
    case "cuatro":
        var guardado=localStorage.getItem("valor4");
        document.getElementById("texto").value=guardado;
        break;
    case "cinco":
        var guardado=localStorage.getItem("valor5");
        document.getElementById("texto").value=guardado;
        break;
    }
    
}