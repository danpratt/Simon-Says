var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameHasStarted = false;
var level = 0;

$(".btn").click(function() {
  if (!gameHasStarted) {
    gameHasStarted = true;
    nextSequence();
    return;
  }
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function(event) {
  if (!gameHasStarted) {
    gameHasStarted = true;
    nextSequence();
  }
});

function nextSequence() {
  level += 1;
  $("#level-title").text("Level " + level);
  var randonIndex = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randonIndex];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeTo(100, 0.3, function() {
    $(this).fadeTo(500, 1.0);
  });
  playSound(randomChosenColor);
}

/**
 * @param {String} name The name of the sound to play.
 */
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/**
* @param {String} color The color of the button being animated.
*/
function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

/**
* @param {Int} index The index of the level being checked
*/
function checkAnswer(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    console.log("Correct");
    if (index + 1 === level) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // game over
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
      startOver();
    }, 200);
  }
}

function startOver() {
  gameHasStarted = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
