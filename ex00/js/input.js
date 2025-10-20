import { GRID_SIZE, grid, addRandomCell } from './game.js'


document.addEventListener('keydown', (e) => {
	switch(e.key) {
		case 'ArrowUp': moveUp(); break;
		case 'ArrowDown': moveDown(); break;
	    case 'ArrowLeft': moveLeft(); break;
    	case 'ArrowRight': moveRight(); break;
	}
});

function moveUp() {
	for (let c = 0; c < GRID_SIZE; c++) {
		let col = [];

		for (let r = 0; r < GRID_SIZE; r++) {
			if (grid[r][c] != 0)
				col.push(grid[r][c]);
		}
		while (col.length < GRID_SIZE)
			col.push(0);
		for (let r = 0; r < GRID_SIZE; r++) {
			grid[r][c] = col[r];
		}
	}
	addRandomCell();
	render();
}

function moveDown() {
	for (let c = 0; c < GRID_SIZE; c++) {
		let col = [];

		for (let r = 0; r < GRID_SIZE; r++) {
			if (grid[r][c] != 0)
				col.push(grid[r][c]);
		}
		while (col.length < GRID_SIZE)
			col.unshift(0);
		for (let r = 0; r < GRID_SIZE; r++) {
			grid[r][c] = col[r];
		}
	}
	addRandomCell();
	render();
}

function moveLeft() {
	for (let r = 0; r < GRID_SIZE; r++) {
		let row = [];

		for (let c = 0; c < GRID_SIZE; c++) {
			if (grid[r][c] != 0)
				row.push(grid[r][c]);
		}
		while (row.length < GRID_SIZE)
			row.push(0);
		for (let c = 0; c < GRID_SIZE; c++) {
			grid[r][c] = row[c];
		}
	}
	addRandomCell();
	render();
}

function moveRight() {
	for (let r = 0; r < GRID_SIZE; r++) {
		let row = [];

		for (let c = 0; c < GRID_SIZE; c++) {
			if (grid[r][c] != 0)
				row.push(grid[r][c]);
		}
		while (row.length < GRID_SIZE)
			row.unshift(0);
		for (let c = 0; c < GRID_SIZE; c++) {
			grid[r][c] = row[c];
		}
	}
	addRandomCell();
	render();
}