// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Comienza siempre el jugador X
var player = "X";

// Tablero en 0
var tablero = ["0","0","0","0","0","0","0","0","0"];

// Dark mode
var dark_mode = false;

// Las posibles conbinaciones ganadoras
var combGanadoras = [[1,2,3], [4,5,6], [7,8,9],		//Horizontales
										 [1,5,9], [7,5,3],						//Cruzadas
										 [1,4,7],[2,5,8], [3,6,9]];		//Verticales
//-------------------------------------------------------------------------

// Control de jugada ganadora
function CheckearJugada() {
	let resultado = 0;
	let num1, num2, num3;
	//itero en cada una de las jugadas ganados y checkeo si estan marcadas con el mismo player
	for (var i = 0; i < combGanadoras.length; i++) {
		num1 = combGanadoras[i][0]-1;
		num2 = combGanadoras[i][1]-1;
		num3 = combGanadoras[i][2]-1;
		if (tablero[num1] == tablero[num2] && tablero[num1] == tablero[num3] && tablero[num1] != 0) { //si hay jugada ganadora
			resultado = 1;	//cambio el valor del resultado a verdadero
			continue; //rompo el for
		}
	}
	return resultado; //retorno si hay ganador 0=falso 1=true
}

// Funcion para manejo de los mensajes
//pueden ser mensaje ganador, empate o mensaje de jugada ya hecha
function AbrirMensaje(mensaje, textoBoton) {
	document.getElementById("mensaje-texto").innerHTML = mensaje;
	document.getElementById("mensaje-boton").innerHTML = textoBoton;
	document.getElementById("pop-up").style.display = "flex";
}

// Funcion para cerrar el pop-up.
//El mensaje puede ser:
// 											Seguir(en caso de que sea jugada ya hecha)
//											Reiniciar( en caso de que haya ganador o empate)
function CerrarMensaje() {
	if (document.getElementById("mensaje-boton").textContent == 'Reiniciar Juego') {
		window.location.reload();
	}
	document.getElementById("pop-up").style.display = "none";
}

// funcion para marcar el tablero.
function Marcar(index) {
	if (tablero[index] != "0") {//si el elemento esta marcado, abre el pop-up
		AbrirMensaje("Elemento ya marcado", "Seguir");
		return;
	}
	document.getElementById("casilla-"+index).innerHTML = player; //pongo X o O segun player
	var tempPlayer = player;
	if (player == "X") {	//jugador X
		tablero[index] = "1";																												//marco el tablero
		document.getElementById("casilla-"+index).style.backgroundColor = "red"; 		//pinto en rojo
		player="O"; 																																//cambio el turno
		document.getElementById("player").innerHTML = "Juega Jugador " + player;		//cambio mensaje
	} else {   //Jugador O
		tablero[index] = "2";																												//marco el tablero
		document.getElementById("casilla-"+index).style.backgroundColor = "green";	//pinto en verde
		player = "X";																																//cambio player
		document.getElementById("player").innerHTML = "Juega Jugador " + player;		//cambio mensaje
	}
	localStorage.setItem("tablero", tablero);																			//Guardo tablero
	localStorage.setItem("player", player);																				//Guardo player
	var result = CheckearJugada();																								//Checkea si hay ganador
	if (result == 1) {
		AbrirMensaje("Ganador Jugador "+tempPlayer+"!", "Reiniciar Juego");					//Si hay ganador abre pop-up con ganador y da opcion de reiniciar
		Reiniciar();																																//Reinicia el juego por si refresca pagina (se rompe todo sino)
	}	else if (tablero.includes("0") == false) {
		AbrirMensaje("Empate", "Reiniciar Juego");																	//Mensaje de empate
		Reiniciar();																																////Reinicia el juego por si refresca pagina (se rompe todo sino)
	}
}



//Reiniciar juego
function Reiniciar(){
	for (var i = 0; i < tablero.length; i++) {  //pinto todo de celeste y elimino el texto asociado.Tambien reseteo la pos del tablero
			document.getElementById("casilla-"+i).style.backgroundColor = "lightblue";
			document.getElementById("casilla-"+i).innerHTML = "";
			tablero[i] = "0";
	}
	player = "X";																				//por defecto X siempre inicia el juego
	localStorage.setItem("tablero", tablero);						//guardo tablero
	localStorage.setItem("player", player);							//guardo jugador

}


// Guardar estado
function CargarTablero(tableroAux) {
	for (var i = 0; i < tableroAux.length; i++) {
		if (tableroAux[i] == "1") {
			document.getElementById("casilla-"+i).style.backgroundColor = "red";
			document.getElementById("casilla-"+i).innerHTML = "X";
		} else if (tableroAux[i] == "2"){
			document.getElementById("casilla-"+i).style.backgroundColor = "green";
			document.getElementById("casilla-"+i).innerHTML = "O";
		}
	}
}
function Dark(){
	aux = localStorage.getItem("dark_mode");
	if (aux == "true"){
		dark_mode = false;
		document.getElementById("dark-mode").innerHTML = "Activar Dark Mode";
	}else {
		dark_mode = true;
		document.getElementById("dark-mode").innerHTML = "Desactivar Dark Mode";
	}
	localStorage.setItem("dark_mode", dark_mode);
}

window.onload=function(){			//funcion al cargar la pagina
				if(localStorage.getItem("tablero")!=null){																	//checkeo si hay algo guardado previamente
					tablero = localStorage.getItem("tablero").split(",");											//convierto el tablero
					CargarTablero(tablero);																										//inicializa con el tablero antes guardado
					player = localStorage.getItem("player");																	//inicializo el player antes guardado
					dark_mode = localStorage.getItem("dark_mode");
					if (dark_mode == "true"){
							document.documentElement.classList.toggle('dark-mode')
							document.getElementById("dark-mode").innerHTML = "Desactivar Dark Mode";
					}
					document.getElementById("player").innerHTML = "Juega Jugador " + player;	//cambio el cartel de quien juega
				}

}
