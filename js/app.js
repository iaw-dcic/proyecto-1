var g = null;
var s = new Simon();
var p = new Player();
var sequence_display = [];

$(document).ready(function() {
  $("#new_game").on("click",new_game);
});

function new_game() {
  g = new Game(5);
  s.reset();
  p.reset();
  console.log("New Game...");
  check_game_status();
}

function check_game_status() {
  //game still playing?
  console.log("Game status? "+g.get_game_status());
  if (g != null && g.get_game_status() == 0) {
      //turn?
      console.log("Turn? "+g.get_turn());
      if (g.get_turn() == 's') {
        simon_turn();
      } else {
        player_turn();
      }
  }else{
    console.log("Game ended...");
    show_game_status();
  }
}


function show_game_status() {
  console.log("show_game_status");
  alert(g.get_game_status());
}

function simon_turn() {
  let new_sequence = s.next_step();
  for (var i = 0; i < new_sequence.length; i++) {
    sequence_display.push(new_sequence[i]);
  }
  setTimeout(show_sequence(),1000);
}

function player_turn() {
  enable_handlers();
}
function end_player_turn() {
  console.log("still player's turn? "+s.get_sequence()+" "+p.get_sequence());
  // turn ended?
  if (s.get_sequence().length == p.get_sequence().length) {
    g.next_turn();
    g.set_game_status(s.get_sequence(),p.get_sequence());
    //restart player sequence for next turn
    p.reset();
    check_game_status();
  }else {
    enable_handlers();
  }
}
function enable_handlers() {
  $(".simon_btn").on("click",btn_press);
}

function disable_handlers() {
  $(".simon_btn").off("click",btn_press);

}

function btn_press() {
  disable_handlers();
  let btn = $(this).attr('id');
  p.next_step($(this).val());
  animateCSS("#"+btn,"pulse",end_player_turn);
}

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

function show_sequence() {
  console.log("-r sequencia: "+sequence_display);
  log_all();

  if(sequence_display.length != 0){

    //show first element and then the rest of the sequence
    let btn_num = sequence_display.shift();
    //sequence_display = sequence_display.slice(1,sequence_display.length);
    animateCSS("#btn_"+btn_num,"pulse",show_sequence);

  }else{
    g.next_turn();
    check_game_status();
  }
}
function log_all() {
  console.log(g );
  console.log(s );
  console.log(p );
  console.log(sequence_display );
  console.log(sequence_display.length);
}
