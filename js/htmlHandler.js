
var words = ['quique', 'tirame', 'feedback', 'todavia','falta','igual'];
var ws = wordsearch(words, 15, 15);

var dibujarGrilla=function (puzzle) {

  var output = '';
  // for each row in the puzzle
  for (var i = 0, height = puzzle.length; i < height; i++) {
    // append a div to represent a row in the puzzle
    var row = puzzle[i];
    output += '<div class="row justify-content-center">';
    // for each element in that row
    for (var j = 0, width = row.length; j < width; j++) {
      output += '<div class="cols-2">';
      // append our button with the appropriate class
      output += '<button class="botonGrilla" x="' + j + '" y="' + i + '">';
      output += row[j] || '&nbsp;';
      output += '</button></div>';
    }
    // close our div that represents a row
    output += '</div>';
  }
  $('#Grilla').html(output);
};

var dibujarPalabras=function (palabras) {
  var palabraMayus;
  var output = '<h5>Palabras</h5><ul class="list-group">';
  for (var i = 0; i < palabras.length; i++){
    palabraMayus=palabras[i].toUpperCase();
    output += '<li class="list-group-item" id="'+palabras[i]+'">' + palabraMayus + '</li>';
  }
  output += '</ul>';
  $('#Palabras').html(output);
};
var agregarProp=function(clase,prop){
    $(clase).addClass(prop);
};
var cambiarColor=function(celda,numero){
  var found='found'+numero;
  $(celda).removeClass('selected');
  $(celda).attr('id', found);
}
var getAtributo=function(clase,atributo){
   return $(clase).attr(atributo);
}
var delProp=function(clase,prop){
    $(clase).removeClass(prop);
}
var seleccionarPalabra=function(palabra){
    var palabraID='#'+palabra;
    $(palabraID).toggleClass('list-group-item list-group-item disabled');
};
var toggleMode=function(){
  $('body').toggleClass('dark');
  $('#switch').toggleClass('active')
  $('#mainNav').toggleClass('navbar-dark bg-dark');
  var pathImgDarkMode='svg/sopaYellow.svg';
  var pathImgLightMode='svg/sopaBlack.svg';
  var pathCorrecto=$('body').hasClass('dark')?pathImgDarkMode:pathImgLightMode
  $('#brandsvg').attr('src',pathCorrecto);
};
var cambiarCarousel=function(to){
  $("#carouselNivel").carousel(parseInt(to));
};
var prevCarousel=function(){
  $("#carouselNivel").carousel("prev");
};
var nextCarousel=function(){
  $("#carouselNivel").carousel("next");
};
var carouselChangeHandler=function(event){
  botonSelector='#linkNavN'+event.to;
  $('li.nav-item.active').toggleClass('active');
  $(botonSelector).toggleClass('active');
  $("#carouselNivel").carousel("pause");
};

dibujarGrilla(ws.grid);
dibujarPalabras(words);

/*


*/
