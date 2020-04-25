var matriz_juego
var cantidad_targets_max
var cantidad_targets_actual
var cantidad_seleccionados
var timer_cronometro
var timer_generacion
var colores = ["#ff1100", "#eeff00", "#26ff00", "#00ffd0", "#0011ff", "#ff00bf"]

//Variables resultados.
var cantidad_errores
var deespawn_time
var promedio_diferencias
var puntaje_final
var tiempo_transcurrido

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
        deespawn_time[cantidad_seleccionados] = document.getElementById("cronometro").textContent

        cantidad_seleccionados++
    } else {
        cantidad_errores++;
    }


    if (cantidad_seleccionados == cantidad_targets_max) {
        fin_de_juego();
    }

}


function crear_grid(lim) {
    var anc_alt = 500 / (lim - 1) + "px"
    var grid_container = document.createElement("div")
    grid_container.setAttribute("class", "grid-container")
    grid_container.setAttribute("id", "tabla_juego")
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
    document.getElementById("container-tabla").appendChild(grid_container)


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
    //Creo el listado de clickeos
    deespawn_time = []

    //Hago desaparecer las partes de input y hago aparecer el cronometro:
    document.getElementById("container_inputs").style.display = "none"
    document.getElementById("cronometro").style.display = "block"
    document.getElementById("cronometro").style.visibility = "visible"
        //Inicializo el cronometro.
    document.getElementById("cronometro").textContent = "0.00"
    timer_cronometro = setInterval(actualizar_timer, 10)
        //Inicio la generacion de elementos segun dificultad elegida.
    if (dificultad == "1") {
        timer_generacion = setInterval(actualizar_elementos, 500)
    } else if (dificultad == "2") {
        timer_generacion = setInterval(actualizar_elementos, 450)
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
    var i_rand = Math.floor(Math.random() * (matriz_juego.length))
    var j_rand = Math.floor(Math.random() * (matriz_juego.length))

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

function mostrarResultados() {
    $('#modal_resultados').modal('show')
        //Muestro los elementos de a uno.
    setTimeout(() => { document.getElementById("item-modal-tiempo").style.visibility = "visible"; }, 2000);
    setTimeout(() => { document.getElementById("item-modal-errores").style.visibility = "visible"; }, 3000);
    setTimeout(() => { document.getElementById("item-modal-promedio").style.visibility = "visible"; }, 4000);
    setTimeout(() => { document.getElementById("item-modal-puntaje").style.visibility = "visible"; }, 6000);



}

function reinicio_juego() {
    //Vuelvo a habilitar todo lo de la pantalla principal
    document.getElementById("container_inputs").style.display = "block"
        //Saco el Modal y el boton de mostrar resultados.
    $('#modal_resultados').modal("hide")
    document.getElementById("resultados").style.visibility = "hidden"
    document.getElementById("item-modal-tiempo").style.visibility = "hidden";
    document.getElementById("item-modal-errores").style.visibility = "hidden";
    document.getElementById("item-modal-promedio").style.visibility = "hidden";
    document.getElementById("item-modal-puntaje").style.visibility = "hidden";


    //Vuelvo a habilitar los valores por defecto
    document.getElementById("tabla_juego").remove()


}

function fin_de_juego() {
    //Aca finalizo el juego.
    clearInterval(timer_cronometro)
    document.getElementById("resultados").style.visibility = "visible"
    document.getElementById("cronometro").style.display = "none"
    tiempo_transcurrido = document.getElementById("cronometro").textContent
    promedio_diferencias = promedio_apuntado()

    //Actualizo el modal con los puntajes.
    document.getElementById("tiempo_a_mostrar").textContent = tiempo_transcurrido + " seg."
    document.getElementById("errores_a_mostrar").textContent = cantidad_errores
    document.getElementById("promedio_a_mostrar").textContent = promedio_diferencias + " seg."

}


//La funcion calcula el promedio de las diferencias en el apuntado de un objetivo a otro
function promedio_apuntado() {
    //Genero un arreglo de diferencias
    var diff = []
    for (i = 0; i < deespawn_time.length - 1; i++) {
        var elem_i = parseFloat(deespawn_time[i])
        var elem_i1 = parseFloat(deespawn_time[i + 1])
        diff.push(parseFloat((elem_i1 - elem_i).toFixed(2)))
    }
    var suma = 0
    for (i = 0; i < diff.length; i++) {
        suma += diff[i]
    }

    return (suma / diff.length).toFixed(2)
}