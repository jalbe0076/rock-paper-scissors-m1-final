// VARIABLES & DATA MODEL

var gameOptions = ['rock', 'paper', 'scissor', 'spock', 'lizard'];
var currentGame = [];
var game = {
  players: {},
  gameSelected: false,
  availableTokens: { Professor: '🧐', Devil: '😈', Goblin: '👺', Cat: '😼', Ghost: '👻', Alien: '👽', Clown: '🤡', Surprise: '💩' }
};

var availableOptions = {
  rock: './assets/rock.png',
  paper: './assets/lines-paper.png',
  scissor: './assets/scissors.png',
  spock: './assets/flat-alien.png',
  lizard: './assets/flat-lizard.png'
};
var numberOfRounds = 3;

var gameVersion = document.querySelector('.game-selection');
var gameButton = document.querySelector('.play');
var roundButtons = document.querySelector('.btn-round');
var round3 = document.querySelector('#round3');
var round5 = document.querySelector('#round5');
var round7 = document.querySelector('#round7');
var playerToken = document.querySelector('.player-token');
var subtitle = document.querySelector('.user-action');
var playerBanner = {
  token: document.querySelector('#token'),
  name: document.querySelector('.user-name'),
  score: document.querySelector('.player-score'),
};
var computerBanner = {
  token: document.querySelector('.computer-token'),
  name: document.querySelector('.computer-title'),
  score: document.querySelector('.computer-score')
};
var computerScore = document.querySelector('computer-wins');
var standardGame = document.querySelector('.standard-game');
var variationGame = document.querySelector('.alien-game');
var playGame = document.querySelector('#play');

gameButton.disabled = true;
round3.style.backgroundColor = '#4D194D';

// EVENT LISTENERS 

window.addEventListener('load', function() {
  getAvailableTokens(game);
});

playerToken.addEventListener('click', function(event) {
  if (event.target.classList.contains('token')) {
    game.players = populatePlayerBanners(event);
    enableButton();
  } 
});

gameVersion.addEventListener('click', function(event) {
  game.gameSelected = true;
  enableGameBackgroundToggle(event);
  enableButton();
  getGameVersion(event);
});

gameButton.addEventListener('click', function() {
  toggleGameView();
  displayPlayerOptions(availableOptions);
  if (gameButton.innerText !== 'NEW GAME') {
    resetScore(game);
  }
});

playGame.addEventListener('click', function(event) {
  if (event.target.classList.contains('option')) {
    var playerSelection = getPlayerOption(currentGame, event);
    var computerSelection = getRandomNumber(currentGame);
    getRoundWinner(getGameLogic(playerSelection, computerSelection), playerSelection, computerSelection, availableOptions, game);
    displayGameRound(playerSelection, computerSelection, availableOptions);
    var checkGameContinue = playNumberOfRounds(numberOfRounds, game);
    if (checkGameContinue) {
      setTimeout(function() { displayPlayerOptions(availableOptions) }, 1500);
    } 
  }
});

roundButtons.addEventListener('click', function(event) {
  getNumberOfRounds(event);
});

// EVENT HANDLERS AND OTHER FUNCTIONS

function getRandomNumber(numberOfOptions) {
  return Math.floor(Math.random() * numberOfOptions.length);
}

function getAvailableTokens(game) {
  for (var i = 0; i < Object.keys(game.availableTokens).length; i++) {
    playerToken.innerHTML += `<p class="token hover" id="${Object.keys(game.availableTokens)[i]}">${Object.values(game.availableTokens)[i]}</p>`;
  }
}

function displayPlayerOptions(options) {
  playGame.innerHTML = '';
  var numberOfCurrentOptions = Object.keys(availableOptions).length;
  subtitle.innerText = `Select your option!`;

  if (currentGame.length < 5) {
    numberOfCurrentOptions -= 2;
  } 

  for (var i = 0; i < numberOfCurrentOptions; i++) {
    playGame.innerHTML += `<img src="${Object.values(options)[i]}" alt="play ${Object.keys(options)[i]}" class="hover option" id="${Object.keys(options)[i]}">`;
  }
}

