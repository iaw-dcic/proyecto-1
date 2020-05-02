class level{
    constructor(palabras,height,width){
        this.palabras=palabras;
        this.height=height;
        this.width=width;
        this.grid=this.generarGrilla(palabras,height,width);
    }
    generarGrilla(palabras,height,width){
        var grid;
        var ws=wordsearch(palabras, height, width);
        while(ws.unplaced.length > 0){
            ws=wordsearch(palabras, height, width);
        }
        return ws.grid;
    }

}