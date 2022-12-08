let winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [1, 4, 7],
  [0, 3, 6],
  [2, 5, 8],
  [2, 4, 6],
];

let counterX = 0;
let counterO = 0;

let nextPlayer = "X";
let gameOver = false;
let isRessetable = false;
let nextMoveElement = document.querySelector(".turn");
let gameStateElement = document.querySelector(".winner");
let resultElement = document.querySelector(".result");
let board = new Array(9).fill("");
let list = document.querySelectorAll(".box");
let gameState = () => `The Winner is : ${nextPlayer}`;
let nextMove = () => `Next move is : ${nextPlayer}`;
let result = () => `The Result is: X - ${counterX} , O - ${counterO}`;

document.querySelector("button").addEventListener("click", resetHandler);

resultElement.textContent = result();
let items = Array.from(list).forEach((x) =>
  x.addEventListener("click", (e) => handleBoxClick(e))
);

function handleBoxClick(e) {
  const target = e.target;
  const box = target.dataset.boxIndex;

  if (gameOver || board[box] != "") {
    return;
  } else {
    board[box] = nextPlayer;
    target.textContent = nextPlayer;

    handleWinner();
    changePlayer();
  }
}

function changePlayer() {
  nextPlayer = nextPlayer === "X" ? "O" : "X";
  nextMoveElement.textContent = nextMove();
}

function handleWinner() {
  for (let i = 0; i <= 7; i++) {
    const winningCondtion = winningConditions[i];

    if (
      board[winningCondtion[0]] == "" ||
      board[winningCondtion[1]] == "" ||
      board[winningCondtion[2]] == ""
    ) {
      gameOver = false;
      continue;
    }

    if (
      board[winningCondtion[0]] == board[winningCondtion[1]] &&
      board[winningCondtion[1]] == board[winningCondtion[2]]
    ) {
      gameOver = true;
      isRessetable = true;
      gameStateElement.textContent = gameState();

      break;
    }
    if (!gameOver && !board.includes("")) {
      gameOver = true;
      isRessetable = true;
      gameStateElement.textContent = "Draw";
    }
  }
}

function resetHandler() {
  if (gameOver) {
    for (let i = 0; i <= 8; i++) {
      list[i].innerHTML = "";
      board[i] = "";
    }
  }

  if (
    nextPlayer == "X" &&
    gameStateElement.textContent != "Draw" &&
    isRessetable
  ) {
    counterO++;
  } else if (
    nextPlayer == "O" &&
    gameStateElement.textContent != "Draw" &&
    isRessetable
  ) {
    counterX++;
  }
  resultElement.textContent = result();
  isRessetable = false;
  gameOver = false;
  gameStateElement.textContent = "Game On";
}
