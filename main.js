// VARIABLES & DATA MODEL

let currentGame = [];
let gameData = {
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
  },
  scoreHistory: []
};

const gameVersion = document.querySelector('.game-selection');
const playGameButton = document.querySelector('.play');
const roundsSelectedButtons = document.querySelector('.game-number-btn');
const round3 = document.querySelector('#round3');
const round5 = document.querySelector('#round5');
const round7 = document.querySelector('#round7');
const playerToken = document.querySelector('.player-token');
const subtitle = document.querySelector('.user-action');
const playerBanner = {
  token: document.querySelector('#token'),
  name: document.querySelector('.user-name'),
  score: document.querySelector('.player-score')
};
const computerBanner = {
  token: document.querySelector('.computer-token'),
  name: document.querySelector('.computer-title'),
  score: document.querySelector('.computer-score')
};
const standardGame = document.querySelector('.standard-game');
const variationGame = document.querySelector('.alien-game');
const playGame = document.querySelector('#play');
const viewHistoryButton = document.querySelector('.history');
const clearHistory = document.querySelector('.history-clear');

playGameButton.disabled = true;

// EVENT LISTENERS 

window.addEventListener('load', function() {
  getAvailableTokens(gameData);
  setScoreHistory(gameData);
});

playerToken.addEventListener('click', function(event) {
  if (event.target.classList.contains('token')) {
    gameData.players = populatePlayerBanners(event);
    enableButton(gameData);
  } 
});

gameVersion.addEventListener('click', function(event) {
  gameData.gameSelected = true;
  toggleGameVersionContainerBackgroundColour(event);
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
  let checkGameEnd;

  if (event.target.classList.contains('option')) {
    const playerSelection = getPlayerOption(event);
    const computerSelection = getRandomNumber(currentGame);
    getRoundWinner(getGameLogic(playerSelection, computerSelection), playerSelection, computerSelection, gameData);
    displayGameRound(playerSelection, computerSelection, gameData);
    checkGameEnd= finishNumberOfRounds(gameData);
  }

  if (checkGameEnd) {
    const scoreHistory = saveWinsToHistory(gameData); 
    getWinHistoryFromLocalStorage(scoreHistory);
  } else if (!checkGameEnd && playGameButton.innerText === `NEW GAME`){
    setTimeout(function() { displayPlayerOptions(gameData) }, 1500);
  }
});

roundsSelectedButtons.addEventListener('click', function(event) {
  getNumberOfRounds(event, gameData);
});

viewHistoryButton.addEventListener('click', function() {
  toggleHistory();
  removePlayerBanners();
  populateScoreHistory(gameData);
});

clearHistory.addEventListener('click', function() {
  clearScoreHistory(gameData);
});

// EVENT HANDLERS AND OTHER FUNCTIONS

function getRandomNumber(numberOfOptions) {
  return Math.floor(Math.random() * numberOfOptions.length);
}

function getAvailableTokens(gameData) {
  const availableIcons = Object.keys(gameData.availableTokens);
  const iconNames = Object.values(gameData.availableTokens);

  availableIcons.forEach(tokenName => {
    playerToken.innerHTML += `<p class="token hover" id="${tokenName}">${iconNames[availableIcons.indexOf(tokenName)]}</p>`;
  })
}

function displayPlayerOptions(gameData) {
  playGame.innerHTML = '';
  let availableUserOptions = Object.keys(gameData.availableUserSelections);
  let availableOptionPics = Object.values(gameData.availableUserSelections);
  subtitle.innerText = `Select your option!`;

  if (currentGame.length < 5) {
    availableUserOptions = availableUserOptions.slice(0, 3);
    availableOptionPics = availableOptionPics.slice(0, 3);
  } 

  availableUserOptions.forEach(fighter => {
    playGame.innerHTML += `<img src="${availableOptionPics[availableUserOptions.indexOf(fighter)]}" alt="play ${fighter}" class="hover option" id="${fighter}">`;
  });
}

function getPlayerOption(event) {
  return Array.from(event.target.parentNode.children).indexOf(event.target);
}

