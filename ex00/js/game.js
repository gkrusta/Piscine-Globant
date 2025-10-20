export const GRID_SIZE = 4

export let rid = [] // hold grid values

const gridContainer = document.querySelector('.grid-container') // find grid container 


function createGrid() {
	gridContainer.innerHTML = ''

	grid = Array(4).fill().map(() => Array(4).fill(0));
	
	for (let d = 0; d < GRID_SIZE * GRID_SIZE; d++) {
		let cell = document.createElement('div')
		cell.classList.add('cell')
		gridContainer.appendChild(cell)
	}
}

function getEmptyCells() {
	let empty = []

	for (let r = 0; r < GRID_SIZE; r++) {
		for (let c = 0; c < GRID_SIZE; c++) {
			if (grid[r][c] == 0)
				empty.push({r, c});
		}
	}
	return empty;
}

export function addRandomCell() {
	let empty = getEmptyCells()
	let randomIndex = Math.floor(Math.random() * empty.length)
	let randomCell = empty[randomIndex]

	let newValue;
	if (Math.random() < 0.8) {
		newValue = 2;
	} else {
		newValue = 4;
	}

	grid[randomCell.r][randomCell.c] = newValue
}

function render() {
	const cells = gridContainer.querySelectorAll('.cell')

	for (let r = 0; r < GRID_SIZE; r++) {
		for (let c = 0; c < GRID_SIZE; c++) {
			const idx = r * GRID_SIZE + c; // gives number from 0 t0 15
			const value = grid[r][c]
			cells[idx].textContent = value == 0 ? '' : value;
		}
	}
}

function initGame() {
	createGrid()
	addRandomCell()
	addRandomCell()
	render()
}

window.onload = initGame;
document.getElementById('restart-btn').addEventListener('click', initGame);

function moveUp() {
  for (let c = 0; c < GRID_SIZE; c++) {
    let col = [];                       

    // Collect all non-zero numbers in this column from top to bottom
    for (let r = 0; r < GRID_SIZE; r++) {
      if (grid[r][c] !== 0) col.push(grid[r][c]);
    }

    // Pad with zeros at the end so the column stays length 4
    // (this "slides" numbers up and leaves empty spaces at the bottom)
    while (col.length < GRID_SIZE) col.push(0);

    // Write the compacted column back into the grid (top to bottom)
    for (let r = 0; r < GRID_SIZE; r++) grid[r][c] = col[r];
  }

  // After a move, spawn a new random tile (2 or 4) in an empty spot
  addRandomCell();

  // Redraw the board so the changes appear on screen
  render();
}
