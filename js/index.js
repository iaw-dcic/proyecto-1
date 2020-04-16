$(document).ready(function() {
  var selectedId = -1;
  let imgArray = [];
  let array = generateMemo();
  console.log("El array generado es : ", array);

  //Tengo que inicializar un mapeo...

  //Función que chequea que pasa cada vez que hago click en una carta
  $(".card").click(function() {
    let clicked = $(this).attr("id");
    if (clicked != selectedId) {
      showSelected(clicked);
      if (selectedId > -1) {
        //Estoy en el caso de que hay dos seleccionados
        window.setTimeout(check, 500, selectedId, clicked);
        selectedId = -1;
      } else selectedId = clicked;
    }

    //me guardo el id del elemento seleccionado
    /*
    let clicked = $(this).attr("id");
    const img = "m" + clicked;
    //busco la imagen asociada al id...
    const aux = generateImage(clicked, array);
    console.log("El indice de la posicion : " + clicked + "es :" + aux);
    console.log("La ruta es : " + `images/m${aux}.jpeg`);
    $(`#${img}`).hide();
    $(`#${img}`).attr("src", `images/m${aux}.jpeg`);
    $(`#${img}`).fadeIn(500);
    console.log(document.getElementById(img));
    */
  });

  function check(id1, id2) {
    console.log("Estoy aqui borracho y loco");
    const x = generateImage(id1);
    const y = generateImage(id2);
    if (x !== y) {
      backToDefault(id1);
      backToDefault(id2);
    } else {
      //deberia aumentar un contador
      imgArray.push($(`#m${id1}`));
      imgArray.push($(`#m${id2}`));
      $(`#m${id1}`).hide();
      $(`#m${id2}`).hide();
    }
  }

  //vuelve a los valores por defecto
  function backToDefault(img1) {
    $(`#m${img1}`).hide();
    $(`#m${img1}`).attr("src", `images/default.png`);
    $(`#m${img1}`).fadeIn(500);
  }

  $("#reset").click(function restartGame() {
    array = generateMemo();
    imgArray.forEach(element => {
      element.attr("src", `images/default.png`);
      element.fadeIn(500);
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

  function showSelected(id) {
    const img = "m" + id;
    //busco la imagen asociada al id...
    const aux = generateImage(id, array);

    $(`#${img}`).hide();
    $(`#${img}`).attr("src", `images/m${aux}.jpeg`);
    $(`#${img}`).fadeIn(500);
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
  function generateImage(element) {
    //Modulo 8 así le asigna la misma imagen a dos posiciones
    x = array.indexOf(element * 1) % 8;
    console.log("el x que estoy calculando es : " + x);
    return x;
  }
});
