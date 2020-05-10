//there is 8 types of borders
//4 for each side top bottom left right
//and 4 for the corners, I make this distintion for the border-radius
function getBorderIndicator(j,i,boundx,boundy){
  let borderIndicator;
  if(j==0 && i==0){
    borderIndicator='botonGrilla cornerTopLeft';
  }
  else{
    if(j==boundx-1 && i==0){
      borderIndicator='botonGrilla cornerTopRight';
    }
    else{
      if(j==0 && i==boundy-1){
        borderIndicator='botonGrilla cornerBottomLeft';
      }
      else{
        if(j==boundx-1 && i==boundy-1){
          borderIndicator='botonGrilla cornerBottomRight';
        }
        else{
          if(i==0){
            borderIndicator='botonGrilla topBordered';
          }
          else{
            if(i==boundy-1){
              borderIndicator='botonGrilla bottomBordered';
            }
            else{
              if(j==0){
                borderIndicator='botonGrilla leftBordered';
              }
              else{
                if(j==boundx-1){
                  borderIndicator='botonGrilla rightBordered';
                }
                else{
                  borderIndicator='botonGrilla';
                }
              }
            }
          }
        }
      }
    }
  }
  return borderIndicator;
}
var dibujarGrilla=function (puzzle,grilla) {
  let str='#Grilla'+grilla;
  let borderIndicator;
  var output = '';
  for (var i = 0, height = puzzle.length; i < height; i++) {
    var row = puzzle[i];
    output += '<div class="row justify-content-center">';
    for (var j = 0, width = row.length; j < width; j++) {
      borderIndicator=getBorderIndicator(j,i,row.length,puzzle.length);//
      output += '<div class="cols-2">';
      output += '<button class="'+ borderIndicator +'" x="' + j + '" y="' + i + '">';
      output += row[j] || '&nbsp;';
      output += '</button></div>';
    }
    output += '</div>';
  }
  $(str).html(output);
};

var dibujarPalabras=function (palabras,grilla) {
  let str='#Palabras'+grilla;
  var palabraMayus;
  var output = '<h5>Palabras</h5><ul class="list-group">';
  for (var i = 0; i < palabras.length; i++){
    palabraMayus=palabras[i].toUpperCase();
    output += '<li class="list-group-item" id="'+palabras[i]+'">' + palabraMayus + '</li>';
  }
  output += '</ul>';
  $(str).html(output);
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
  if(actualLevel==0)
    actualLevel=3;
  else
    actualLevel--;
};
var nextCarousel=function(){
  $("#carouselNivel").carousel("next");
  if(actualLevel==3)
    actualLevel=0;
  else
    actualLevel++;
};
var carouselChangeHandler=function(event){
  botonSelector='#linkNavN'+event.to;
  actualLevel=event.to;
  $('li.nav-item.active').toggleClass('active');
  $(botonSelector).toggleClass('active');
  $("#carouselNivel").carousel("pause");
};
