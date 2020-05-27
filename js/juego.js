var fondoJuego;
var pelota;
var flechaIzquierda;
var flechaDerecha;
var marcadorLocal = 0;
var rivales = 12;
var cartel;
var cartel2;
var velocidad = 50;
var goles = 0;
var arcoLibre;
var partidoFutbol = new Phaser.Game(405, 526, Phaser.AUTO, 'cancha');






//  Carga recursos del juego
var estadoPrincipal = {

    preload: function() {
        partidoFutbol.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        partidoFutbol.scale.pageAlignHorizontally = true;
        partidoFutbol.scale.pageAlignVertically = true;
        partidoFutbol.load.image('cesped', 'img/cesped.jpeg');
        partidoFutbol.load.image('pelota', 'img/pelota2.png');
        partidoFutbol.load.image('pie', 'img/pie.png');

    },
    //Mostrar los recursos cargados por patalla
    create: function() {
        partidoFutbol.paused = true;
        fondoJuego = partidoFutbol.add.tileSprite(0, 0, 405, 529, 'cesped');
        pelota = partidoFutbol.add.sprite(200, 250, 'pelota');
        pie = partidoFutbol.add.sprite(160, 480, 'pie');

        pelota.anchor.setTo(0.5);
        pelota.scale.setTo(0.15, 0.15);
        flechaDerecha = partidoFutbol.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        flechaIzquierda = partidoFutbol.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        partidoFutbol.physics.startSystem(Phaser.Physics.ARCADE);
        partidoFutbol.physics.arcade.enable(pelota);
        partidoFutbol.physics.arcade.enable(pie);


        cartel2 = partidoFutbol.add.text(20, 280, 'Goles: 0', { font: '35px Arial', fill: 'rgb(63, 29, 29)' });
        pie.body.collideWorldBounds = true;

        pie.body.immovable = true;

        pelota.body.velocity.set(velocidad, velocidad);
        pelota.body.collideWorldBounds = true;
        partidoFutbol.physics.arcade.checkCollision.down = false;
        pelota.body.bounce.set(1);
        pelota.checkWorldBounds = true;

        pelota.events.onOutOfBounds.add(function() {
            marcadorLocal += 1;
            agregarresultado();
            velocidad = 50;
            btnInicio.disabled = false;
            partidoFutbol.state.start('partido');

            alert(" Marcaste " + goles + " goles a tu Equipo rival ");

        }, this);

        iniciarRivales();

    },

    update: function() {

        partidoFutbol.physics.arcade.collide(pelota, pie);
        partidoFutbol.physics.arcade.collide(pelota, arcoLibre, gambetaArquero);
        partidoFutbol.physics.arcade.collide(pelota, rivals, gambeta);

        if (flechaDerecha.isDown) {
            pie.position.x += 10;
        }
        if (flechaIzquierda.isDown) {
            pie.position.x -= 10;
        }

    }



}

function iniciarRivales() {
    rivalInfo = {
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
    rivals = partidoFutbol.add.group();
    for (c = 0; c < rivalInfo.count.col; c++) {
        for (r = 0; r < rivalInfo.count.row; r++) {
            var rivalX = (c * (rivalInfo.width + rivalInfo.padding)) + rivalInfo.offset.left;
            var rivalY = (r * (rivalInfo.height + rivalInfo.padding)) + rivalInfo.offset.top;
            nuevoRival = partidoFutbol.add.sprite(rivalX, rivalY, 'pie');
            partidoFutbol.physics.enable(nuevoRival, Phaser.Physics.ARCADE);
            nuevoRival.body.immovable = true;
            nuevoRival.anchor.set(0.5);
            rivals.add(nuevoRival);
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



function gambeta(pelota, rival) {

    rival.kill();
    rivales -= 1;
    if (nivel == 'acosta') {
        velocidad += 40;
    } else {
        velocidad += 20;
    }
    //velocidad += 30;
    pelota.body.velocity.set(velocidad, velocidad + 30);
    if (rivales == 0) {

        cerrarArco();

    }

}

function gambetaArquero(pelota, rival) {

    rival.kill();
    goles += 1;
    cartel2.setText('Goles: ' + goles);
    velocidad += 40;
    pelota.body.velocity.set(velocidad, velocidad + 30);
    if (rivales < 1) {

        cerrarArco();

    }

}



function setValores() {
    marcadorLocal = 0;
    rivales = 12;
    goles = 0;
    if (nivel == 'acosta') {
        velocidad = 100;
    } else {
        velocidad = 50;
    }
}


partidoFutbol.state.add('partido', estadoPrincipal);
partidoFutbol.state.start('partido');