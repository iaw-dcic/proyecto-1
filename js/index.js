$(document).ready(function() {
  $(".finish").hide();
  //Si no existe arreglo con las posiciones más altas lo creo
  if (!localStorage.getItem("array"))
    localStorage.setItem("array", JSON.stringify(new Array()));
  setInitialState();
  let selectedId = -1;
  let seconds = 0;
  let minutes = 0;
  let _errores = 0;
  let contFinish = 0;
  let imgArray = [];
  let myVar;
  let startGame = false;
  let array = generateMemo();
  const deletedArray = [];
  console.log("El array generado es : ", array);
  function myTimer() {
    document.getElementById("demo").innerHTML = seconds++;
  }

  $("#win").click(function(e) {
    e.preventDefault();
    clearInterval(myVar);
    winGame();
  });

  $("#style").click(function(e) {
    $("#cSel").remove();
    localStorage.setItem("style", true);
    e.preventDefault();
    setDarkStyle();
  });

  $("#original").click(function(e) {
    e.preventDefault();
    //remuevo el estilo que tengo por defecto
    $("#cSel").remove();
    localStorage.removeItem("style");
    setStyle();
  });

  //Función que chequea que pasa cada vez que hago click en una carta
  $(".card").click(function() {
    //Setea el contador si el juego todavia no empezo
    if (!startGame) myVar = setInterval(myTimer, 1000);
    startGame = true;

    let clicked = $(this).attr("id");

    console.log("El arreglo de elementos eliminados es : ", deletedArray);
    console.log("el id seleccionado es :", clicked);
    if (clicked != selectedId && !deletedArray.includes(clicked)) {
      showSelected(clicked);
      if (selectedId > -1) {
        //Estoy en el caso de que hay dos seleccionados
        window.setTimeout(check, 500, selectedId, clicked);
        selectedId = -1;
      } else selectedId = clicked;
    }
  });

  function setDarkStyle() {
    $("head").append(
      '<link id="cSel" rel="stylesheet" href="css/dark.css" type="text/css" />'
    );
    if (contFinish === 8) location.reload();
  }

  function setInitialState() {
    console.log("Hola estoy cargando el estado inicial...");
    let aux = JSON.parse(localStorage.getItem("style"));
    console.log("El estado inicial es : ", aux);
    if (aux === true) {
      console.log("Entonces no tengo que entrar aqui");
      //Tengo que remover el css que estoy trayendo por defecto
      $("#cSel").remove();
      //Tengo que insertar el nuevo css
      $("head").append(
        '<link id="cSel" rel="stylesheet" href="css/dark.css" type="text/css" />'
      );
    }
  }

  function setStyle() {
    localStorage.setItem("style", false);
    $("head").append(
      '<link id="cSel" rel="stylesheet" href="css/app.css" type="text/css" />'
    );
    if (contFinish === 8) location.reload();
  }

  function avoidStyle() {
    localStorage.removeItem("style");
  }

  function checkImageArray() {
    console.log(
      "el valor leido en el local storage es : ",
      localStorage.getItem("imgArray")
    );
    console.log(JSON.parse(localStorage.getItem("imgArray")));
    let toR = JSON.parse(localStorage.getItem("imgArray"));
    if (toR) toR.forEach(element => element.hide());
    else toR = [];
    return toR;
  }

  function check(id1, id2) {
    console.log("Estoy aqui borracho y loco");
    const x = generateImage(id1);
    const y = generateImage(id2);
    setTimeout(function() {}, 500); //delay is in milliseconds
    if (x !== y) {
      backToDefault(id1);
      backToDefault(id2);
      _errores++;
    } else {
      //deberia aumentar un contador
      deletedArray.push(id1);
      deletedArray.push(id2);
      contFinish++;
      imgArray.push($(`#m${id1}`));
      imgArray.push($(`#m${id2}`));
      $(`#${id1}`).css("background-color", "transparent !important");
      $(`#${id2}`).css("background-color", "transparent !important");
      $(`#m${id1} `)
        .parent()
        .append('<div class="imgAux"/></div>');
      $(`#m${id2} `)
        .parent()
        .append('<div class="imgAux"/></div>');
      $(`#m${id1} `).hide();
      $(`#m${id2}`).hide();
      if (contFinish === 8) {
        clearInterval(myVar);
        winGame();
        //$(".card").hide();
        //document.getElementById("demo").innerHTML = "";
        alert(
          "terminaste el juego en : " +
            (seconds - 1) +
            " segundos y :" +
            _errores +
            " errores"
        );
      }
      //tengo que actualizar el local storage
    }
  }

  //vuelve a los valores por defecto
  function backToDefault(img1) {
    $(`#m${img1}`).hide();
    $(`#m${img1}`).attr("src", `images/default.png`);
    $(`#m${img1}`).fadeIn(200);
  }

  //Que hago cuando termino un nuevo juego...
  function winGame() {
    console.log("Bienvenido a la función win game ");
    $(".game").hide();
    let arrayAux = JSON.parse(localStorage.getItem("array"));
    console.log("El array del localStorage es : ", arrayAux);
    if (arrayAux.length < 10) {
      insertInLocalStorate(arrayAux);
    } else {
      //Estoy en el caso de que el arreglo tiene al menos 10 elmentos
      //Entonces chequeo que este dentro de las mejores posicones
      if (checkArrayAux(arrayAux)) insertInLocalStorate(arrayAux);
    }
    console.log("El arrayAux ordenado es  : ", arrayAux);
    let i;
    for (i = 0; i < arrayAux.length; i++) {
      $("#scores").append(
        `<tr> <td>${arrayAux[i].name}</td> <td>${arrayAux[i].time}</td><td>${arrayAux[i].errors}</td> </tr>`
      );
    }

    $(".finish").show();
  }

  $("#reset").click(function restartGame() {
    array = generateMemo();
    startGame = false;
    seconds = contFinish = _errores = 0;
    $(".imgAux").hide();
    //todos los que tenia escondido ahora son restaurados
    imgArray.forEach(element => {
      element.attr("src", `images/default.png`);
      element.fadeIn(500);
    });
  });

  function checkArrayAux(arrayAux) {
    let toR = false;
    const element = arrayAux[9];
    console.log("El elemento seleccionado es : ", element);
    if (element.time == seconds) if (element.errors > _errores) toR = true;
    if (element.time > seconds) toR = true;
    console.log("Estoy retornado : ", toR);
    return toR;
  }

  function generateMemo() {
    //arreglo con los elementos a insertar
    let arrayToIns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    //arreglo con las posiciones libres
    let posiciones = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let toR = new Array();

    console.log("Testeando el arreglo de posiciones");
    let aux = getPosicion(posiciones);
    console.log("La posicion seleccionada es : " + aux);
    //esto se podría hacer tranquilamente con un for
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

  function insertInLocalStorate(arrayAux) {
    let person = prompt(
      "Felicitaciones, estas dentro de las mejores puntuaciones,ingresa tu nombre:"
    );
    let toIns = { name: person, time: seconds - 1, errors: _errores };
    if (arrayAux.length == 10) arrayAux[9] = toIns;
    else arrayAux.push(toIns);
    //Ordeno el arreglo y Actualizo el local Storage
    let sortedArray = arrayAux.sort(function(a, b) {
      if (a.time > b.time) return 1;
      if (a.time === b.time) if (a.errors > b.errors) return 1;
      return -1;
    });
    //actualizo el localStorage
    localStorage.setItem("array", JSON.stringify(sortedArray));
  }

  //A veces hay que castear el elemento a int, aunque ya sea de tipo int...
  function generateImage(element) {
    //Modulo 8 así le asigna la misma imagen a dos posiciones
    console.log("-------------------------------------");
    console.log("el array es : ", array);
    console.log(
      "El array leido del local storage es : ",
      localStorage.getItem("array")
    );
    console.log("el elemento tiene id : " + element);
    console.log("el indice es : ", array.indexOf(parseInt(element, 10)));
    x = array.indexOf(parseInt(element, 10)) % 8;
    console.log("el x que estoy calculando es : " + x);
    console.log("-------------------------------------");
    return x;
  }
});
