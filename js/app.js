var g = null;
var s = new Simon();
var p = new Player();
var sequence_display = [];
var last_btn = 0;
var darkmode = 1;
var sequence_length = 5;


$(document).ready(function() {
  load_settings();
  handlers();
});
function handlers() {
  $("#new_game").on("click",new_game);
  $("#end_turn").on("click",end_player_turn);
  //settings menu
  $("#settings").on("click",change_settings);
  $("#settings_modal").on("hide.bs.modal",save_settings)

  $("#darkmode").on("change",change_darkmode);
  $("#sequence_length").on("change",change_sequence_length);
}
function new_game() {
  $("#settings").css("display","None");
  $("#new_game").css("display","None");
  g = new Game(sequence_length);
  s.reset();
  p.reset();
  console.log("New Game...");
  simon_turn();
}
function change_settings() {
  $("#settings_modal").modal();
}

function change_darkmode() {
  darkmode = ($("#darkmode").is(':checked'))? 1 : 0;
  if (darkmode == 1) {
    $('body').removeClass("color_white").addClass("color_black");
    $("settings").removeClass("color_black").addClass("color_white");
    $("new_game").removeClass("color_black").addClass("color_white");
    $("end_turn").removeClass("color_black").addClass("color_white");
  }else{
    $('body').removeClass("color_black").addClass("color_white");
    $("settings").removeClass("color_white").addClass("color_black");
    $("new_game").removeClass("color_white").addClass("color_black");
    $("end_turn").removeClass("color_white").addClass("color_black");
  }
}

function change_sequence_length() {
  sequence_length = $("#sequence_length :selected").val();
  console.log(sequence_length);
}

function save_settings() {
  console.log("Saving settings...");
  window.localStorage.setItem('darkmode', darkmode);
  window.localStorage.setItem('sequence_length', sequence_length);
}
function load_settings(){
  darkmode = window.localStorage.getItem('darkmode');
  $("#darkmode").prop('checked', (darkmode == 1 ? true : false ));
  change_darkmode();
  sequence_length = window.localStorage.getItem('sequence_length');
  $("#sequence_length").val(sequence_length);
  console.log("Loaded: darkmode "+darkmode+" sequence_length "+sequence_length);
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
  if (g.get_game_status() == 1) {
    $("#game_status_modal_text").text("you win!");
  } else {
    $("#game_status_modal_text").text("you lost...");
  }
  $("#game_status_modal").modal();
  $("#new_game").css("display","inline-block");
  $("#settings").css("display","inline-block");
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
  $("#end_turn").css("display","inline-block");

}

function disable_handlers() {
  $(".simon_btn").off("click",btn_press);
  $("#end_turn").css("display","none");
}

function btn_press(event) {
  disable_handlers();
  //console.log($(this));
  let btn = $(this).attr('id');

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

  if(sequence_display.length > 0){

    //show first element and then the rest of the sequence
    let btn_num = sequence_display.shift();

    if (btn_num != last_btn) {
      last_btn = btn_num
      animateCSS("#btn_"+btn_num,"pulse", show_sequence);
    } else {

      setTimeout(function () {
        animateCSS("#btn_"+btn_num,"pulse", show_sequence);
      },1);
    }

  }else{
    g.next_turn();
    check_game_status();
  }

}
