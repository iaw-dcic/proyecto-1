$(document).ready(function() {
  var aux = "";
  var defaultImage;
  var hideComponent;
  var cont = 0;
  let array = generateMemo();
  console.log("El array generado es : ", array);

  //Tengo que inicializar un mapeo...

  //Función que chequea que pasa cada vez que hago click en una carta
  $(".card").click(function() {
    //me guardo el id del elemento seleccionado
    let clicked = $(this).attr("id");
    //en el caso de que ninguna imagen haya sido seleccionada.
    if (aux == "") {
      const img = "m" + clicked;
      document.getElementById(img).src = `images/${img}.jpeg`;
      //guardo el elemento en caso de que tenga que volver a restaurarlo
      hideComponent = $(this);
      aux = clicked;
      console.log("El valor de aux es : " + aux);
    }
    //Si selecciono un elemento previo y acerto aumento el contador y elimino al elemento
    //Tengo que limpiar aux y hide components
    else if (aux == clicked) {
      hideComponent = $(this);
      hideComponent.hide();
      aux = "";
      cont++;
      console.log("El valor de cont es : ", cont);
    }
  });
});

function generateMemo() {
  //arreglo con los elementos a insertar
  let arrayToIns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  //arreglo con las posiciones libres
  let posiciones = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  let toR = [];

  console.log("Testeando el arreglo de posiciones");
  let aux = getPosicion(posiciones);
  console.log("La posicion seleccionada es : " + aux);
  arrayToIns.forEach(element => {
    //obteno la posicion a insertar
    console.log("El arreglo de posiciones ahora es  ", posiciones);
    let pos = getPosicion(posiciones);
    //ahora tengo que eliminar pos del arreglo de posiciones
    posiciones = posiciones.filter(element => element !== pos);
    //inserto el elemento en la posicion a insertar
    toR[pos] = element;
  });

  return toR;
}

//Genera la posicion en base a un arreglo que le es pasado por parametros
function getPosicion(array) {
  let x = Math.floor(Math.random() * array.length);
  //console.log("x es : " + x);
  let min = array[0];
  array.forEach(element => {
    if (Math.abs(element - x) < Math.abs(min - x)) min = element;
    //console.log("Ahora min es : " + min);
  });

  return min;
}
