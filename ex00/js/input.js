import { GRID_SIZE, grid, addRandomCell, mergeLine, render, showMessage } from './game.js'


export function handleKeyPress(e) {
	switch(e.key) {
		case 'ArrowUp': moveUp(); break;
		case 'ArrowDown': moveDown(); break;
	    case 'ArrowLeft': moveLeft(); break;
    	case 'ArrowRight': moveRight(); break;
	}
}

document.addEventListener('keydown', handleKeyPress);

function moveUp() {
	for (let c = 0; c < GRID_SIZE; c++) {
		let col = [];

		for (let r = 0; r < GRID_SIZE; r++) {
			if (grid[r][c] != 0)
				col.push(grid[r][c]);
		}
		col = mergeLine(col);
		for (let r = 0; r < GRID_SIZE; r++) {
			grid[r][c] = col[r];
		}
	}
	addRandomCell();
	render();
	checkGameStatus();
}

function moveDown() {
	for (let c = 0; c < GRID_SIZE; c++) {
		let col = [];

		for (let r = 0; r < GRID_SIZE; r++) {
			if (grid[r][c] != 0)
				col.push(grid[r][c]);
		}
		col = mergeLine(col.reverse()).reverse();
		for (let r = 0; r < GRID_SIZE; r++) {
			grid[r][c] = col[r];
		}
	}
	addRandomCell();
	render();
	checkGameStatus();
}

function moveLeft() {
	for (let r = 0; r < GRID_SIZE; r++) {
		grid[r] = mergeLine(grid[r]);
	}
	addRandomCell();
	render();
	checkGameStatus();
}

function moveRight() {
	for (let r = 0; r < GRID_SIZE; r++) {
		grid[r] = mergeLine(grid[r].reverse()).reverse();
	}
	addRandomCell();
	render();
	checkGameStatus();
}

function checkGameStatus() {
	// if winning
	for (let r = 0; r < GRID_SIZE; r++) {
		for (let c = 0; c < GRID_SIZE; c++) {
			if (grid[r][c] == 32) {
				setTimeout(() => showMessage("You win!"), 100);
				return;
			}
		}
	}
	// if there are empty cells
	for (let r = 0; r < GRID_SIZE; r++) {
		for (let c = 0; c < GRID_SIZE; c++) {
			if (grid[r][c] == 0)
				return;
		}
	}
	// if there are any possible combos
	for (let r = 0; r < GRID_SIZE; r++) {
		for (let c = 0; c < GRID_SIZE; c++) {
			let curr = grid[r][c];
			if ((r < GRID_SIZE - 1 && grid[r + 1][c] == curr) || (c < GRID_SIZE - 1 && grid[r][c + 1] == curr))
				return;
		}
	}
	setTimeout(() => showMessage("You lose!"), 100);
}
