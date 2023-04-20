// VARIABLES & DATA MODEL

var gameOptions = ['rock', 'paper', 'scissor', 'spock', 'lizard'];
var currentGame = [];
var players = {};
var gameSelected = false;
console.log(players)

  var gameVersion = document.querySelector('.game-selection');
  var gameButton = document.querySelector('button');
  var playerToken = document.querySelector('.player-token');
  var subtitle = document.querySelector('.user-action')
  var playerBanner = {
    token: document.querySelector('#token'),
    name: document.querySelector('.user-name'),
    score: document.querySelector('.player-wins'),
  };
  var computerBanner = {
    token: document.querySelector('.computer-token'),
    name: document.querySelector('.computer-title'),
    score: document.querySelector('.computer-score')
  }
  var computerScore = document.querySelector('computer-wins');
  var standardGame = document.querySelector('.standard-game');
  var variationGame = document.querySelector('.alien-game');
  var playGame = document.querySelector('#play');
  var playerScore = document.querySelector('.player-score');
 
  gameButton.disabled = true;

// EVENT LISTENERS 

playerToken.addEventListener('click', function(event) {
  if (event.target.classList.contains('token')) {
    players = populatePlayerBanners(event);
    enableButton();
  } 
});

gameVersion.addEventListener('click', function(event) {
  gameSelected = true;
  enableGameBackgroundToggle(event);
  enableButton();
  getGameVersion(event);
});

gameButton.addEventListener('click', function() {
  toggleGameView()
});

// EVENT HANDLERS AND OTHER FUNCTIONS

function getRandomNumber(numberOfOptions) {
  return Math.floor(Math.random() * numberOfOptions.length);
}

function getPlayerOption(gameOptions, event) {
  var userSelection = event.target.children;
  for (var i = 0; i < gameOptions.length; i++) {
    if (userSelection.id === gameOptions[i]) {
      return i;
    }
  }
}

function createPlayer(token, name) {
  return {
    user: { token: token, name: name, score: 0 }, 
    comp: { token: '🤖', name: 'Computer', score: 0 }
  };
}

function populatePlayerBanners(event) {
  var player = createPlayer(event.target.innerText, event.target.id);
  playerBanner.token.innerText = `${player.user.token}`;
  playerBanner.name.innerText = `${player.user.name}`;
  playerScore.innerText = `Score: ${player.user.score}`;
  computerBanner.token.innerText = `${player.comp.token}`;
  computerBanner.name.innerText = `${player.comp.name}`;
  computerBanner.score.innerText = `Score: ${player.comp.score}`;

  return player;
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
  if (players.user.token.length && gameSelected) {
    gameButton.disabled = false;
    gameButton.style.backgroundColor = '#4D194D'
  }
}

function getGameLogic(player, comp) {
  var logicOptions = currentGame.slice(0, currentGame.length);
  var cutLogicOptions = logicOptions.slice(0, player);

  for (var i = 0; i < cutLogicOptions.length; i++) {
    logicOptions.push(cutLogicOptions[i])
  }
  
  for (var i = player; i < logicOptions.length; i += 2) {
    if (player === comp) {
      return 'tie'
    } else if (i === comp) {
      return 'player wins'
    }
  }
  return 'pc wins'
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
  if (playGame.classList.contains('hidden')) {
    subtitle.innerText = `Select your option!`;
  } else {
    subtitle.innerText = `Select your avatar & game!`;
  }

  playGame.classList.toggle('hidden');
  playerToken.classList.toggle('hidden');
  gameVersion.classList.toggle('hidden');

  if (currentGame.length === 5) {
    playGame.children[3].classList.toggle('hidden');
    playGame.children[4].classList.toggle('hidden');
  }

  if (!playGame.classList.contains('hidden')) {
    gameButton.innerText = `NEW GAME`;
  } else {
    gameButton.innerText = `PLAY!`;
  } 
}