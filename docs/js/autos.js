class Autos{
	constructor(autos,claseExtra){
		this.autos=autos;
		this.claseExtra=claseExtra;
	}

	crearAutos(){
		var autos='<div id="autos" class="d-flex '+this.claseExtra+'" data-clases="d-flex">';
		switch (this.autos) {
			case 1:
			    //Crea un auto azul
			    autos+='<div id="azul" class="auto"> <div class="auto-azul-bg"></div> </div>';
			    break;
		  	case 2:
			    //Crea un auto azul y un auto rojo
			    autos+='<div id="azul" class="auto"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div id="rojo" class="auto"> <div class="auto-rojo-bg"></div> </div>';
			    break;
		  	case 3:
			    //Crea un auto azul, un auto rojo y un auto amarillo
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    break;
		  	case 4:
			    //Crea dos autos azules, un auto rojo y un auto amarillo
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    break;
		  	case 5:
			    //Crea tres autos azules, un auto rojo y un auto amarillo
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    break;
			case 6:
			    //Crea dos autos azules, dos autos rojos y dos autos amarillos
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    break;
			case 7:
			    //Crea dos autos azules, tres autos rojos y dos autos amarillos
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    break;
			case 8:
			    //Crea tres autos azules, tres autos rojos y dos autos amarillos
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    break;
			case 9:
			    //Crea tres autos azules, tres autos rojos y tres autos amarillos
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    break;
			case 14:
			    //Crea cinco autos azules, cinco autos rojos y cuatro autos amarillos
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    autos+='<div class="auto azul" data-clases="auto azul"> <div class="auto-azul-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    autos+='<div class="auto amarillo" data-clases="auto amarillo"> <div class="auto-amarillo-bg"></div> </div>';
			    autos+='<div class="auto rojo" data-clases="auto rojo"> <div class="auto-rojo-bg"></div> </div>';
			    break;
		}
		autos+='</div>';
		return autos;
	}

}
