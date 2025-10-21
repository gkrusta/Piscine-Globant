import { handleKeyPress } from './input.js'

export const GRID_SIZE = 4
export let grid = []
export let score = 0;
const gridContainer = document.querySelector('.grid-container')


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

export function render() {
	const cells = gridContainer.querySelectorAll('.cell')

	for (let r = 0; r < GRID_SIZE; r++) {
		for (let c = 0; c < GRID_SIZE; c++) {
			const idx = r * GRID_SIZE + c; // gives number from 0 t0 15
			const value = grid[r][c]
			cells[idx].textContent = value == 0 ? '' : value;
		}
	}
}

export function mergeLine(line) {
	line = line.filter(num => num != 0)

	for (let i = 0; i < line.length - 1; i++) {
		if (line[i] !== 0 && line[i] === line[i + 1]) {
			line[i] *= 2;
			score += line[i];
			document.getElementById('score').textContent = score;
			line[i + 1] = 0;
		}
	}
	line = line.filter(num => num != 0);
	while (line.length < GRID_SIZE) {
		line.push(0);
	}
	return line;
}


export function showMessage(text) {
	console.log(document.getElementById('message-text'));
	const overlay = document.getElementById('message-overlay');
	const msg = document.getElementById('message-text');

	msg.textContent = text;
	overlay.classList.remove('hidden');
	document.removeEventListener('keydown', handleKeyPress);
}

function initGame() {
	score = 0;
	document.getElementById('score').textContent = score;
	createGrid()
	addRandomCell()
	addRandomCell()
	render()
}

document.getElementById('restart-btn-overlay').addEventListener('click', () => {
	const overlay = document.getElementById('message-overlay');
	overlay.classList.add('hidden');
	initGame();
	document.addEventListener('keydown', handleKeyPress);
});

window.onload = initGame;
document.getElementById('restart-btn').addEventListener('click', initGame);
