$(document).ready(function() {
  checkFinish();
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

    if (clicked != selectedId && !deletedArray.includes(clicked)) {
      showSelected(clicked);
      setTimeout(function() {}, 500); //delay is in milliseconds
      if (selectedId > -1) {
        //Estoy en el caso de que hay dos seleccionados
        window.setTimeout(check, 500, selectedId, clicked);
        selectedId = -1;
      } else selectedId = clicked;
    }
  });

  $("#goback").click(() => {
    setFinish(false);
    location.reload();
  });

  function setDarkStyle() {
    $("head").append(
      '<link id="cSel" rel="stylesheet" href="css/dark.css" type="text/css" />'
    );
    if (contFinish === 8) location.reload();
  }

  function setInitialState() {
    let aux = JSON.parse(localStorage.getItem("style"));
    if (aux === true) {
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

  function check(id1, id2) {
    const x = generateImage(id1);
    const y = generateImage(id2);
    setTimeout(function() {
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
          localStorage.setItem("seconds", seconds);
          localStorage.setItem("errores", _errores);
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
    }, 200); //delay is in milliseconds
  }

  //vuelve a los valores por defecto
  function backToDefault(img1) {
    $(`#m${img1}`).hide();
    $(`#m${img1}`).attr("src", `images/default.png`);
    $(`#m${img1}`).fadeIn(200);
  }

  //Que hago cuando termino un nuevo juego...
  function winGame() {
    setFinish(true);
    winGame = true;
    $(".game").hide();
    let arrayAux = JSON.parse(localStorage.getItem("array"));
    if (arrayAux.length < 10) {
      insertInLocalStorate(arrayAux);
    } else {
      //Estoy en el caso de que el arreglo tiene al menos 10 elmentos
      //Entonces chequeo que este dentro de las mejores posicones
      if (checkArrayAux(arrayAux)) insertInLocalStorate(arrayAux);
    }
    insterInPositionsTable();

    $(".finish").show();
  }

  function insterInPositionsTable() {
    let i;
    let arrayAux = JSON.parse(localStorage.getItem("array"));
    for (i = 0; i < arrayAux.length; i++) {
      $("#scores").append(
        `<tr> <td>${arrayAux[i].name}</td> <td>${arrayAux[i].time}</td><td>${arrayAux[i].errors}</td> </tr>`
      );
    }
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
    if (element.time == seconds) if (element.errors > _errores) toR = true;
    if (element.time > seconds) toR = true;
    return toR;
  }

  function generateMemo() {
    //arreglo con los elementos a insertar
    let arrayToIns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    //arreglo con las posiciones libres
    let posiciones = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let toR = new Array();

    let aux = getPosicion(posiciones);
    //esto se podría hacer tranquilamente con un for
    arrayToIns.forEach(element => {
      //obteno la posicion a insertar
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
    let min = array[0];
    array.forEach(element => {
      if (Math.abs(element - x) < Math.abs(min - x)) min = element;
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
    x = array.indexOf(parseInt(element, 10)) % 8;
    return x;
  }

  function setFinish(finish) {
    localStorage.setItem("finish", finish);
  }

  function checkFinish() {
    let aux = JSON.parse(localStorage.getItem("finish"));

    if (aux === true) {
      insterInPositionsTable();
      $(".game").hide();
      $(".finish").show();
    } else $(".finish").hide();
  }
});
