const rows = 20;
const cols = 33;
const board = document.getElementById("board");
let jeu = Array.from(Array(rows), () => Array(cols).fill(0));
let interval;
let isRunning = false;

// Création du plateau avec des cellules cliquables
function createBoard() {
  board.innerHTML = ""; // Efface tout contenu précédent

  // Définit le style de la grille
  board.style.gridTemplateColumns = `repeat(${cols}, 20px)`;
  board.style.gridTemplateRows = `repeat(${rows}, 20px)`;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => toggleCell(i, j));
      cell.dataset.row = i;
      cell.dataset.col = j;
      board.appendChild(cell);
    }
  }
  updateBoard();
}


//Change la couleur de la case cliqué 
function toggleCell(row, col) {
  jeu[row][col] = jeu[row][col] === 1 ? 0 : 1;
  updateBoard();
}


//Met à jour la plateau
function updateBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.querySelector(`[data-row='${i}'][data-col='${j}']`);
      cell.classList.toggle("active", jeu[i][j] === 1);
    }
  }
}


//Compte les nombres de voisins "vivants" de chaque case
function countNeighbors(x, y) {
  let neighbors = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const nx = x + i;
      const ny = y + j;
      if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
        neighbors += jeu[nx][ny];
      }
    }
  }
  return neighbors;
}


//Calcul la prochaine évolution à afficher 
function nextStep() {
  const newGame = jeu.map((arr) => arr.slice());
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const neighbors = countNeighbors(i, j);
      if (jeu[i][j] === 1) {
        newGame[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
      } else {
        newGame[i][j] = neighbors === 3 ? 1 : 0;
      }
    }
  }
  jeu = newGame;
  updateBoard();
}


//Affiche de façon automatique l'évolution sur le plateau
function startAuto() {
  if (!isRunning) {
    interval = setInterval(nextStep, 400);
    isRunning = true;
  }
}


// Met en pause l'évolution
function pauseAuto() {
  clearInterval(interval);
  isRunning = false;
}

// Fonction pour réinitialiser la grille
function restartGame() {
  jeu = Array.from(Array(rows), () => Array(cols).fill(0)); // Réinitialise la grille
  updateBoard();
}

// Fonction pour remplir la grille de manière aléatoire
function randomizeGame() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      jeu[i][j] = Math.random() > 0.5 ? 1 : 0; // Remplit aléatoirement avec 1 ou 0
    }
  }
  updateBoard();
}


//Rend les boutons cliquables 
document.getElementById("stepBtn").addEventListener("click", nextStep);
document.getElementById("autoBtn").addEventListener("click", startAuto);
document.getElementById("pauseBtn").addEventListener("click", pauseAuto);
document.getElementById("restartBtn").addEventListener("click", restartGame);
document.getElementById("randomBtn").addEventListener("click", randomizeGame);
createBoard();
