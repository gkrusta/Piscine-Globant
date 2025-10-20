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
	for (let c; c < GRID_SIZE; c++) {
		let col = []

		for (let r; r < GRID_SIZE; r++) {
			if (grid[r][c] != 0) col.push(grid[r][c]) 
		}
		
	}
	addRandomCell()
}