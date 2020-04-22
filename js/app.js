var matriz_juego
var cantidad_targets_max
var cantidad_targets_actual
var cantidad_seleccionados
var timer_cronometro
var timer_generacion
var colores = ["#ff1100", "#eeff00", "#26ff00", "#00ffd0", "#0011ff", "#ff00bf"]
var cantidad_errores

function pressedButton() {

    if (cantidad_seleccionados == cantidad_targets_max) {
        return false
    }

    cell_id = event.target.id
    var boton = document.getElementById(cell_id);


    //Dado un id "c12-12"
    //Recupero el indice de la matriz
    var id_recortado = cell_id.substring(1, cell_id.length).split("-")

    var i = parseInt(id_recortado[0]) - 1
    var j = parseInt(id_recortado[1]) - 1
    if (matriz_juego[i][j] == 1) {
        boton.style.backgroundColor = '#cccbc8'
        matriz_juego[i][j] = 0
        cantidad_seleccionados++
    } else {
        cantidad_errores++;
    }


    if (cantidad_seleccionados == cantidad_targets_max) {
        clearInterval(timer_cronometro)
            //Aca finalizo el juego.
        console.log("Errores cometidos:" + cantidad_errores)
        console.log("Tiempo total: " + cronometro.textContent)
        document.getElementById("resultados").style.visibility = "visible"
       // document.getElementById("cronometro").style.display = "none"
    }

}


function crear_grid(lim) {
    var anc_alt = 500 / (lim - 1) + "px"
    var grid_container = document.getElementById("tabla_juego");
    for (i = 1; i < lim; i++) {
        var grid_row = document.createElement('div');
        grid_row.className = "grid-row"
        for (j = 1; j < lim; j++) {
            var grid_cell = document.createElement('div');
            grid_cell.className = "grid-cell";
            var id_cell = "c" + i + "-" + j;
            grid_cell.id = id_cell
            grid_cell.style.height = anc_alt
            grid_cell.style.width = anc_alt
            grid_cell.backgroundColor = "grey"
            grid_cell.addEventListener("click", pressedButton, false)
            grid_row.appendChild(grid_cell)
        }
        grid_container.appendChild(grid_row);
        grid_row = null
    }


}

function comienzoJuego() {
    cantidad_targets_max = parseInt(document.getElementById("targets").value)
    cantidad_targets_actual = 0
    cantidad_seleccionados = 0
    cantidad_errores = 0
        //Creo la grid
    var lim
    var dificultad = document.getElementById("dificultad_juego").value
    if (dificultad == "1") {
        lim = 6
    } else if (dificultad == "2") {
        lim = 11
    } else if (dificultad == "3") {
        lim = 16
    }
    crear_grid(lim)

    //Creo la matriz de la logica del juego
    matriz_juego = [];
    for (var i = 0; i < lim - 1; i++) {
        matriz_juego[i] = new Array(lim - 1);
        for (var j = 0; j < lim - 1; j++) {
            matriz_juego[i][j] = 0;
        }
    }


    //Hago desaparecer las partes de input y hago aparecer el cronometro:
    document.getElementById("input_cant").style.display = "none"
    document.getElementById("input_dif").style.display = "none"
    document.getElementById("cronometro").style.visibility = "visible"
        //Inicializo el cronometro.
    timer_cronometro = setInterval(actualizar_timer, 10)
        //Inicio la generacion de elementos segun dificultad elegida.
    if (dificultad == "1") {
        timer_generacion = setInterval(actualizar_elementos, 1000)
    } else if (dificultad == "2") {
        timer_generacion = setInterval(actualizar_elementos, 600)
    } else if (dificultad == "3") {
        timer_generacion = setInterval(actualizar_elementos, 400)
    }



}

function actualizar_timer() {
    var cronometro = document.getElementById("cronometro");
    var tiempo = (parseFloat(cronometro.textContent) + 0.01).toFixed(2)
    cronometro.textContent = tiempo
}


function actualizar_elementos() {


    //Elijo un elemento random
    var i_rand = Math.floor(Math.random() * (matriz_juego.length - 1))
    var j_rand = Math.floor(Math.random() * (matriz_juego.length - 1))

    if (matriz_juego[i_rand][j_rand] == 0) {
        //Si la celda esta libre, le pongo un cuadradito
        matriz_juego[i_rand][j_rand] = 1;
        var color_rand = Math.floor(Math.random() * (colores.length - 1))
        document.getElementById("c" + (i_rand + 1) + "-" + (j_rand + 1)).style.backgroundColor = colores[color_rand];
        cantidad_targets_actual++;
    }


    if (cantidad_targets_actual >= cantidad_targets_max) {
        clearInterval(timer_generacion)
    }

}