
var paused = true;

var localStorageName = "TetrisTopScore";
var highScore = localStorage.getItem("highScore");
var gamesPlayed = localStorage.getItem("gamesPlayed");
var totalRows = 0;
var moveScore = 0;

var pieceCount = 0;


//Game State
//    0 - New game
//    1 - Playing
//    2 - Paused
//    3 - Game Over

var gameState = 0


// Music control
var music = false;
function musicToggle() {
  document.getElementById("musicBtn").blur();
  music= !music
  if ( music == true) {
  	document.getElementById("musicBtn").value="Music on";
    document.getElementById( 'playmusic' ).play();
    } else document.getElementById("musicBtn").value="Music off";
      document.getElementById( 'playmusic' ).pause();
}


//Saves high score to the localStorage
function saveScore() {
  if(highScore !== null){
    if (player.score > highScore) {
        localStorage.setItem("highScore", player.score);
    }
  } else if (player.score >0){
    localStorage.setItem("highScore", player.score);
  } else {
    localStorage.setItem("highScore", 0);
  }
  localStorage.setItem("gamesPlayed", gamesPlayed++);
}

//changes pause state of game
function pauseGame() {

  document.getElementById("pauseBtn").blur();
  var x = document.getElementById("pause");
  var z = document.getElementById("gameOver");
  paused = !paused;

  if (collide(arena, player)) {
          gameState = 3;
          z.style.display = "block";
          gameTimer();
          //gamesPlayed++;
          document.getElementById("newGameBtn").blur();
          document.getElementById( 'playmusic' ).pause();

          saveScore();

          document.getElementById('scoreGO').innerText = player.score;
          document.getElementById('rowsGO').innerText = totalRows;
          document.getElementById('levelGO').innerText = gameLevel;
          document.getElementById('pieces').innerText = pieceCount;
          document.getElementById('time').innerText = timeGame;
          document.getElementById('highscoreGO').innerText = highScore;
          document.getElementById('gamesPlayed').innerText = gamesPlayed;



          //arena.forEach(row => row.fill(0));
          //saveScore();
          updateScore();
          paused = true;

    } else if (paused) {
      gameState = 2;
        x.style.display = "block";
        document.getElementById( 'playmusic' ).pause();
        //paused = true;

    //pauseAudio();




    } else {
        x.style.display = "none";
        gameState = 1;

        //mySound.play();
        //playAudio();

  }
    update();
}


// document.getElementById('newGameBtn').addEventListener('keypress', function(event) {
//         if (event.keyCode == 32) {
//             event.preventDefault();
//         }
//     });



function startGame() {
  paused = false;
  gameState = 1;
  document.getElementById("gameOver").blur();
  document.getElementById("newGame").style.display = "none";
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("pause").style.display = "none";
  arena.forEach(row => row.fill(0));
  player.score = 0;
  totalRows = 0;
  gameLevel = 1;
    updateScore();
  //saveScore();
  timeStart = Math.round(new Date().getTime()/1000);
  pieceCount = 0;
  //paused = false;
  //pauseGame();
  playerReset();
  //playAudio();
  update();
  document.addEventListener('keydown', keyListener);
  document.addEventListener('keyup', keyListener);
}

//Clears lines as they are completed
function arenaSweep() {
  let rowCount = 1;
  outer: for (let y = arena.length -1; y > 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] === 0) {
        continue outer;
      }
    }

    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    ++y;

    ++totalRows;

      document.getElementById( 'clearsound' ).play();

    levelUp();


    player.score += rowCount * 10;
    rowCount *= 2;
  }
  updateScore();
  //saveScore();
}

//drops the pieces
function playerDrop(){
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
    updateScore();
  }
  dropCounter = 0;
}

//Hard drop
function hardDrop(){
  var steps=1;
  do {
    player.pos.y++;
    steps++;
    if (collide(arena, player)) {
      player.pos.y--;
      merge(arena, player);
      playerReset();
      arenaSweep();
      updateScore();
      steps=0
  }
  dropCounter = 0;
  }
while (steps > 0)

}


//moves piece and checks for collisions
function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

