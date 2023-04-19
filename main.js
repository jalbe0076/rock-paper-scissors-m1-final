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

function getGameLogic(player, comp) {
  var logicWeapons = currentGame.slice(0, currentGame.length);
  var cutLogicWeapons = logicWeapons.slice(0, player);
  
  for (var i = 0; i < cutLogicWeapons.length; i++) {
    logicWeapons.push(cutLogicWeapons[i])
  }
  
  for (var i = player; i < logicWeapons.length; i += 2) {
    if (player === comp) {
      return 'tie'
    } else if (i === comp) {
      return 'player wins'
    }
  }
  return 'pc wins'
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