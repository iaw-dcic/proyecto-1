
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



