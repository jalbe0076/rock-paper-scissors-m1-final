// VARIABLES & DATA MODEL

var currentGame = [];
var gameData = {
  players: {},
  gameSelected: false,
  availableTokens: { Professor: '🧐', Devil: '😈', Goblin: '👺', Cat: '😼', Ghost: '👻', Alien: '👽', Clown: '🤡', Surprise: '💩' },
  numberOfRounds: 3,
  availableUserSelections: {
    rock: './assets/rock.png',
    paper: './assets/lines-paper.png',
    scissor: './assets/scissors.png',
    spock: './assets/flat-alien.png',
    lizard: './assets/flat-lizard.png'
  }
};
var tokens = {
  availableIcons: Object.keys(gameData.availableTokens),
  iconNames: Object.values(gameData.availableTokens)
};

var gameVersion = document.querySelector('.game-selection');
var playGameButton = document.querySelector('.play');
var roundsSelectedButtons = document.querySelector('.btn-round');
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
var standardGame = document.querySelector('.standard-game');
var variationGame = document.querySelector('.alien-game');
var playGame = document.querySelector('#play');

playGameButton.disabled = true;
round3.style.backgroundColor = '#4D194D';

// EVENT LISTENERS 

window.addEventListener('load', function() {
  getAvailableTokens(tokens);
});

playerToken.addEventListener('click', function(event) {
  if (event.target.classList.contains('token')) {
    gameData.players = populatePlayerBanners(event);
    enableButton(gameData);
  } 
});

gameVersion.addEventListener('click', function(event) {
  gameData.gameSelected = true;
  toggleGameVersionBackgroundColour(event);
  enableButton(gameData);
  getGameVersion(event, gameData);
});

playGameButton.addEventListener('click', function() {
  toggleGameView();
  displayPlayerOptions(gameData);
  if (playGameButton.innerText !== 'NEW GAME') {
    resetScore(gameData);
  }
});

playGame.addEventListener('click', function(event) {
  if (event.target.classList.contains('option')) {
    var playerSelection = getPlayerOption(event);
    var computerSelection = getRandomNumber(currentGame);
    getRoundWinner(getGameLogic(playerSelection, computerSelection), playerSelection, computerSelection, gameData);
    displayGameRound(playerSelection, computerSelection, gameData);
    var checkGameContinue = playNumberOfRounds(gameData);

  }

  if (checkGameContinue) {
    setTimeout(function() { displayPlayerOptions(gameData) }, 1500);
  } 
});

roundsSelectedButtons.addEventListener('click', function(event) {
  getNumberOfRounds(event, gameData);
});

// EVENT HANDLERS AND OTHER FUNCTIONS

function getRandomNumber(numberOfOptions) {
  return Math.floor(Math.random() * numberOfOptions.length);
}

function getAvailableTokens(tokens) {
  for (var i = 0; i < tokens.availableIcons.length; i++) {
    playerToken.innerHTML += `<p class="token hover" id="${tokens.availableIcons[i]}">${tokens.iconNames[i]}</p>`;
  }
}

function displayPlayerOptions(gameData) {
  playGame.innerHTML = '';
  var availableUserOptions = Object.keys(gameData.availableUserSelections);
  var numberOfUserOptions = availableUserOptions.length;
  subtitle.innerText = `Select your option!`;

  if (currentGame.length < 5) {
    numberOfUserOptions -= 2;
  } 

  for (var i = 0; i < numberOfUserOptions; i++) {
    playGame.innerHTML += `<img src="${Object.values(gameData.availableUserSelections)[i]}" alt="play ${availableUserOptions[i]}" class="hover option" id="${availableUserOptions[i]}">`;
  }
}

