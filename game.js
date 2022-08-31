var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = []
var start = false;
var level = 0;

function nextSequence() {
userClickedPattern = [];
  var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);

}

$(document).click(function() {
  console.log()
  if(!start){
    nextSequence();
  start = true;}

});


$(".btn").click(function() {
  userClickedPattern.push(this.id)
  playSound(this.id);
  animatePress(this.id);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}



function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    playSound("wrong");
    $("body").css("background-color","red");
    $("h1").text("Game Over, Press Any Key to Restart")

    setTimeout(function() {
      $("body").css("background-color", "");
    }, 200);
    gameOver()
  }
}

function gameOver(){
  level = 0;
  gamePattern =[];
  start = !start;
}

console.log(gamePattern);
