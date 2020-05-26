let nivel = 'acosta';
var nombre = 'anonimo';
var lista = [];


//recupero la lista de los mejores 5 ususarios

function recuperar() {
    var listaJSON = localStorage.getItem("listas");
    lista = JSON.parse(listaJSON);
}

//almaceno la lista de los mejores 5 ususarios

function almacenar() {
    var jsonLista = JSON.stringify(lista);
    localStorage.setItem("listas", jsonLista);
}

function actualizarTabla() {
    let res = document.querySelector('#res');
    res.innerHTML = '';
    lista.forEach(element => {
        res.innerHTML += `
                <tr>
                <td>${element.nombre}</td>
                <td>${element.goles}</td>
                <tr>
            `
    });
}

function agregarresultado() {
    if (lista === null) {
        lista = [{ nombre: nombre, goles: goles }];
    } else if (lista.length == 5) {
        lista.pop();
        lista.unshift({ nombre: nombre, goles: goles });
    } else {
        lista.unshift({ nombre: nombre, goles: goles });
    }
    almacenar();
    actualizarTabla();
}


//funcion para registrar los usuarios, en caso de estar dentro de las mejores goleadas, 
//el usuario quedara registrado en la tabla

const btnRegistro = document.querySelector('#botonnombre');
btnRegistro.addEventListener('click', () => {
    nombre = document.getElementById('nombre').value;
    if (nombre === '') {
        nombre = 'anonimo';
    }

});

const btnInicio = document.querySelector('#comenzar');
btnInicio.addEventListener('click', () => {
    btnInicio.disabled = true;
    setValores();
    partidoFutbol.paused = false;

});






//boton para cambiar el nivel(acosta) del juego 

const btnAcosta = document.querySelector('#acosta');
btnAcosta.addEventListener('click', () => {
    let imagen = document.querySelector('#nivelimagen');
    imagen.src = 'img/acosta.jpg';
    nivel = 'acosta';
    localStorage.setItem('nivel-acosta', 'true');
});
//boton para cambiar el nivel(juvenil) del juego 

const btnJuvenil = document.querySelector('#juvenil');
btnJuvenil.addEventListener('click', () => {
    let imagen = document.querySelector('#nivelimagen');
    imagen.src = 'img/juvenil.jpg';
    nivel = 'juvenil';
    localStorage.setItem('nivel-acosta', 'false');
});

//boton para hacer los cambios de estilo de la pagina

const btnEstilo = document.querySelector('#estilo');
btnEstilo.addEventListener('click', () => {
    document.body.classList.toggle('grana');
    btnEstilo.classList.toggle('activo');

    if (document.body.classList.contains('grana')) {
        localStorage.setItem('estilo-grana', 'true');
    } else {
        localStorage.setItem('estilo-grana', 'false')
    }
});

// Setear ultimo estilo elegido Usuario

if (localStorage.getItem('estilo-grana') === 'true') {
    document.body.classList.add('grana');
    btnEstilo.classList.add('activo');
} else {
    document.body.classList.remove('grana');
    btnEstilo.classList.remove('activo');
}

//Setear ultimo nivel elegido Usuario

if (localStorage.getItem('nivel-acosta') === 'true') {
    let imagen = document.querySelector('#nivelimagen');
    imagen.src = src = 'img/acosta.jpg';
    nivel = 'acosta';
} else {
    let imagen = document.querySelector('#nivelimagen');
    imagen.src = src = 'img/juvenil.jpg';
    nivel = 'juvenil';
}



recuperar();
if (lista !== null) {
    actualizarTabla();
}