let move = [0,0]; //set to something that can never be moved to or from
let last_click = [0,0];
let move_set = false;
let check_move = false;

function setup() {
  createCanvas(400, 400);
  //frameRate(50)
}

function mouseClicked(){
  if(move_set){
    last_click = move;
    move = [parseInt(mouseY/50),parseInt(mouseX/50)];
    check_move = true;
  }
  else{
    move = [parseInt(mouseY/50),parseInt(mouseX/50)];
    move_set = true;
  }
  console.log(move);
}

class board {
  constructor() {
    //1 = white, 2 = red, 3 = white king, 4 = red king
    this.board = [['-',1,'-',1,'-',1,'-',1],
                 [1,'-',1,'-',1,'-',1,'-'],
                 ['-',1,'-',1,'-',1,'-',1],
                 [0,'-',0,'-',0,'-',0,'-'],
                 ['-',0,'-',0,'-',0,'-',0],
                 [2,'-',2,'-',2,'-',2,'-'],
                 ['-',2,'-',2,'-',2,'-',2],
                 [2,'-',2,'-',2,'-',2,'-']];
    this.turn = 1;
    this.score = [0,0];
    this.king_count = [0,0];
    this.direction = 0;
    this.jumping = false;
  }
  print_board() {
    console.log(JSON.stringify(this.board));
  }
  
