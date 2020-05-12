var g = null;
var s = new Simon();
var p = new Player();
var sequence_display = [];


$(document).ready(function() {
  $("#new_game").on("click",new_game);
  $("#end_turn").on("click",end_player_turn);

});

function new_game() {
  $("#new_game").css("display","None");
  g = new Game(5);
  s.reset();
  p.reset();
  console.log("New Game...");
  simon_turn();
}

function simon_turn() {
  let new_sequence = s.next_step();
  sequence_display = [...new_sequence];
  //setTimeout(show_sequence(),1000);
  show_sequence();
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
  $("#new_game").css("display","block");

}



function player_turn() {
  enable_handlers();
}
function end_player_turn() {
    //hide end turn button
    $("#end_turn").css("display","none");
    g.set_game_status(s.get_sequence(),p.get_sequence());
    p.reset();
    g.next_turn();
    check_game_status();

}
function enable_handlers() {
  $(".simon_btn").off("click",btn_press).on("click",btn_press);
  $("#end_turn").css("display","block");

}

function disable_handlers() {
  $(".simon_btn").off("click",btn_press);
  $("#end_turn").css("display","none");
}

function btn_press(event) {
  disable_handlers();
  event.stopPropagation();
  event.preventDefault();
  console.log($(this));
  let btn = $(this).attr('id');
  console.log(btn);
  p.next_step($("#"+btn).val());
  animateCSS("#"+btn,"pulse",enable_handlers);
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
  //log_all();

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
