const STATE_PLAYING = 0;
const STATE_LOST = 1;
const STATE_WIN = 2;
var gameState = STATE_PLAYING;

var cursorX = 0;
var cursorY = 0;

var t0;
var time;

function initGameState() {
    gameState = STATE_PLAYING;
    t0 = performance.now();

    initGrid(10);
}


function tickGameState() {
    switch (gameState) {
        case STATE_PLAYING:
        	time = Math.floor((performance.now() - t0) / 1000);
        	
            if (arrowLeft) {
                if (cursorX > 0) {
                    cursorX--;
                }
            } else if (arrowRight) {
                if (cursorX < grid.cols - 1) {
                    cursorX++;
                }
            } else if (arrowUp) {
                if (cursorY > 0) {
                    cursorY--;
                }
            } else if (arrowDown) {
                if (cursorY < grid.rows - 1) {
                    cursorY++;
                }
            } else if (okButton) {
                pressCell(cursorX, cursorY);
            }
            break;
        case STATE_LOST:
            if (okButton) {
                initGameState();
            }
            break;
        case STATE_WIN:
            if (okButton) {
                initGameState();
            }
            break;
    }
}

function renderGameState(ctx) {
    //Draw grid
    drawGrid(ctx);
    drawCursor(ctx);
    drawTime(ctx);
    
    var xOffset = width / 2;

    switch (gameState) {
        case STATE_PLAYING:
 
            break;
        case STATE_LOST:
            ctx.font = "bold 100px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "red";
            ctx.strokeStyle = "black";
            ctx.lineWidth = "3";
            ctx.fillText('GAME OVER', xOffset, 0.45 * height);
            ctx.strokeText('GAME OVER', xOffset, 0.45 * height);

            
            ctx.font = "bold 100px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = 'yellow';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = "3";
            ctx.fillText('Press OK to play again', xOffset, 0.65 * height);
            ctx.strokeText('Press OK to play again', xOffset, 0.65 * height);
            break;
        case STATE_WIN:
            ctx.font = "bold 100px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "green";
            ctx.strokeStyle = 'black';
            ctx.lineWidth = "3";
            ctx.fillText('YOU WIN', xOffset, 0.45 * height);
            ctx.strokeText('YOU WIN', xOffset, 0.45 * height);

            
            ctx.font = "bold 100px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = 'yellow';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = "3";
            ctx.fillText('Press OK to play again', xOffset, 0.65 * height);
            ctx.strokeText('Press OK to play again', xOffset, 0.65 * height);
            break;
    }
}


function drawCursor(ctx) {
    var xOffset = (width - grid.width) / 2;
    var yOffset = (height - grid.height) / 2;

    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "red";
    ctx.rect(
        cursorX * tileSize * scale + xOffset,
        cursorY * tileSize * scale + yOffset,
        tileSize * scale,
        tileSize * scale);
    ctx.stroke();
}

function drawTime(ctx){
	
	ctx.font = "bold 50px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = 'black';
    //ctx.strokeStyle = 'black';
    //ctx.lineWidth = 2;
    ctx.fillText('Time: ' + time, 0.1 * width, 0.1 * height);
    //ctx.strokeText('Time: ' + time, 0.1 * width, 0.1 * height);
}