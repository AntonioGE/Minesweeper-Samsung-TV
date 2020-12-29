const aroundDeltas = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
];

const grid = {
    cols: 8,
    rows: 8,
    width: 0,
    height: 0,
    values: [],
    overValues: []
};

function initGrid(numMines) {
    grid.width = grid.cols * tileSize * scale;
    grid.height = grid.rows * tileSize * scale;
    grid.values = [];
    grid.overValues = [];

    
    //Init grid
    for (var i = 0; i < grid.cols; i++) {
        grid.values[i] = [];
        grid.overValues[i] = [];
        for (var j = 0; j < grid.rows; j++) {
            grid.values[i][j] = CELL_0;
            grid.overValues[i][j] = CELL_PRESS;
        }
    }
    
    //Generate mines
    while (numMines > 0) {
        var col = Math.floor(Math.random() * grid.cols);
        var row = Math.floor(Math.random() * grid.rows);

        if (grid.values[col][row] != CELL_MINE) {
            grid.values[col][row] = CELL_MINE;
            incrementAroundCell(col, row);
            numMines--;
        }
    }
    
}

function drawGrid(ctx) {
    var xOffset = (width - grid.width) / 2;
    var yOffset = (height - grid.height) / 2;
    
    for (var i = 0; i < grid.cols; i++) {
        for (var j = 0; j < grid.rows; j++) {
            var imgIndex;

            if (grid.overValues[i][j] == CELL_PRESS) {
                imgIndex = CELL_PRESS;
            } else {
                imgIndex = grid.values[i][j];
            }
            
            ctx.drawImage(cellImgs[imgIndex],
                i * tileSize * scale + xOffset,
                j * tileSize * scale + yOffset,
                tileSize * scale,
                tileSize * scale);
        }
    }
}

function incrementAroundCell(col, row) {
    for (var i = 0; i < aroundDeltas.length; i++) {
        var x = col + aroundDeltas[i][0];
        var y = row + aroundDeltas[i][1];
        if (isInsideGrid(x, y)) {
            if (grid.values[x][y] != CELL_MINE) {
                grid.values[x][y]++;
            }
        }
    }
}

function isInsideGrid(col, row) {
    return (col >= 0 && col < grid.cols) && (row >= 0 && row < grid.rows);
}

function pressCell(col, row){
	if(!isInsideGrid(col, row)){
		return;
	}
	if(grid.overValues[col][row] != CELL_PRESS){
		return;
	}
	if(grid.values[col][row] == CELL_MINE){
		gameState = STATE_LOST;
		showMines();
	}else{
		floodCells(col, row);
		if(isGameFinished()){
			gameState = STATE_WIN;
		}
	}
}

function isGameFinished(){
	for (var i = 0; i < grid.cols; i++) {
        for (var j = 0; j < grid.rows; j++) {
            if (grid.overValues[i][j] == CELL_PRESS && grid.values[i][j] != CELL_MINE) {
            	return false;
            }
        }
	}
	return true;
}

function showMines(){
	for (var i = 0; i < grid.cols; i++) {
        for (var j = 0; j < grid.rows; j++) {
            if (grid.values[i][j] == CELL_MINE) {
            	grid.overValues[i][j] = -1;
            }
        }
	}
}

function floodCells(col, row){
	if(!isInsideGrid(col, row)){
		return;
	}
	if(grid.overValues[col][row] != CELL_PRESS){
		return;
	}
	grid.overValues[col][row] = -1;
	
	if(grid.values[col][row] == CELL_0){
		for (var i = 0; i < aroundDeltas.length; i++) {
			arguments.callee(col + aroundDeltas[i][0], row + aroundDeltas[i][1]);
	    }
	}
}