function getPlayerOption(event) {
  return Array.from(event.target.parentNode.children).indexOf(event.target);
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

function getGameVersion(event, gameData) {
  var playableGameOptions = Object.keys(gameData.availableUserSelections);
  var selectGameVersion = event.target.parentNode.classList;
  currentGame = [];

  if (event.target.classList.contains('standard-game') || selectGameVersion.contains('standard-game')) {
    currentGame = playableGameOptions.slice(0, 3);
  } else if (event.target.classList.contains('alien-game') || selectGameVersion.contains('alien-game')) {
    currentGame = playableGameOptions.slice(0, 5);
  }
  return currentGame;
}

function enableButton(gameData) {
  if (Object.keys(gameData.players).length && gameData.gameSelected) {
    playGameButton.disabled = false;
    playGameButton.style.backgroundColor = '#4D194D'
  }
}

function getGameLogic(playerSelection, computerSelection) {
  var playerOptions = currentGame.slice();
  var logicOptions = playerOptions.slice(0, playerSelection);
  
  if (playerSelection > computerSelection) {
    computerSelection += playerOptions.length;

    for (var i = 0; i < logicOptions.length; i++) {
      playerOptions.push(logicOptions[i])
    }
  }
  
  for (var i = playerSelection; i < playerOptions.length; i += 2) {
    if (playerSelection === computerSelection) {
      return 'tie'
    } else if (i === (computerSelection)) {
      return 'player'
    }
  }
  return 'computer'
}

function toggleGameVersionBackgroundColour(event) {
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
  roundsSelectedButtons.classList.toggle('hidden');

  if (!playGame.classList.contains('hidden')) {
    playGameButton.innerText = `NEW GAME`;
  } else {
    playGameButton.innerText = `PLAY!`;
  } 
}

function displayGameRound(playerSelectionIndex, computerSelectionIndex, gameData) {
  var options = gameData.availableUserSelections;
  playGame.innerHTML = '';
  playGame.innerHTML += `<img src="${Object.values(options)[playerSelectionIndex]}" alt="play ${Object.keys(options)[playerSelectionIndex]}" class="hover" id="${Object.keys(options)[playerSelectionIndex]}">`;
  playGame.innerHTML += `<img src="${Object.values(options)[computerSelectionIndex]}" alt="play ${Object.keys(options)[computerSelectionIndex]}" class="hover" id="${Object.keys(options)[computerSelectionIndex]}">`;
} 

function getRoundWinner(winner, playerSelectionIndex, computerSelectionIndex, gameData) {
  var options = gameData.availableUserSelections;

  if (winner === 'tie') {
    subtitle.innerText = `This round was a tie`;
  } else if (winner === 'player') {
    gameData.players.user.score += 1;
    subtitle.innerText = `${Object.keys(options)[playerSelectionIndex]} beats ${Object.keys(options)[computerSelectionIndex]}`;
    playerBanner.score.innerText = `Score: ${gameData.players.user.score}`;
  } else {
    gameData.players.comp.score += 1;
    subtitle.innerText = `${Object.keys(options)[playerSelectionIndex]} looses against ${Object.keys(options)[computerSelectionIndex]}`;
    computerBanner.score.innerText = `Score: ${gameData.players.comp.score}`;
  }
}

function resetScore(gameData) {
  gameData.players.user.score = 0;
  gameData.players.comp.score = 0;
  playerBanner.score.innerText = `Score: ${gameData.players.user.score}`;
  computerBanner.score.innerText = `Score: ${gameData.players.comp.score}`;
}

function getNumberOfRounds(event, gameData) {
  if (event.target.id === 'round3') {
    gameData.numberOfRounds = 3;
    round3.style.backgroundColor = '#4D194D';
    round5.style.backgroundColor = '#4D194D65';
    round7.style.backgroundColor = '#4D194D65';
  } else if (event.target.id === 'round5') {
    gameData.numberOfRounds = 5;
    round5.style.backgroundColor = '#4D194D';
    round3.style.backgroundColor = '#4D194D65';
    round7.style.backgroundColor = '#4D194D65';
  } else if (event.target.id === 'round7') {
    gameData.numberOfRounds = 7;
    round7.style.backgroundColor = '#4D194D';
    round3.style.backgroundColor = '#4D194D65';
    round5.style.backgroundColor = '#4D194D65';
  }
  return gameData.numberOfRounds;
}

function determineWinner(gameData) {
  var playerWinner = false;
  if (gameData.players.user.score > gameData.players.comp.score) {
    playerWinner = true;
  }
  return playerWinner;
}

function playNumberOfRounds(gameData) {
  if (gameData.players.user.score === gameData.numberOfRounds || gameData.players.comp.score === gameData.numberOfRounds) {
    var winner = determineWinner(gameData);
    setTimeout(function() { displayWinner(winner, gameData) }, 1500);
    return false;
  }
  return true;
}

function displayWinner(winner, gameData) {
  playGame.innerHTML = '';
  subtitle.innerText = '';
  if (winner) {
    playGame.innerHTML += `<p id="winner">${gameData.players.user.token} WINS!!!</p>`;
  } else {
    playGame.innerHTML += `<p id="winner">GAME OVER <br>${gameData.players.comp.token} WINS!!!</p>`;
  }
} 