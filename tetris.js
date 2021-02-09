const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
var paused = true;

var localStorageName = "TetrisTopScore";
var highScore = localStorage.getItem("highScore");
var totalRows = 0;
var moveScore = 0;


//const pauseKey : false;
//const enterKey : false;

context.scale(20, 20);

//Toggles game state to paused
// function togglePause() {
//     if (!paused)
//     {
//         paused = true;
//     } else if (paused)
//     {
//        paused= false;
//     }
//
// }

// function loadScore() {
//   if(localStorage.getItem(localStorageName) == null) {
//     highScore = 0;
//   } else {
//     highScore = localStorage.getItem(localStorageName);
//   }
// }


//var score = 0;
//var highscore = localStorage.getItem("highscore");


// Get a reference to an element.
// var square = document.querySelector('score');
//
// // Create an instance of Hammer with the reference.
// var hammer = new Hammer(square);
//
// // Subscribe to a quick start event: press, tap, or doubletap.
// // For a full list of quick start events, read the documentation.
// hammer.on('press', function(e) {
//   e.target.classList.toggle('expand');
//   console.log("You're pressing me!");
//   console.log(e);
// });


// Music control
var music = false;
function musicToggle() {
  music= !music
  if ( music == true) {
  	document.getElementById("musicBtn").value="Music on";
    document.getElementById( 'playmusic' ).play();
    } else document.getElementById("musicBtn").value="Music off";
      document.getElementById( 'playmusic' ).pause();
}



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
}

//changes pause state of game
function togglePause() {
  paused = !paused
  var x = document.getElementById("status");
  if (paused) {
    x.style.display = "block";
    document.getElementById( 'playmusic' ).pause();
    //pauseAudio();
  } else {
    x.style.display = "none";
    //mySound.play();
    //playAudio();

  }
    update();
}

function startGame() {
  arena.forEach(row => row.fill(0));
  saveScore();
  player.score = 0;
  //paused = false;
  togglePause();
  playerReset();
  playAudio();
}


// const song = document.getElementById('themeSong');
//
// function playAudio() {
//   song.play();
// }
//
// function pauseAudio() {
//   song.pause();
// }


// var audioElement = document.createElement('audio');
// audioElement.setAttribute('src', 'https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.ogg');
//
// function PlayAudio()
// {
//
// 	audioElement.load;
// 	audioElement.play();
//
// }
//
// function PauseAudio()
// {
// 	audioElement.pause();
// }


//const mySound = document.getElementById("themeSong");
//const correctButton = document.getElementById("correct");
//correctButton.addEventListener("click", function(){ mySound.play(); });




// function pauseGame() {
//     paused = !paused; // toggle the paused value (false <-> true)
//     if (!paused) loop(); // restart loop
// }

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

    //if (movescore =1) {
    //  totalRows = totalRows + 1;
    //}

    player.score += rowCount * 10;
    //totalRows = totalRows + rowCount;
    rowCount *= 2;
  }
  updateScore();
  saveScore();
}

//determine if player piece will collide with item on board
function collide(arena, player) {
  const[m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length;++x) {
      if (m[y][x] !== 0 &&
          (arena[y + o.y] &&
          arena[y + o.y][x + o.x]) !== 0) {
            return true;
          }
    }
  }
  return false;
}

//creates the board
function createMatrix(w, h){
  const matrix = [];
  while (h--){
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

//piece layout
function createPiece(type) {
  if (type === 'T') {
    return [
      [0,0,0],
      [1,1,1],
      [0,1,0],
    ];
} else if (type === 'O') {
    return [
      [2,2],
      [2,2],
    ];
} else if (type === 'L') {
    return [
      [0,3,0],
      [0,3,0],
      [0,3,3],
    ];
} else if (type === 'J') {
    return [
      [0,4,0],
      [0,4,0],
      [4,4,0],
    ];
} else if (type === 'I') {
    return [
      [0,5,0,0],
      [0,5,0,0],
      [0,5,0,0],
      [0,5,0,0],
    ];
} else if (type === 'S') {
    return [
      [0,6,6],
      [6,6,0],
      [0,0,0],
    ];
} else if (type === 'Z') {
    return [
      [7,7,0],
      [0,7,7],
      [0,0,0],
    ];
  }
}

//clears old position and draws new piece position and draws the board
function draw() {
  context.fillStyle = '#000';
  context.fillRect(0,0,canvas.width, canvas.height);

  drawMatrix(arena, {x:0, y:0})
  drawMatrix(player.matrix, player.pos);
  //document.getElementById('themeSong').play();

}

//function that draws pieces on screen
function drawMatrix(matrix, offset){
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x,
                         y + offset.y,
                         1, 1);
      }
    });
  });
}

