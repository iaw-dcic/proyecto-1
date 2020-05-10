function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // mientras hayan elementos para mezclar
    while (0 !== currentIndex) {
  
      // elijo uno
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // swap
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
class Level{
    
    constructor(palabras,height,width,cant,opciones){
        this.palabras=palabras;
        this.height=height;
        this.width=width;
        this.draftedWords=this.draftearPalabras(palabras,cant)
        this.grid=this.generarGrilla(this.draftedWords,height,width,opciones);
    }

    generarGrilla(palabras,height,width,opciones){
        var ws=wordsearch(palabras, height, width,opciones);
        while(ws.unplaced.length > 0){
            ws=wordsearch(palabras, height, width,opciones);
        }
        return ws.grid;
    }
    //dadas unas palabras y una cantidad
    //me hace una seleccion al azar de cant palabras
    draftearPalabras(palabras,cant){
        var toRet=[];
        palabras=shuffle(palabras);
        var pickedWord;
        var i=0;
        while(cant !== 0){ // mientras no haya elegido la cantidad de palabras que me pide el nivel
            pickedWord=palabras[i];
            if((pickedWord!=null) && (Math.floor(Math.random()*10)<=5)){ //con una prob de 0.5 elijo una palabra
                toRet.push(pickedWord);
                cant--;
                palabras[i]=null;
                i++;
            }
            i=(i<palabras.length-1)?i+1:0;//si llegue al final, vuelvo al principio
        }
        return toRet;
    }
    
}
