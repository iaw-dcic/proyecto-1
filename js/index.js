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
    const img = "m" + clicked;
    //busco la imagen asociada al id...
    const aux = generateImage(clicked, array);
    console.log("El indice de la posicion : " + clicked + "es :" + aux);
    console.log("La ruta es : " + `images/m${aux}.jpeg`);
    document.getElementById(img).src = `images/m${aux}.jpeg`;
    console.log(document.getElementById(img));
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

  //A veces hay que castear el elemento a int, aunque ya sea de tipo int...
  function generateImage(element, array) {
    //Modulo 8 así le asigna la misma imagen a dos posiciones
    x = array.indexOf(element * 1) % 8;
    console.log("el x que estoy calculando es : " + x);
    return x;
  }
});
