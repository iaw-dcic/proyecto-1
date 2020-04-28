var ws= wordsearch(['aaaaa'],5,5 );

function dibujarGrilla(/*el,*/ puzzle) {
      
  var output = '';
  // for each row in the puzzle
  for (var i = 0, height = puzzle.length; i < height; i++) {
    // append a div to represent a row in the puzzle
    var row = puzzle[i];
    output += '<div>';
    // for each element in that row
    for (var j = 0, width = row.length; j < width; j++) {
        // append our button with the appropriate class
        output += '<button class="botonGrilla" x="' + j + '" y="' + i + '">';
        output += row[j] || '&nbsp;';
        output += '</button>';
    }
    // close our div that represents a row
    output += '</div>';
  }
  return output;
  //$(el).html(output);
}
$('#Grilla').html(dibujarGrilla(ws.grid));