//puts the pieces into position on the board
function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;

      }
    })
  })
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


//Allows a piece to rotate in either direction
function rotate(matrix, dir) {
  for (let y=0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [
        matrix[x][y],
        matrix[y][x],
      ] = [
        matrix[y][x],
        matrix[x][y],
      ];
    }
  }

  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }
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
  // var currentPiece = nextPiece;
  // nextPiece = createPiece(pieces[pieces.length * Math.random() | 0]);
  // player.matrix = currentPiece;

  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);

  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0) -
                 (player.matrix[0].length / 2 | 0);
  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    saveScore();
    player.score = 0;
    totalRows = 0;
    updateScore();
  }
}

//Performs the piece rotation
function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir);
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}


let dropCounter = 0;
let dropInterval = 1000;
let gameLevel = 1;
let speedMultiplier = 1;

function levelUp() {
  if (Math.floor(totalRows/10) > gameLevel) {
    ++gameLevel;
    dropInterval *= 0.95;
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
    if (!paused) {
      if (music == true) {
        document.getElementById( 'playmusic' ).play();
      }
      requestAnimationFrame(update);
  }

}

//Updates the score in the HTML
function updateScore() {

  document.getElementById('score').innerText = "score: " + player.score + " | rows: " + totalRows  + " | high:"+ highScore + " | level:" + gameLevel;
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

const arena = createMatrix(12, 20); //defines size of board

//this is the current piece
const player = {
  pos: {x: 0, y: 0},
  matrix: null,
  score: 0,
}

const nextPiece = {
  matrix: null,
}

// const currentPiece = {
//   matrix: createPiece(pieces[pieces.length * Math.random() | 0]),
// }

//player controls
document.addEventListener('keydown', event => {
  if (event.keyCode === 37 || event.keyCode === 74) {
    playerMove(-1); //left arrow or J
  } else if (event.keyCode === 39 || event.keyCode === 76) {
    playerMove(+1); //right arrow of L
  } else if (event.keyCode === 40 || event.keyCode === 75) {
      playerDrop(); //Down arrow to drop or K
  } else if (event.keyCode === 81) {
      playerRotate(-1); // Q to rotate left
  } else if (event.keyCode === 87 || event.keyCode === 73) {
      playerRotate(1); // W to rotate Right or I
  } else if (event.keyCode === 80) {
      togglePause(); //Press P to pause
  } else if (event.keyCode === 27) {
      startGame(); //Press Esc the end game
  } else if (event.keyCode === 38) {
      playerRotate(1); //Press Up to rotate
  } else if (event.keyCode === 84) {
      musicToggle(); //Press t to toggle music
  }
});


//Touch controls
var myElement = document.getElementById('touchy');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
//mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
mc.on("panleft panright tap press", function(ev) {
//mc.on("panleft panright panup pandown tap press", function(ev) {
    // myElement.textContent = ev.type +" gesture detected.";
    console.log(ev);


    if (ev.type === "panleft") {
      playerMove(-1); //left arrow or J
    } else if (ev.type === "panright") {
      playerMove(+1); //right arrow of L
    } else if (ev.type === "pandown") {
        playerDrop(); //Down arrow to drop or K
    } else if (ev.type === "tap") {
        playerRotate(1); // W to rotate Right or I
    } else if (ev.type === "press") {
        togglePause(); //Press P to pause
    }
});




//loadScore();
playerReset();
updateScore();
update();
