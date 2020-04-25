

let pass = '';

let score = 0;

const resultado = {
	puntaje : 0,
	complejidad : "Baja"
}

function actualizar() {

	pass = document.getElementById("password").value;

	score = 0;

	var longitud = pass.length;

	procesar(longitud, longitud*4,"cantCaracteres","puntosLongitud");

	var cant = contarMayusculas(pass);
	procesar(cant,(longitud-cant)*2,"cantMayusculas","puntosMayusculas");

	cant = contarMinusculas(pass);
	procesar(cant,(longitud-cant)*2,"cantMinusculas","puntosMinusculas");

	cant = contarNumeros(pass);
	procesar(cant,puntosNumeros(pass)*cant*4,"cantNumeros","puntosNumeros");

	cant = contarSimbolos(pass);
	procesar(cant,cant*6,"cantSimbolos","puntosSimbolos");

	cant = minReq(pass);
	procesar(cant,cant*2,"cantRequerimientos","puntosRequerimientos");

}

function procesar(cantidad, puntos, idCantidad, idPuntos) {
	var celda = document.getElementById(idCantidad);
	celda.innerHTML = cantidad;

	celda = document.getElementById(idPuntos);
	if(cantidad>0){
		celda.innerHTML = puntos;
		score+=puntos;
	}
	else {
		celda.innerHTML = 0;
		
	}

	celda = document.getElementById("puntaje");
	celda.innerHTML = score;

	console.log(puntos);
}

function puntosNumeros(pass) {
	for(var i = 0; i<pass.length; i++) {
		if(isNaN(pass[i]))
			return 1;
	}
	return 0;
}

function minReq(pass){
	var cant = 0;

	if(pass.length>=8){
		cant++;
		if(contarMinusculas(pass)>0)
			cant++;
		if(contarMayusculas(pass)>0)
			cant++;
		if(contarSimbolos(pass)>0)
			cant++;
		if(contarNumeros(pass)>0)
			cant++;
	}

	if(cant < 4) 
		return 0;

	return cant;
}

// HASTA ACÁ LAS FUNCIONES IMPORTANTES 

function contarLetras(text) {
	const cant =  contarMayusculas(text) + contarMinusculas(text);
	return cant;
}

function contarMinusculas(text) {
 	var minusculas = "abcdefghijklmnopqrstuvwxyz";
 	var cant = 0;
	for (var i = 0; i < minusculas.length; i++) {
 		for (var x = 0; x < text.length; x++) {
 			if(text[x]==minusculas[i]){
 				cant++;
     		}
   		}
 	}

 	return cant;
}

function contarMayusculas(text) {
	var mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	var cant = 0;
	for (var i = 0; i < mayusculas.length; i++) {
 		for (var x = 0; x < text.length; x++) {
 			if(text[x]==mayusculas[i]){
 				cant++;
     		}
   		}
 	}
	return cant;
}

function contarNumeros(text) {
	var cant = 0;
	for(var i = 0; i<text.length; i++) {
		if(!isNaN(text[i]))
			cant++;
	}
	return cant;
}

function contarSimbolos(text) {
	var cant = 0;
	for(var i = 0; i<text.length; i++) {
		if(isNaN(text[i]))
			cant++;
	}
	return cant - contarLetras(text);
}

function contarSYNmedio(text) {
	var cant = 0;

	for(var i = 1; i<text.length-1; i++){
		if(isNaN(text[i])){
			cant++;
		}//NO SE COMO HACER ESTO
	}

	return cant;
}

function visibilidad() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function guardarContra(){

	const storage = localStorage.getItem('GUARDADAS');

	const guardar = {
		pass,
		resultado
	};

	if (storage == null){
		const guardadas = [];
		guardadas.push(guardar);
		localStorage.setItem('GUARDADAS',JSON.stringify(guardadas));
	}

	else{
		const guardadas = JSON.parse(storage);
		if(guardadas.length === 5){
			guardadas.shift();
		}
		guardadas.push(guardar);
		localStorage.removeItem('GUARDADAS');
		localStorage.setItem('GUARDADAS',JSON.stringify(guardadas));
	}
}