function createPlayer(tokenIndexPosition, gameData) {
  const tokenIcon = Object.values(gameData.availableTokens)[tokenIndexPosition];
  const userName = Object.keys(gameData.availableTokens)[tokenIndexPosition];
  return {
    user: { token: tokenIcon, name: userName, score: 0 }, 
    comp: { token: '🤖', name: 'Computer', score: 0 }
  };
}

function populatePlayerBanners(event) {
  const players = createPlayer(getPlayerOption(event), gameData);
  playerBanner.token.innerText = `${players.user.token}`;
  playerBanner.name.innerText = `${players.user.name}`;
  playerBanner.score.innerText = `Score: ${players.user.score}`;
  computerBanner.token.innerText = `${players.comp.token}`;
  computerBanner.name.innerText = `${players.comp.name}`;
  computerBanner.score.innerText = `Score: ${players.comp.score}`;

  return players;
}

function removePlayerBanners() {
  playerBanner.token.classList.toggle('hidden');
  playerBanner.name.classList.toggle('hidden');
  playerBanner.score.classList.toggle('hidden');
  computerBanner.token.classList.toggle('hidden');
  computerBanner.name.classList.toggle('hidden');
  computerBanner.score.classList.toggle('hidden');
}

function getGameVersion(event, gameData) {
  const playableGameOptions = Object.keys(gameData.availableUserSelections);
  const selectGameVersion = event.target.parentNode.classList;
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
    playGameButton.classList.add('btn-active')
    playGameButton.classList.toggle('hover')
  }
}

function modifyFighterOptions(playerSelection, computerSelection) {
  const playerOptions = currentGame.slice();
  playerOptions
    .slice(0, playerSelection)
    .forEach(fighter => playerOptions.push(fighter));
  
  return playerOptions;
}

function getGameLogic(playerSelection, computerSelection) {
  let playerOptions = currentGame.slice();
  
  if (playerSelection === computerSelection) {
    return 'tie';
  } 
  
  if (playerSelection > computerSelection) {
    computerSelection += playerOptions.length;
    playerOptions = modifyFighterOptions(playerSelection, computerSelection);
  }

  for (let i = playerSelection; i < playerOptions.length; i += 2) {
    if (i === (computerSelection)) {
      return 'player';
    }
  }
  return 'computer';
}

function toggleGameVersionContainerBackgroundColour(event) {
  if (event.target.classList.contains('standard-game') || event.target.parentNode.classList.contains('standard-game')) {
    standardGame.classList.add('btn-active'); 
    variationGame.classList.remove('btn-active');
  } else if (event.target.classList.contains('alien-game') || event.target.parentNode.classList.contains('alien-game')) {
    standardGame.classList.remove('btn-active');
    variationGame.classList.add('btn-active');
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
  viewHistoryButton.classList.toggle('hidden');

  if (!playGame.classList.contains('hidden')) {
    playGameButton.innerText = `NEW GAME`;
  } else {
    playGameButton.innerText = `PLAY!`;
  } 
}

function displayGameRound(playerSelectionIndex, computerSelectionIndex, gameData) {
  const options = gameData.availableUserSelections;
  playGame.innerHTML = '';
  playGame.innerHTML += `<img src="${Object.values(options)[playerSelectionIndex]}" alt="play ${Object.keys(options)[playerSelectionIndex]}" class="hover" id="${Object.keys(options)[playerSelectionIndex]}">`;
  playGame.innerHTML += `<img src="${Object.values(options)[computerSelectionIndex]}" alt="play ${Object.keys(options)[computerSelectionIndex]}" class="hover" id="${Object.keys(options)[computerSelectionIndex]}">`;
} 

function getRoundWinner(winner, playerSelectionIndex, computerSelectionIndex, gameData) {
  const options = gameData.availableUserSelections;

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
    round3.classList.add('btn-active');
    round5.classList.remove('btn-active');
    round7.classList.remove('btn-active');
  } else if (event.target.id === 'round5') {
    gameData.numberOfRounds = 5;
    round5.classList.add('btn-active');
    round3.classList.remove('btn-active');
    round7.classList.remove('btn-active');
  } else if (event.target.id === 'round7') {
    gameData.numberOfRounds = 7;
    round7.classList.add('btn-active');
    round3.classList.remove('btn-active');
    round5.classList.remove('btn-active');
  }
  return gameData.numberOfRounds;
}

