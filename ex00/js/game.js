const GRID_SIZE = 4

let grid = [] // hold grid values

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

	for (r = 0; r < GRID_SIZE; r++) {
		for (c = 0; c < GRID_SIZE; c++) {
			if (grid[r][c] == 0)
				empty.push({r, c});
		}
	}
	return empty;
}

function addRandomCell() {
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

	for (r = 0; r < GRID_SIZE; r++) {
		for (c = 0; c < GRID_SIZE; c++) {
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

window.onload = createGrid;

document.getElementById('restart-btn').addEventListener('click', initGame);
