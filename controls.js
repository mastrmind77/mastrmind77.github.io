//player controls

//document.addEventListener('keydown', event => {
function keyListener(event) {
  if (event.type === 'keydown') {
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
      //paused = true;
      pauseGame(); //Press P to pause
  } else if (event.keyCode === 32) {
      hardDrop(); //Press Space to hard drop
  } else if (event.keyCode === 27) {
      startGame(); //Press Esc the end game
  } else if (event.keyCode === 38) {
      playerRotate(1); //Press Up to rotate
  } else if (event.keyCode === 84) {
      musicToggle(); //Press t to toggle music
  }
}
}


//Touch controls
var myElement = document.getElementById('touchy');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);

// mc.add(new Hammer.Swipe({
//     direction: Hammer.DIRECTION_HORIZONTAL,
//     threshold: 0
// }));

mc.get('swipe').set({ enable: true });
mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
mc.get('tap').set({ enable: true });


// we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
//mc.get('doubletap').recognizeWith('singletap');
// we only want to trigger a tap, when we don't have detected a doubletap
//mc.get('singletap').requireFailure('doubletap');

//mc.doubleTap.recognizeWith(singleTap);
//mc.singleTap.requireFailure([doubleTap]);
// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
//mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

//mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
// Single tap recognizer
//mc.add( new Hammer.Swipe({ event: 'swiperight' }) );
//mc.add( new Hammer.Swipe({ event: 'swipeleft' }) );

// listen to events...
//mc.on(" tap doubletap press panend panup panstart swipedown swipeup", function(ev) {
  mc.on(" tap press swiperight swipeleft swipedown swipeup", function(ev) {

//mc.on("panleft panright panup pandown tap press", function(ev) {
    // myElement.textContent = ev.type +" gesture detected.";
    console.log(ev.type);
    if (ev.type === "swipeleft") {
      playerMove(-1); //left arrow or J
    } else if (ev.type === "swiperight") {
      playerMove(+1); //right arrow of L
    } else if (ev.type === "swipedown") {
        hardDrop(); //Down arrow to drop or K
    } else if (ev.type === "doubletap") {
        hardDrop(); //hard drop with doubletap
    }else if (ev.type === "tap") {
        playerRotate(1); // W to rotate Right or I
    } else if (ev.type === "press") {
        pauseGame(); //Press P to pause
    }

    // if (ev.type === 'panend' && ev.velocityX < -0.3 && ev.distance > 10) {
    //     playerMove(-1);// Swipe left
    // } else if (ev.type === 'panend' && ev.velocityX > 0.3 && ev.distance > 10) {
    //     playerMove(+1);// Swipe right
    // } else if (ev.type === 'panend' && ev.velocityY > -0.3 && ev.distance > 10) {
    //     hardDrop();// Swipe down
    // } else if (ev.type === 'panend' && ev.velocityY > 0.3 && ev.distance > 10) {
    //     playerRotate(1);// Swipe up
    // } else if (ev.type === "press") {
    //      pauseGame(); //Press P to pause
    // } else if (ev.type === "tap") {
    //     playerRotate(1); // W to rotate Right or I
    // }
});
