
function visibilidad() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function guardarDatos(){

	const storage = localStorage.getItem('GUARDADAS');

	var resultado = {
		puntaje : document.getElementById("puntaje"),
		complejidad : document.getElementById("complejidad")
	}

	var guardar = {
		pass : document.getElementById("password").value,
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

function generarTabla() {

   const tabla = document.getElementById('tablaGuardadas');
    const guardadas = JSON.parse(window.localStorage.getItem('GUARDADAS'));
    if (guardadas != null){
        for(i=0; i<guardadas.length; i++) {
            const trOpen = '<tr>';
            const fCell = '<td>' + parseInt(i+1, 10) + '</td>';
            const sCell = '<td>' + guardadas[i].pass + '</td>';
            const tCell = '<td>' + guardadas[i].resultado.puntaje + '</td>';
            const cCell = '<td>' + guardadas[i].resultado.complejidad + '</td>';
            const trClose = '</tr>';
            const celdas = fCell + sCell + tCell + cCell;
            tabla.innerHTML += trOpen + celdas + trClose;
        }
    } else {
        const trOpen = '<tr>';
        const fCell = '<td>-</td>';
        const sCell = '<td>-</td>';
        const tCell = '<td>-</td>';
        const cCell = '<td>-</td>';
        const trClose = '</tr>';
        const celdas = fCell + sCell + tCell + cCell;
        tabla.innerHTML = trOpen + celdas + trClose;
    }
}

function borrar(){}



