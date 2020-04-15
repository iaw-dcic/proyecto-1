function crear_tabla() {
    var tbl = document.getElementById('tabla_juego')
    var tbody = document.createElement('tbody')
        //Creo 5 filas y 5 columnas.
    for (var i = 0; i < 5; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 5; j++) {
            var td = document.createElement('td');
            //Agrego el boton a cada uno.
            var but = crear_boton_tabla();
            td.appendChild(but)
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    tbl.appendChild(tbody)
}


function crear_boton_tabla() {
    var salida = document.createElement('button')

    return salida





}



crear_tabla()