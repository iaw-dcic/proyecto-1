$(document).ready(function() {
  var aux = "";
  var hideComponent;
  var cont = 0;

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
