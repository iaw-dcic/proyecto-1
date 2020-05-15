var searchBar = document.getElementById("searchBar");
var selectBar = document.getElementById("selectBar");

function changeSearchText(){
    
    var selected = selectBar.options[selectBar.selectedIndex].value;

    if(selected == "random"){
        searchBar.disabled = true;
        searchBar.value = "Se buscará una receta aleatoria";
    } else if(selected == "search"){
        searchBar.disabled = false;
        searchBar.value = "¿Qué receta desea buscar?";
    } else{
        searchBar.disabled = false;
        searchBar.value = "¿Qué ingredientes quieres usar?";
    }
}

