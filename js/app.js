var fondoJuego;
var pelota;
var flechaIzquierda;
var flechaDerecha;
var marcadorLocal = 0;
var rivales = 12;
var cartel;
var cartel2;
var velocidad = 200;
var goles = 0;
var arcoLibre;
var partidoFutbol = new Phaser.Game(405, 526, Phaser.AUTO, 'cancha');
var lista = [];
var nombre = "";
var playing = false;
var startButton;

function validate() {
    nombre = $("#nombre").val();
    partidoFutbol.state.start('partido');
    console.log(nombre);
}

function actualizarTabla() {
    let res = document.querySelector('#res');
    res.innerHTML = '';
    for (let item of lista) {
        res.innerHTML += `
                <tr>
                <td>${item.nombre}</td>
                <td>${item.goles}</td>
                <tr>
            `
    }
}

function recuperar() {
    var listaJSON = localStorage.getItem("listas");
    lista = JSON.parse(listaJSON);
}

function almacenar() {
    var jsonLista = JSON.stringify(lista);
    localStorage.setItem("listas", jsonLista);
}


var estadoPrincipal = {
    //  Carga recursos del juego
    preload: function() {
        partidoFutbol.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        partidoFutbol.scale.pageAlignHorizontally = true;
        partidoFutbol.scale.pageAlignVertically = true;
        partidoFutbol.load.image('cesped', 'img/cesped.jpeg');
        partidoFutbol.load.image('pelota', 'img/pelota2.png');
        partidoFutbol.load.image('pie', 'img/pie.png');
        partidoFutbol.load.spritesheet('button', 'img/boton.png', 120, 40);

    },
    //Mostrar los recursos cargados por patalla
    create: function() {





        fondoJuego = partidoFutbol.add.tileSprite(0, 0, 405, 529, 'cesped');
        pelota = partidoFutbol.add.sprite(200, 250, 'pelota');
        pie = partidoFutbol.add.sprite(170, 480, 'pie');

        pelota.anchor.setTo(0.5);
        pelota.scale.setTo(0.15, 0.15);
        flechaDerecha = partidoFutbol.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        flechaIzquierda = partidoFutbol.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        partidoFutbol.physics.startSystem(Phaser.Physics.ARCADE);
        partidoFutbol.physics.arcade.enable(pelota);
        partidoFutbol.physics.arcade.enable(pie);

        cartel = partidoFutbol.add.text(20, 250, 'Rivales: 12', { font: '22px Arial', fill: '#ffff00' });
        cartel2 = partidoFutbol.add.text(20, 280, 'Goles: 0', { font: '22px Arial', fill: '#ffff00' });
        pie.body.collideWorldBounds = true;

        pie.body.immovable = true;

        pelota.body.velocity.set(velocidad, velocidad);
        pelota.body.collideWorldBounds = true;
        partidoFutbol.physics.arcade.checkCollision.down = false;
        pelota.body.bounce.set(1);
        pelota.checkWorldBounds = true;
        pelota.events.onOutOfBounds.add(function() {
            marcadorLocal += 1;
            lista.push({ nombre: nombre, goles: goles });
            actualizarTabla();
            almacenar();
            alert(" Marcaste " + goles + " goles al Equipo que tanto queres ;)");
            location.reload();
        }, this);
        startButton = partidoFutbol.add.button(partidoFutbol.world.width * 0.5, partidoFutbol.world.height * 0.5, 'button', startGame, this, 1, 0, 2);
        startButton.anchor.set(0.5);
        initBricks();

    },
    // Aca va la logica del juego
    update: function() {
        //fondoJuego.tilePosition.y += 0.4;

        partidoFutbol.physics.arcade.collide(pelota, pie);
        //partidoFutbol.physics.arcade.collide(pelota, arquero);

        partidoFutbol.physics.arcade.collide(pelota, arcoLibre, gambetaArquero);

        partidoFutbol.physics.arcade.collide(pelota, bricks, gambeta);

        if (flechaDerecha.isDown) {
            pie.position.x += 20;
        }
        if (flechaIzquierda.isDown) {
            pie.position.x -= 20;
        }

    }



}

function initBricks() {
    brickInfo = {
        width: 50,
        height: 20,
        count: {
            row: 3,
            col: 4
        },
        offset: {
            top: 50,
            left: 80
        },
        padding: 30
    }
    bricks = partidoFutbol.add.group();
    for (c = 0; c < brickInfo.count.col; c++) {
        for (r = 0; r < brickInfo.count.row; r++) {
            var brickX = (c * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
            var brickY = (r * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;
            newBrick = partidoFutbol.add.sprite(brickX, brickY, 'pie');
            partidoFutbol.physics.enable(newBrick, Phaser.Physics.ARCADE);
            newBrick.body.immovable = true;
            newBrick.anchor.set(0.5);
            bricks.add(newBrick);
        }
    }
}






function cerrarArco() {
    arcoLibre = partidoFutbol.add.sprite(200, 10, 'pie');
    partidoFutbol.physics.enable(arcoLibre, Phaser.Physics.ARCADE);
    arcoLibre.body.immovable = true;
    partidoFutbol.physics.arcade.enable(arcoLibre);
    arcoLibre.anchor.set(0.5);

}



function gambeta(pelota, brick) {

    brick.kill();
    rivales -= 1;
    cartel.setText('Rivales: ' + rivales);
    velocidad += 10;
    pelota.body.velocity.set(velocidad, velocidad);
    if (rivales == 0) {

        cerrarArco();

    }

}

function gambetaArquero(pelota, brick) {

    brick.kill();
    goles += 1;
    cartel2.setText('Goles: ' + goles);
    velocidad += 15;
    pelota.body.velocity.set(velocidad, velocidad);
    if (rivales < 1) {

        cerrarArco();

    }

}

function startGame() {
    startButton.destroy();
    pelota.body.velocity.set(150, -150);
    playing = true;
}
/*
function gol(pelota, brick) {
    //arco.kill();
    //goles += 1;
    marcadorLocal.setText('Goles: ' + goles);
}
*/
partidoFutbol.state.add('partido', estadoPrincipal);

if (nombre != "") {
    partidoFutbol.state.start('partido');
}
recuperar();
actualizarTabla();