function getPlayerOption(gameOptions, event) {
  var userSelection = event.target;

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
  playerBanner.score.innerText = `Score: ${player.user.score}`;
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
  if (Object.keys(game.players).length && game.gameSelected) {
    gameButton.disabled = false;
    gameButton.style.backgroundColor = '#4D194D'
  }
}

function getGameLogic(player, comp) {
  var logicOptions = currentGame.slice(0, currentGame.length);
  var cutLogicOptions = logicOptions.slice(0, player);
  
  if (player > comp) {
    comp += logicOptions.length;
    for (var i = 0; i < cutLogicOptions.length; i++) {
      logicOptions.push(cutLogicOptions[i])
    }
  }
  
  for (var i = player; i < logicOptions.length; i += 2) {
    if (player === comp) {
      return 'tie'
    } else if (i === (comp)) {
      return 'player'
    }
  }
  return 'computer'
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
  roundButtons.classList.toggle('hidden');

  if (!playGame.classList.contains('hidden')) {
    gameButton.innerText = `NEW GAME`;
  } else {
    gameButton.innerText = `PLAY!`;
  } 
}

function displayGameRound(player, computer, options) {
  playGame.innerHTML = '';
  playGame.innerHTML += `<img src="${Object.values(options)[player]}" alt="play ${Object.keys(options)[player]}" class="hover" id="${Object.keys(options)[player]}">`;
  playGame.innerHTML += `<img src="${Object.values(options)[computer]}" alt="play ${Object.keys(options)[computer]}" class="hover" id="${Object.keys(options)[computer]}">`;
} 

function getRoundWinner(winner, player, computer, options, game) {
  if (winner === 'tie') {
    subtitle.innerText = `This round was a tie`;
  } else if (winner === 'player') {
    game.players.user.score += 1;
    subtitle.innerText = `${Object.keys(options)[player]} beats ${Object.keys(options)[computer]}`;
    playerBanner.score.innerText = `Score: ${game.players.user.score}`;
  } else {
    game.players.comp.score += 1;
    subtitle.innerText = `${Object.keys(options)[player]} looses against ${Object.keys(options)[computer]}`;
    computerBanner.score.innerText = `Score: ${game.players.comp.score}`;
  }
}

function resetScore(game) {
  game.players.user.score = 0;
  game.players.comp.score = 0;
  playerBanner.score.innerText = `Score: ${game.players.user.score}`;
  computerBanner.score.innerText = `Score: ${game.players.comp.score}`;
}

function getNumberOfRounds(event) {
  if (event.target.id === 'round3') {
    numberOfRounds = 3;
    round3.style.backgroundColor = '#4D194D';
    round5.style.backgroundColor = '#4D194D65';
    round7.style.backgroundColor = '#4D194D65';
  } else if (event.target.id === 'round5') {
    numberOfRounds = 5;
    round5.style.backgroundColor = '#4D194D';
    round3.style.backgroundColor = '#4D194D65';
    round7.style.backgroundColor = '#4D194D65';
  } else if (event.target.id === 'round7') {
    numberOfRounds = 7;
    round7.style.backgroundColor = '#4D194D';
    round3.style.backgroundColor = '#4D194D65';
    round5.style.backgroundColor = '#4D194D65';
  }
  return numberOfRounds;
}

function determineWinner(game) {
  var playerWinner = false;
  if (game.players.user.score > game.players.comp.score) {
    playerWinner = true;
  }
  return playerWinner;
}

function playNumberOfRounds(numberOfRounds, game) {
  if (game.players.user.score === numberOfRounds || game.players.comp.score === numberOfRounds) {
    var winner = determineWinner(game);
    displayWinner(winner, game);
    return false;
  }
  return true;
}

function displayWinner(winner, game) {
  playGame.innerHTML = '';
  subtitle.innerText = '';
  if (winner) {
    playGame.innerHTML += `<p id="winner">${game.players.user.token} WINS!!!</p>`;
  } else {
    playGame.innerHTML += `<p id="winner">GAME OVER <br>${game.players.comp.token} WINS!!!</p>`;
  }
} 