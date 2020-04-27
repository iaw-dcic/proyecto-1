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
      let next = this.get_random_int(4);
      this.sequence.push(next)
      //return the sequence so far
      return this.sequence;
  }

  get_random_int(max) {

    let next = Math.floor(Math.random() * Math.floor(max))

    return next;
  }

  check_sequence(s){
    let status = this.sequence.length == s.length;
    let i = 0;
    if (status) {
      while (status && i< this.sequence.length) {
        status = this.sequence[i] == s[i];
        i++;
      }
    }
    return status;

  }

  reset(){
    this.sequence = [];
  }
}
