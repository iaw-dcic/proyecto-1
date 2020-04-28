
var words = ['tupac', 'eazy', 'biggie', 'nas'];
var ws = wordsearch(words, 6, 6);

function getHTMLgrilla(puzzle) {

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
  return output;
}

function getHTMLPalabras(palabras) {
  var output = '<ul class="list-group">';
  for (var i = 0; i < palabras.length; i++){
    output += '<li class="list-group-item">' + palabras[i].toUpperCase() + '</li>';
  }
  output += '</ul>';
  return output;
}

$('#Grilla').html(getHTMLgrilla(ws.grid));
$('#Palabras').html(getHTMLPalabras(words));

