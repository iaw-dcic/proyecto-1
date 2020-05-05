class Player {
  constructor() {
      this.sequence = [];
  }

  next_step(step) {
      this.sequence.push(step);
  }

  reset(){
    this.sequence = [];
  }

  get_sequence(){
    return this.sequence;
  }
}

class Simon {
  constructor() {
    this.sequence = [];

  }

  next_step(){
      // Generate next step
      let next = this._get_random_int(4);
      this.sequence.push(next)
      //return the sequence so far
      return this.sequence;
  }

  _get_random_int(max) {

    let next = Math.floor(Math.random() * Math.floor(max))

    return next;
  }

  reset(){
    this.sequence = [];
  }
}

class Game {
  constructor(sequence_length) {
    this.sequence_length = sequence_length
    this.turn = "s";//s: simon's turn, p:player's turn
    this.turn_num = 0;
    this.status = 0; // -2:error, -1: loss, 0: playing, 1: win
  }

  next_turn(){
    if (this.turn_num < this.sequence_length && this.status == 0) {
      if(this.turn == "s"){
        this.turn = "p";
      }else{
        this.turn = "s";
        this.turn_num++;
      }
    }else{
      console.log("Juego Finalizado!");
    }
  }

  get_turn(){
    return this.turn;
  }

  set_game_status(simon_sequence,player_sequence){
    if (this.turn_num < this.sequence_length && status == 0) {

      if(simon_sequence.length != player_sequence.length){
        console.log("Las secuencia del jugador no tiene la misma cantidad de elementos que la secuencia de simon");
        this.status = -2;
        return;
      }

      let correct = false;
      let i = 0
      while (i < simon_sequence.length ) {
        correct = simon_sequence[i] == player_sequence[i];
        if (!correct) {
          break;
        }
        i++;
      }

      if (correct) {
        this.status = (simon_sequence.length == this.sequence_length) ? 1 : 0;
      }else{
        this.status = -1;
      }

    }else{
      console.log("Juego Finalizado!");
    }

  }

  get_game_status(){
    return this.status;
  }
  reset(){
    this.turn = "s";//s: simon's turn, p:player's turn
    this.turn_num = 0;
    this.status = 0; // -2:error, -1: loss, 0: playing, 1: win
  }

  change_difficulty(s_length){
    this.sequence_length = s_length;
    reset();
  }


}
