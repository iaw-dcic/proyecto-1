var searchBar = document.getElementById("searchBar");
var selectBar = document.getElementById("selectBar");

var recipeTitle = document.getElementById("recipeTitle");
var recipeIngredients = document.getElementById("recipeIngredients");
var recepiteText = document.getElementById("recipeText");
var recipeImage = document.getElementById("recipeImage");

const api = "https://api.spoonacular.com/recipes/";
const key = "?number=1&apiKey=21ed6d25d2b74c229065f3d7dcec3980"

function buscarReceta(){
     
    var option = selectBar.options[selectBar.selectedIndex].value;
    url = api + option + key;

    fetch(url).then(result => result.json())
    .then( (result) => {
        imprimirReceta(result);
    })
    .catch( (error) => {
        console.error(error);
    })
}

function imprimirReceta(recipe){

    var textoFromateado = removerTagsHTML(recipe.recipes[0].instructions);
    var ingredientes = obtenerIngredientes(recipe);

    recipeImage.src = recipe.recipes[0].image;
    recipeTitle.innerText = recipe.recipes[0].title;
    recipeIngredients.innerText = ingredientes;
    recepiteText.innerText = textoFromateado;
}

function removerTagsHTML(texto) {
    if (texto) {
        var strHtmlCode = texto;

        /* It replaces escaped brackets with real ones,
         i.e. < is replaced with < and > is replaced with > */

        strHtmlCode = strHtmlCode.replace(/&(lt|gt);/g,
        function (strMatch, p1) {
            return (p1 == "lt") ? "<" : ">";
        });
        var strTagStrippedText = strHtmlCode.replace(/<\/?[^>]+(>|$)/g, "");

    }
    return strTagStrippedText;
}

function obtenerIngredientes(json){

    var ingredientes = "";
    var i = 0;

    for(i; i<json.recipes[0].extendedIngredients.length; i++){
        ingredientes = ingredientes + json.recipes[0].extendedIngredients[i].original+", ";
    }
    return ingredientes;
}