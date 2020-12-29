const CELL_0 = 0;
const CELL_1 = 1;
const CELL_2 = 2;
const CELL_3 = 3;
const CELL_4 = 4;
const CELL_5 = 5;
const CELL_6 = 6;
const CELL_7 = 7;
const CELL_8 = 8;
const CELL_MINE = 9;
const CELL_PRESS = 10;
const CELL_FLAG = 11;


var cellImgs;

function initCellImgArray() {
	cellImgs = new Array(12);
	cellImgs[CELL_0] = document.getElementById("cell_0");
	cellImgs[CELL_1] = document.getElementById("cell_1");
	cellImgs[CELL_2] = document.getElementById("cell_2");
	cellImgs[CELL_3] = document.getElementById("cell_3");
	cellImgs[CELL_4] = document.getElementById("cell_4");
	cellImgs[CELL_5] = document.getElementById("cell_5");
	cellImgs[CELL_6] = document.getElementById("cell_6");
	cellImgs[CELL_7] = document.getElementById("cell_7");
	cellImgs[CELL_8] = document.getElementById("cell_8");
	cellImgs[CELL_MINE] = document.getElementById("cell_mine");
	cellImgs[CELL_PRESS] = document.getElementById("cell_press");
	cellImgs[CELL_FLAG] = document.getElementById("cell_flag");
}