  move_piece(old_square, new_square) {
    // check if the piece can be moved there
    // return false if the piece cannot be moved there
    // move piece from old location to new location
    // return true if the piece can be moved there
    
    this.board[new_square[0]][new_square[1]] = this.board[old_square[0]][old_square[1]];
    this.board[old_square[0]][old_square[1]] = 0;
    if(this.turn == 2)
      this.turn = 1;
    else
      this.turn = 2;
    
  }
  valid_move() {
    if(this.board[move[0]][move[1]] == 0 && 
       (this.board[last_click[0]][last_click[1]] == this.turn ||
       this.board[last_click[0]][last_click[1]] == this.turn + 2)){
      switch(this.board[last_click[0]][last_click[1]]){
        case(1): //able to move down and able to jump 2 or 4 DONE
          if(last_click[0] == move[0]-1 && 
            (last_click[1] == move[1]-1 || last_click[1] == move[1]+1)){
             this.jumping = false;
             return true;
             }
          if(last_click[0] > 5){
            break;
          }
          if(last_click[1] < 6){
            if(last_click[0] == move[0]-2 &&
              last_click[1] == move[1]-2 && 
              (this.board[last_click[0]+1][last_click[1]+1] == 2 || this.board[last_click[0]+1][last_click[1]+1] == 4)
              ){
               this.jumping = true;
               return true;
               }
          }
          if(last_click[1] > 1){
            if(last_click[0] == move[0]-2 &&
              last_click[1] == move[1]+2 && 
              (this.board[last_click[0]+1][last_click[1]-1] == 2 || this.board[last_click[0]+1][last_click[1]-1] == 4)
              ){
               this.jumping = true;
               return true;
               }
          }
          break;
        case(2): //able to move up and able to jump 1 or 3
          if(last_click[0] == move[0]+1 && 
            (last_click[1] == move[1]-1 || last_click[1] == move[1]+1)){
             this.jumping = false;
             return true;
             }
          if(last_click[0] < 2){
            break;
          }
          if(last_click[1] < 6){
            if(last_click[0] == move[0]+2 &&
              last_click[1] == move[1]-2 && 
              (this.board[last_click[0]-1][last_click[1]+1] == 1 || this.board[last_click[0]-1][last_click[1]+1] == 3)
              ){
               this.jumping = true;
               return true;
               }
          }
          if(last_click[1] > 1){
            if(last_click[0] == move[0]+2 &&
              last_click[1] == move[1]+2 && 
              (this.board[last_click[0]-1][last_click[1]-1] == 1 || this.board[last_click[0]-1][last_click[1]-1] == 3)
              ){
               this.jumping = true;
               return true;
            }
          }
          break;
        case(3): //able to move either direction and jump 2 or 4
          if((last_click[0] == move[0]+1 || last_click[0] == move[0]-1)&& 
            (last_click[1] == move[1]-1 || last_click[1] == move[1]+1)){
             this.jumping = false;
             return true;
             }
          if(last_click[0] > 1){ // jumping down
            if(last_click[1] < 6){ // jumping down right
              if(last_click[0] == move[0]+2 &&
                 last_click[1] == move[1]-2 && 
                (this.board[last_click[0]-1][last_click[1]+1] == 2 || 
                 this.board[last_click[0]-1][last_click[1]+1] == 4)){
                 this.jumping = true;
                 return true;
               }
            }
            if(last_click[1] > 1){ // jumping down left
              if(last_click[0] == move[0]+2 &&
                 last_click[1] == move[1]+2 && 
                 (this.board[last_click[0]-1][last_click[1]-1] == 2 || 
                  this.board[last_click[0]-1][last_click[1]-1] == 4)){
               this.jumping = true;
               return true;
              }
            }  
          }
          if(last_click[0] < 6){ // jumping up
            if(last_click[1] < 6){ // jumping up right
              if(last_click[0] == move[0]-2 &&
                 last_click[1] == move[1]-2 && 
                (this.board[last_click[0]+1][last_click[1]+1] == 2 || 
                 this.board[last_click[0]+1][last_click[1]+1] == 4)
              ){
                 this.jumping = true;
                 return true;
               }
            }
            if(last_click[1] > 1){ //jumping up left
              if(last_click[0] == move[0]-2 &&
                 last_click[1] == move[1]+2 && 
                (this.board[last_click[0]+1][last_click[1]-1] == 2 || 
                 this.board[last_click[0]+1][last_click[1]-1] == 4)
              ){
                 this.jumping = true;
                 return true;
               }
            }  
          }
          break;
        case(4): // able to move either direction and jump 1 or 3
          if((last_click[0] == move[0]+1 || last_click[0] == move[0]-1)&& 
            (last_click[1] == move[1]-1 || last_click[1] == move[1]+1)){
             this.jumping = false;
             return true;
             }
          if(last_click[0] > 1){ // jumping down
            if(last_click[1] < 6){ // jumping down right
              if(last_click[0] == move[0]+2 &&
                 last_click[1] == move[1]-2 && 
                (this.board[last_click[0]-1][last_click[1]+1] == 1 || 
                 this.board[last_click[0]-1][last_click[1]+1] == 3)){
               this.jumping = true;
               return true;
               }
            }
            if(last_click[1] > 1){ // jumping down left
              if(last_click[0] == move[0]+2 &&
                 last_click[1] == move[1]+2 && 
                 (this.board[last_click[0]-1][last_click[1]-1] == 1 || 
                  this.board[last_click[0]-1][last_click[1]-1] == 3)){
               this.jumping = true;
               return true;
              }
            }  
          }
          if(last_click[0] < 6){ // jumping up
            if(last_click[1] < 6){ // jumping up right
              if(last_click[0] == move[0]-2 &&
                 last_click[1] == move[1]-2 && 
                (this.board[last_click[0]+1][last_click[1]+1] == 1 || 
                 this.board[last_click[0]+1][last_click[1]+1] == 3)
              ){
                 this.jumping = true;
                 return true;
               }
            }
            if(last_click[1] > 1){ //jumping up left
              if(last_click[0] == move[0]-2 &&
                 last_click[1] == move[1]+2 && 
                (this.board[last_click[0]+1][last_click[1]-1] == 1 || 
                 this.board[last_click[0]+1][last_click[1]-1] == 3)
              ){
                 this.jumping = true;
                 return true;
               }
            }  
          }
          break;
      }      
    }
    return false;
  }
  king_me(){
    var i;
    for(i=0;i<8;i++){
      if(this.board[7][i] == 1){
        this.king_count[0] += 1;
        this.board[7][i] = 3;
      }
      if(this.board[0][i] == 2){
        this.king_count[1] += 1;
        this.board[0][i] = 4;
      }
    }
  }
  jump(){
    // i know last click and move
    const x = (move[1]+last_click[1])/2;
    const y = (move[0]+last_click[0])/2;
    if(this.board[y][x] == 1 || this.board[y][x] == 3){
      this.score[1] += 1;
    }
    else{
      this.score[0] += 1;
    }
    this.board[y][x] = 0;
  }  
}

