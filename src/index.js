import "./styles.css";

if (document.readyState !== "loading") {
  // Document ready, executing
  console.log("Document ready, executing");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    // Document was not ready, executing when loaded
    console.log("Document ready, executing after a wait");
    initializeCode();
  });
}

function initializeCode() {
  console.log("Initializing");

  renderBoard();
}

let turn = "x";
const x = "x";
const o = "o";
let tableBoard;

function renderBoard() {
  //renders the 5x5 board

  tableBoard = document.getElementById("tableBoard");

  for (let i = 0; i <= 4; i++) {
    let row = document.createElement("tr");
    tableBoard.append(row);
    for (let j = 0; j <= 4; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", "r" + i + "c" + j);
      row.append(cell);
      cell.onclick = function () {
        if (cell.innerHTML !== "") {
          return;
        }
        cell.innerHTML = turn;
        checkWinner(cell);
        turn = turn === x ? o : x;
      };
    }
  }
}

function checkWinner(cell) {
  let paske = cell.getAttribute("id");
  let won = false;
  console.log(paske);

  let horisontal = 0;
  let vertical = 0;
  let diag1 = 0;
  let diag2 = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      // checking rows
      let col = tableBoard.rows[i].cells[j];

      if (col.innerText === turn) {
        horisontal++;
      } else {
        horisontal = 0;
      }
      //checking columns
      col = tableBoard.rows[j].cells[i];
      if (col.innerText === turn) {
        vertical++;
      } else {
        vertical = 0;
      }
      //diagonal left to right
      if (i === j) {
        col = tableBoard.rows[j].cells[i];
        if (col.innerText === turn) {
          diag1++;
        } else {
          diag1 = 0;
        }
      }
      //diagonal right to left
      if (i === j) {
        col = tableBoard.rows[4 - j].cells[i];
        if (col.innerText === turn) {
          diag2++;
        } else {
          diag2 = 0;
        }
      }
      if (horisontal === 5 || vertical === 5 || diag1 === 5 || diag2 === 5) {
        won = true;
        break;
      }
    }
    horisontal = 0;
    vertical = 0;
  }
  if (won === true) {
    if (turn === x) {
      alert("Player 1 won!");
      return;
    } else if (turn === o) {
      alert("Player 2 won!");
      return;
    } else {
      alert("error, no one won");
    }
  }
}
