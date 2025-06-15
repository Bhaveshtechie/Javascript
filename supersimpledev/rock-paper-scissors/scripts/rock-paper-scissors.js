let score= JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
let result ='';

updateScoreElement();

/* if(score === null){ //here the condition can be also written as (!score)
score ={
    wins: 0,
    losses: 0,
    ties: 0
}
} */
    
function playGame(playerMove) {
  let computerMove = pickComputerMove();

  if(playerMove === 'scissors'){
    if(computerMove === 'rock'){
      result = 'You Lose.'
    } else if(computerMove === 'paper'){
      result = 'You Win.'
    } else if(computerMove === 'scissors'){
      result = 'Tie.'
    }
  } else if(playerMove === 'paper'){
    if(computerMove === 'rock'){
      result = 'You Win.'
    } else if(computerMove === 'paper'){
      result = 'Tie.'
    } else if(computerMove === 'scissors'){
      result = 'You Lose.'
    }
  } else if(playerMove === 'rock'){
    if(computerMove === 'rock'){
      result = 'Tie.'
    } else if(computerMove === 'paper'){
      result = 'You Lose.'
    } else if(computerMove === 'scissors'){
      result = 'You Win.'
    }
  }

  if(result === 'You Win.'){
    score.wins++;
  } else if(result === 'You Lose.'){
    score.losses++;
  } else if(result === 'Tie.'){
    score.ties++;
  }

  displayResultElement();
  displayMoveElement(playerMove,computerMove);
  updateScoreElement();

  localStorage.setItem('score', JSON.stringify(score));
}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function displayResultElement(){
  document.querySelector('.js-result')
    .innerHTML = `${result}`;
}

function displayMoveElement(playerMove,computerMove){
  document.querySelector('.js-moves')
    .innerHTML = `You picked <img src="/Javascript/supersimpledev/rock-paper-scissors/images/${playerMove}-emoji.png" class="move-icon" alt="${playerMove}">.
  <img src="/Javascript/supersimpledev/rock-paper-scissors/images/${computerMove}-emoji.png" class="move-icon" alt="${computerMove}"> was picked by Computer`;
}

function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';

  if(randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'rock';
  } else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  } else if(randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'scissors';
  }

  return computerMove;
}

function confirmReset(){
  document.querySelector('.reset-confirm').innerHTML = `<p> Are you sure you want to reset the score ?</p>
      <button class="yes-confirmed"> Yes </button>
      <button class="no-confirmed"> No </button>`;
  
  document.querySelector('.yes-confirmed').addEventListener('click',() => {resetScore();
    document.querySelector('.reset-confirm').innerHTML = ``;
  });
  document.querySelector('.no-confirmed').addEventListener('click',() => {
  document.querySelector('.reset-confirm').innerHTML = ``;
});
}

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  updateScoreElement();
  localStorage.setItem('score', JSON.stringify(score));
}

let autoPlayId = null;
function autoPlay(){
  let playerMove = pickComputerMove();
  playGame(playerMove);
}

function toggleOnOff(){
  const autoPlayBtn = document.querySelector('.auto-play-button');
  if(autoPlayId){
    clearInterval(autoPlayId);
    autoPlayId = null;
    autoPlayBtn.textContent = 'Auto Play';
  } else{
    autoPlayId = setInterval(autoPlay, 1000);
    autoPlayBtn.textContent = 'Stop Auto Play';
  }
}

const rockButtonEvent = document.querySelector('.rock-button').addEventListener('click',() => playGame('rock'));
const paperButtonEvent = document.querySelector('.paper-button').addEventListener('click',() => playGame('paper'));
const scissorsButtonEvent = document.querySelector('.scissors-button').addEventListener('click',() => playGame('scissors'));

const resetButtonEvent = document.querySelector('.reset-score-button').addEventListener('click',() => confirmReset());
const autoPlayButtonEvent = document.querySelector('.auto-play-button').addEventListener('click',() => toggleOnOff());

document.addEventListener('keydown', (event) => {
  if (event.key === 'r' || event.key === 'R') {
    playGame('rock');
  } else if (event.key === 'p' || event.key === 'P') {
    playGame('paper');
  } else if (event.key === 's' || event.key === 'S') {
    playGame('scissors');
  } else if (event.key === 'a' || event.key === 'A') {
    toggleOnOff();
  } else if (event.key === 'Backspace') {
    resetScore();
  }
});