function draw_board(){
  var i,j;
  var black = true;
  fill(color(0,0,0))
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      if(black){
        rect(j*50,i*50,50,50);
        black = false;
      }
      else
        black = true;
    }
    black = !black;
  }
}

function draw_pieces(board){
  var i,j;
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      if(board[i][j]==1||board[i][j]==3){
        fill(color(255,255,255))
        ellipse(25+j*50,25+i*50,40,40);
      }
      else if(board[i][j]==2||board[i][j]==4){
        fill(color(255,0,0))
        ellipse(25+j*50,25+i*50,40,40);
      }
    }    
  }
}

function draw_move_piece(board,piece,iter,dir){
  var i,j;
  console.log("dir is");
  console.log(dir);
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      if(i == piece[0] && j == piece[1]){
        if(board[i][j]==1 || board[i][j]==3)
          fill(color(255,255,255))
        else
          fill(color(255,0,0))
        switch(dir){
          case(0)://upleft
            ellipse(25+j*50-iter,25+i*50-iter,40,40);
            break;
          case(1)://downleft
            ellipse(25+j*50-iter,25+i*50+iter,40,40);
            break;
          case(2)://upright
            
            ellipse(25+j*50+iter,25+i*50-iter,40,40);
            break;
          case(3)://downright
            ellipse(25+j*50+iter,25+i*50+iter,40,40);     
            break;
        }
      }
      else if(board[i][j]==1||board[i][j]==3){
        fill(color(255,255,255))
        ellipse(25+j*50,25+i*50,40,40);
      }
      else if(board[i][j]==2||board[i][j]==4){
        fill(color(255,0,0))
        ellipse(25+j*50,25+i*50,40,40);
      }
    }    
  }  
}

//start of the bot
// planning on putting this in a separate file but this is convenient for now
function rec_mini_max(board,depth,turn) {
  // takes: 
  //      the board at the state of that node in the tree
  //      the current depth
  //      the current turn to decide whether to prune
  var moves = possible_moves(board); // need to make possible moves function
  if(depth == 4)
    return score(board);
}
//end of the bot


const game = new board();

const game_states = ['idle','moving_piece', 'getting_move','jumping_piece','game_won']

let state = game_states[2];

let iter = 0;

function draw() {
  background(220);
  //draw_pieces(game.board);
  switch(state) {
    case('idle'):
      draw_board();
      draw_pieces(game.board);
      
      break;
    case('moving_piece'):
    {
      //console.log("what")
      iter += 1;
      draw_board();
      draw_move_piece(game.board,last_click,iter,game.direction)
      if(iter == 50){
        iter = 0;
        state = game_states[2]
        game.move_piece(last_click,move)
        move_set = false;
        check_move = false;
      }       
      break;
      
    }
    case('jumping_piece'):
      iter += 2;
      draw_board();
      draw_move_piece(game.board,last_click,iter,game.direction)
      if(iter == 100){
        iter = 0;
        state = game_states[2]
        game.move_piece(last_click,move)
        move_set = false;
        check_move = false;
      }   
      break;
    case('getting_move'):
    {
      draw_board();
      draw_pieces(game.board);
      game.king_me();
      if(game.valid_move())
        if(game.jumping == true) {
          game.jump();
          state = game_states[3];
        }
        else {
          state = game_states[1]; 
        }
        if(last_click[0]>move[0] && last_click[1]>move[1]){
          game.direction = 0; //up left
        }
        else if(last_click[0]<move[0] && last_click[1]>move[1]){
          game.direction = 1; //down left
        }
        else if(last_click[0]>move[0] && last_click[1]<move[1]){
          game.direction = 2; //up right           
        }
        else{
          game.direction = 3; //down right
        }
      break;
    }
    case('game_won'):
      break;  
  }
}