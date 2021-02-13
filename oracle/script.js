// Get the canvas node and the drawing context
const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');

// set the width and height of the canvas
const w = canvas.width = document.body.offsetWidth;
const h = canvas.height = document.body.offsetHeight;



    //var canvas = document.getElementById('myCanvas');
    //var ctx = canvas.getContext('2d');

    //ctx.fillStyle = 'red';  // a color name or by using rgb/rgba/hex values
     // text and position



// draw a black rectangle of width and height same as that of the canvas
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, w, h);
// ctx.font = 'italic 18px Arial';
// ctx.textAlign = 'center';
// ctx.textBaseline = 'middle';
// ctx.fillText('Hello World!', 150, 50);


const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);

//Initial popup to start app
var i = 0;
do {
  window.alert("Ask the Oracle your fate:");
  i++;
}
while (i<1);

var sentence = ["Your path to enlightenment is through a ",
                "I see in your future a ",
                "Your future self is pleased by a ",
                "Hard work is reward enough with a "];

var task = ["clean kitchen",
            "clean litterbox",
            "clean bathroom",
            "completed load of laundry",
            "vaccuumed rug",
            "clean dishwasher",
            "clean table",
            "trip to the garbage"];

let randomSentence = sentence[Math.floor(Math.random() * sentence.length)];
let randomTask = task[Math.floor(Math.random() * task.length)];
let result = randomSentence + randomTask

var runCount = 0;

function matrix () {

  runCount++;
  // Draw a semitransparent black rectangle on top of previous drawing
  ctx.fillStyle = '#0001';
  ctx.fillRect(0, 0, w, h);

  // Set color to green and font to 15pt monospace in the drawing context
  ctx.fillStyle = '#0f0';
  ctx.font = '15pt monospace';

  // for each column put a random character at the end
  ypos.forEach((y, ind) => {
    // generate a random character
    const text = String.fromCharCode(Math.random() * 128);

    // x coordinate of the column, y coordinate is already given
    const x = ind * 20;
    // render the character at (x, y)
    ctx.fillText(text, x, y);

    // randomly reset the end of the column if it's at least 100px high
    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
    // otherwise just move the y coordinate for the column 20px down,
    else ypos[ind] = y + 20;
  });

  if (runCount == 100) {
    window.alert(result);
  }
}

// render the animation at 20 FPS.
setInterval(matrix, 50);
