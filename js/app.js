
function visibilidad() {
  var x = document.getElementById("password");
  mostrar(x);
}

function mostrar(pos){
  if(pos!= null){
    if (pos.type === "password") {
      pos.type = "text";
    } else {
      pos.type = "password";
    }
  }
}


function guardarDatos(){

	const storage = localStorage.getItem('GUARDADAS');

	var guardar = {
		pass : document.getElementById("password").value,
		puntaje : document.getElementById("resultados").rows[1].cells[0].innerHTML,
    complejidad : document.getElementById("resultados").rows[1].cells[1].innerHTML
	};

  if(guardar.pass.length > 0 ){

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
}

function cargarDatos() {

   const tabla = document.getElementById('tabla-guardadas');
    const guardadas = JSON.parse(window.localStorage.getItem('GUARDADAS'));
    const pass = "pass";
    if (guardadas != null){
        for(i=0; i<guardadas.length; i++) {
            const trOpen = '<tr>';
            const fCell = '<td>' + parseInt(i+1, 10) + '</td>';
            const verCell = '<td> <input type="checkbox" onclick="mostrar('+pass+i+')"/></td>';
            const sCell = '<td>' +'<input id="pass'+i+'" class="transparente" type="password" value="'+guardadas[i].pass+'" disabled></td>';
            const tCell = '<td>' + guardadas[i].puntaje + '</td>';
            const cCell = '<td>' + guardadas[i].complejidad + '</td>';
            const trClose = '</tr>';
            const celdas = fCell + verCell + sCell + tCell + cCell;
            tabla.innerHTML += trOpen + celdas + trClose;            
        }
    } else {
        const trOpen = '<tr>' + "No hay contraseñas guardadas";
        const fCell = '<td>-</td>';
        const sCell = '<td>-</td>';
        const tCell = '<td>-</td>';
        const cCell = '<td>-</td>';
        const trClose = '</tr>';
        const celdas = fCell + sCell + tCell + cCell;
        tabla.innerHTML = trOpen + celdas + trClose;
    }
}

function redireccionar(pagina){
  window.location.href = pagina;
}