function determinePlayerWinner(gameData) {
  let playerWinner = false;
  if (gameData.players.user.score > gameData.players.comp.score) {
    playerWinner = true;
  }
  return playerWinner;
}

function finishNumberOfRounds(gameData) {
  if (gameData.players.user.score === gameData.numberOfRounds || gameData.players.comp.score === gameData.numberOfRounds) {
    const winner = determinePlayerWinner(gameData);
    setTimeout(function() { displayWinner(winner, gameData) }, 1500);
    return true;
  }
  return false;
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

function toggleHistory() {
  if (playGame.classList.contains('hidden')) {
    subtitle.innerText = `Score history`;
  } else {
    subtitle.innerText = `Select your avatar & game!`;
  }

  playGame.classList.toggle('hidden');
  playerToken.classList.toggle('hidden');
  gameVersion.classList.toggle('hidden');
  roundsSelectedButtons.classList.toggle('hidden');
  playGameButton.classList.toggle('hidden');
  clearHistory.classList.toggle('hidden');
}

function populateScoreHistory(gameData) {
  const tokenList = gameData.scoreHistory.map(availablePlayers => availablePlayers.token);
  const playerWinsList = gameData.scoreHistory.map(availablePlayers => availablePlayers.wins);
  const playerLosesList = gameData.scoreHistory.map(availablePlayers => availablePlayers.loses);
  playGame.innerHTML = '';

  playGame.innerHTML += `
    <div class="flex-container">
      <h3 class="player-history">Avatar</h3>
      <h3 class="player-history">Wins</h3>
      <h3 class="player-history">Loses</h3>
    </div>`;
  for (var i = 0; i <tokenList.length; i++) {
    playGame.innerHTML += `
      <div class="flex-container">
        <p class="player-history">${tokenList[i]}</p>
        <p class="player-history">${playerWinsList[i]}</p>
        <p class="player-history">${playerLosesList[i]}</p>
      </div>`;
  }
}

function saveWinsToHistory(gameData) {
  const winner = determinePlayerWinner(gameData);
  const selectedPlayerToken = gameData.players.user.token;
  const currentTokenIndexPosition = gameData.scoreHistory
    .map(availablePlayers => availablePlayers.token)
    .indexOf(selectedPlayerToken);

  if (winner) {
    gameData.scoreHistory[currentTokenIndexPosition].wins += 1;
  } else {
    gameData.scoreHistory[currentTokenIndexPosition].loses += 1;
  }
  return gameData.scoreHistory;
}

function getWinHistoryFromLocalStorage(scoreHistory) {
  if (scoreHistory) {
    localStorage.setItem('scoreToStorage', JSON.stringify(scoreHistory));
  } 
  return JSON.parse(localStorage.getItem('scoreToStorage'));
}

function clearScoreHistory(gameData) {
  localStorage.clear();
  for (var i = 0; i < gameData.scoreHistory.length; i++) {
    gameData.scoreHistory[i].wins = 0;
    gameData.scoreHistory[i].loses = 0;
  }
  setScoreHistory(gameData);
  populateScoreHistory(gameData);
}

function setScoreHistory(gameData) {
  gameData.scoreHistory = getWinHistoryFromLocalStorage() || [
    {token: '🧐', wins: 0, loses: 0},
    {token: '😈', wins: 0, loses: 0},
    {token: '👺', wins: 0, loses: 0},
    {token: '😼', wins: 0, loses: 0},
    {token: '👻', wins: 0, loses: 0},
    {token: '👽', wins: 0, loses: 0},
    {token: '🤡', wins: 0, loses: 0},
    {token: '💩', wins: 0, loses: 0}  
  ];
}