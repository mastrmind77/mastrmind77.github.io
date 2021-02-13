var timeStart = 0;
var timeEnd = 0;
var timeGame = 0;

function gameTimer() {

// get total seconds between the times
//var delta = Math.abs(timeEnd - timeStart);
var delta = timeEnd - timeStart;
//calculate (and subtract) whole days
var days = Math.floor(delta / 86400);
delta -= days * 86400;

//calculate (and subtract) whole hours
var hours = Math.floor(delta / 3600) % 24;
delta -= hours * 3600;

//calculate (and subtract) whole minutes
var minutes = Math.floor(delta / 60) % 60;
delta -= minutes * 60;

// what's left is seconds
var seconds = delta % 60;  // in theory the modulus is not required
timeGame = minutes + ':' + seconds
}
