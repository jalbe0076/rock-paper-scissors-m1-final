// VARIABLES & DATA MODEL

var gameOptions = ['rock', 'paper', 'scissor', 'lizard', 'spock'];
var currentGame = [];
var players = [
  {
    name: 'Human',
    score: 0
  }, {
    name: 'Computer',
    score: 0
  }];

  var gameVersion = document.querySelector('.game-selection');

// EVENT LISTENERS 

gameVersion.addEventListener('click', function(event) {
  // console.log( )
  getGameVersion(event);
});

// EVENT HANDLERS AND OTHER FUNCTIONS

function getRandomWeapon(numberOfWeapons) {
  return Math.floor(Math.random() * numberOfWeapons.length);
}

function getPlayerWepon(gameWepons, event) {
  var userSelection = event.target.children;
  for (var i = 0; i < gameWepons.length; i++) {
    if (userSelection.id === gameWepons[i]) {
      return i;
    }
  }
}

function getStandardGameLogic(player, comp) {
  console.log(indexOf(player))
}

function getGameVersion(event) {
  currentGame = [];
  if (event.target.classList.contains('standard-game') || event.target.parentNode.classList.contains('standard-game')) {
    currentGame = gameOptions.slice(0, 3)
  } else if (event.target.classList.contains('alien-game') || event.target.parentNode.classList.contains('alien-game')) {
    currentGame = gameOptions.slice(0, 5)
  }
  return currentGame;
}