class Cochera{
	constructor( cocherasAzules = [], cocherasRojas = [], cocherasAmarillas = []){
		this.cocheraAzul1=cocherasAzules.length > 0 ? cocherasAzules[0] : null;
		this.cocheraAzul2=cocherasAzules.length > 1 ? cocherasAzules[1] : null;
		this.cocheraAzul3=cocherasAzules.length > 2 ? cocherasAzules[2] : null;
		this.cocheraAzul4=cocherasAzules.length > 3 ? cocherasAzules[3] : null;
		this.cocheraAzul5=cocherasAzules.length > 4 ? cocherasAzules[4] : null;
		this.cocheraRoja1=cocherasRojas.length > 0 ? cocherasRojas[0] : null;
		this.cocheraRoja2=cocherasRojas.length > 1 ? cocherasRojas[1] : null;
		this.cocheraRoja3=cocherasRojas.length > 2 ? cocherasRojas[2] : null;
		this.cocheraRoja4=cocherasRojas.length > 3 ? cocherasRojas[3] : null;
		this.cocheraRoja5=cocherasRojas.length > 4 ? cocherasRojas[4] : null;
		this.cocheraAmarilla1=cocherasAmarillas.length > 0 ? cocherasAmarillas[0] : null;
		this.cocheraAmarilla2=cocherasAmarillas.length > 1 ? cocherasAmarillas[1] : null;
		this.cocheraAmarilla3=cocherasAmarillas.length > 2 ? cocherasAmarillas[2] : null;
		this.cocheraAmarilla4=cocherasAmarillas.length > 3 ? cocherasAmarillas[3] : null;
	}

	pintarCochera(){
		var cochera='<div id="cochera" class="d-flex justify-content-between">';
		cochera+=this.pintarCocheraIzquierda();
		cochera+=this.pintarCocheraDerecha();
		cochera+='</div>';
		return cochera;
	}

	pintarCocheraIzquierda(){
		var cocheraIzq='<div id="cochera-izq" class="d-flex flex-column">';
		cocheraIzq+=this.pintarEspacios(1,7);
		cocheraIzq+='</div>';
		return cocheraIzq;
	}

	pintarCocheraDerecha(){
		var cocheraDer='<div id="cochera-der" class="d-flex flex-column">';
		cocheraDer+=this.pintarEspacios(8,14);
		cocheraDer+='</div>';
		return cocheraDer;
	}

	pintarEspacios(inicio, fin){
		var espacios='';
		for (var i = inicio; i <= fin; i++) {
			espacios+='<div class="espacio-cochera"><svg height="100%" width="100%"><line x1="0" y1="0" x2="100%" y2="0" style="stroke:white;stroke-width:4" />'
			//Pinta la ultima linea
			if(i == fin){
				espacios+='<line x1="0" y1="100%" x2="100%" y2="100%" style="stroke:white;stroke-width:4" />';
			}
			switch (i) {
			  case this.cocheraRoja1:
			  case this.cocheraRoja2:
			  case this.cocheraRoja3:
			  case this.cocheraRoja4:
			  case this.cocheraRoja5:
			    //Pinta el espacio donde debe estacionar un auto rojo
			    espacios+=this.pintarCocheraRoja();
			    break;
			  case this.cocheraAzul1:
			  case this.cocheraAzul2:
			  case this.cocheraAzul3:
			  case this.cocheraAzul4:
			  case this.cocheraAzul5:
			    //Pinta el espacio donde debe estacionar un auto azul
			    espacios+=this.pintarCocheraAzul();
			    break;
			  case this.cocheraAmarilla1:
			  case this.cocheraAmarilla2:
			  case this.cocheraAmarilla3:
			  case this.cocheraAmarilla4:
			    //Pinta el espacio donde debe estacionar un auto amarillo
			    espacios+=this.pintarCocheraAmarilla();
			    break;
			}
            espacios+='</svg></div>'
		}
		return espacios;
	}

	pintarEspacioCochera(color){
		var pintura='<rect x="10%" y="10%" width="80%" height="80%" rx="20" ry="20"style="fill:'+color+';opacity:0.8" />';
		return pintura;
	}
	pintarCocheraRoja(){
		return this.pintarEspacioCochera('#E65854');
	}
	pintarCocheraAzul(){
		return this.pintarEspacioCochera('#80DEEA');
	}
	pintarCocheraAmarilla(){
		return this.pintarEspacioCochera('#FFD302');
	}
}
