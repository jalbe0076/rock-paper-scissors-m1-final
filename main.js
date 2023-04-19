// VARIABLES & DATA MODEL

var gameOptions = ['rock', 'paper', 'scissor', 'spock', 'lizard'];
var currentGame = [];
var players = {
  user: { token: '🙂', name: 'Human', score: 0 }, 
  comp: { name: 'Computer', score: 0 }
};

  var gameVersion = document.querySelector('.game-selection');
  var gameButton = document.querySelector('button');
  var playerToken = document.querySelector('.player-token');
  var playerBanner = {
    token: document.querySelector('#token'),
    name: document.querySelector('.user-name'),
    score: document.querySelector('.player-wins'),
  };
  var computerScore = document.querySelector('computer-wins');
  var standardGame = document.querySelector('.standard-game');
  var variationGame = document.querySelector('.alien-game')
                      // var gameArea = document.querySelector('main');
  gameButton.disabled = true;

// EVENT LISTENERS 

playerToken.addEventListener('click', function(event) {
  adjustPlayer(event, players);
});

gameVersion.addEventListener('click', function(event) {
  enableGameBackgroundToggle(event);
  enableButton();
  getGameVersion(event);
});

gameButton.addEventListener('click', function(event) {

});

// gameArea.addEventListener('click', function(event) {
  // console.log(event)
  // getGameVersion(event);
// });

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

function adjustPlayer(event, players) {
  if (event.target.classList.contains('token')) {
    players.user.token = event.target.innerText;
    players.user.name = event.target.id;
    playerBanner.token.innerText = `${players.user.token}`;
    playerBanner.name.innerText = `${players.user.name}`;
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

function enableButton() {
  gameButton.disabled = false;
  gameButton.style.backgroundColor = '#4D194D'
}

function enableGameBackgroundToggle(event) {
  if (event.target.classList.contains('standard-game') || event.target.parentNode.classList.contains('standard-game')) {
    standardGame.style.backgroundColor = '#4D194D';
    variationGame.style.backgroundColor = '#4D194D65';
  } else if (event.target.classList.contains('alien-game') || event.target.parentNode.classList.contains('alien-game')) {
    standardGame.style.backgroundColor = '#4D194D65';
    variationGame.style.backgroundColor = '#4D194D';
  }
}

function toggleGameView() {

}