//creates a random piece at the top middle of the board
function playerReset() {
  const pieces = 'ILJOTSZ';
  pieceCount++;
  // var currentPiece = nextPiece;
  // nextPiece = createPiece(pieces[pieces.length * Math.random() | 0]);
  // player.matrix = currentPiece;

  //player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);

  if(player.next === null){
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.next = createPiece(pieces[pieces.length * Math.random() | 0]);
  } else {
    player.matrix = player.next;
    player.next = createPiece(pieces[pieces.length * Math.random() | 0]);
  }


  drawNext();

//  document.getElementById('nextblock').innerText = type

  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0) -
                 (player.matrix[0].length / 2 | 0);


  if (collide(arena, player)) {
    //gameState = 3;
    pauseGame();
    timeEnd = Math.round(new Date().getTime()/1000)
    document.removeEventListener('keydown', keyListener);
    document.removeEventListener('keyup', keyListener);
    }
  }

  // if (collide(arena, player)) {
  //   arena.forEach(row => row.fill(0));
  //   saveScore();
  //   player.score = 0;
  //   totalRows = 0;
  //   gameLevel = 1;
  //   updateScore();
  // }


let dropCounter = 0;
let dropInterval = 1000;
let gameLevel = 1;
let speedMultiplier = 1;

function levelUp() {
  if (Math.floor(totalRows/10) > gameLevel) {
    ++gameLevel;
    dropInterval *= 0.92;
  }
}


let lastTime = 0;

//draws the animation frames
function update(time = 0){
//    currentState(); // call the current game state


    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    if (!paused && gameState == 1) {
    //if (gameState = 1) {
      if (music == true) {
        document.getElementById( 'playmusic' ).play();
      }
      requestAnimationFrame(update);
  }

}

//Updates the score in the HTML
function updateScore() {

  document.getElementById('score').innerText = player.score;
  document.getElementById('rows').innerText = totalRows;
  document.getElementById('level').innerText = gameLevel;
  document.getElementById('highscore').innerText = highScore;


  // + "<br>rows: " + totalRows  + "<br>high:"+ highScore + "<br>level:" + gameLevel;
  //document.getElementById('topScore').innerText = highScore;
}

//define the colors of the pieces
const colors = [
  null,
  'red',      // T
  'blue',     // O
  'violet',   // L
  'limegreen',// J
  'yellow',   // I
  'orange',   // S
  'skyblue',  // Z
];



//this is the current piece
const player = {
  pos: {x: 0, y: 0},
  matrix: null,
  score: 0,
  next: null,
};



//****************start Random Background easter egg******************//
var images = [], x = -1;
      images[0] ='http://www.muhiloosai.com/wp-content/uploads/2016/10/cute-husky-puppies-uhd-wallpaper.jpg';
      images[1] ='https://weneedfun.com/wp-content/uploads/2016/12/Siberian-Husky-Puppies-18.jpg';
      images[2] ='https://weneedfun.com/wp-content/uploads/2016/12/Siberian-Husky-Puppies-24.jpg';
      images[3] ='https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2018/05/four-siberian-husky-puppies-in-a-yard.jpg';
      images[4] ='https://pixfeeds.com/images/dogs/1280-590181290-malamute-puppies-lying-on-woolen-plaid.jpg';
      images[5] ='https://cdn0.wideopenpets.com/wp-content/uploads/2017/05/AdobeStock_107723771.jpeg';
      images[6] ='https://images.wagwalkingweb.com/media/training_guides/leash-train-a-husky-puppy/hero/How-to-Leash-Train-a-Husky-Puppy.jpg';
      images[7] ='https://www.huskypuppiesinfo.com/wp-content/uploads/2018/03/Choosing-a-Husky-Puppy.jpg';
      images[8] ='https://thehappypuppysite.com/wp-content/uploads/2017/12/pictures-of-huskies.jpg';

function displayImage() {
  document.getElementById("imageBtn").blur();
  var image = images[Math.floor(Math.random() * images.length)];
  document.getElementById("body").style.backgroundImage = 'url("' + image + '")';
}
//**************** end Random Background easter egg******************//




playerReset();
updateScore();
update();
