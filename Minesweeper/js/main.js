var width, height;
var scale = 1.0;
const tileSize = 100;

var hueValue = 0.0;
var hueDelta = 0.001;


var canvas;
var ctx;


var arrowRight = false;
var arrowLeft = false;
var arrowUp = false;
var arrowDown = false;
var okButton = false;

//Initialize function
var init = function() {
    // TODO:: Do your initialization job
    console.log('init() called');

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Something you want to do when hide or exit.
        } else {
            // Something you want to do when resume.
        }
    });

    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
            case 37: //LEFT arrow
                arrowLeft = true;
                break;
            case 38: //UP arrow
                arrowUp = true;
                break;
            case 39: //RIGHT arrow
                arrowRight = true;
                break;
            case 40: //DOWN arrow
                arrowDown = true;
                break;
            case 13: //OK button 
                okButton = true;
                break;
            case 10009: //RETURN button
                tizen.application.getCurrentApplication().exit();
                break;
            default:
                console.log('Key code : ' + e.keyCode);
                break;
        }
    });

    loadResources();
    initCanvas();
    initGameState();
    loop();
};
// window.onload can work without <body onload="">
window.onload = init;


function loop() {
    tick();
    render();

    clearInput();

    setTimeout(loop, 10);
}

function tick() {
    hueValue += hueDelta;
    tickGameState();
}

function render() {
    //Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Draw background
    var rgb = HSVtoRGB(hueValue % 1.0, 0.5, 1.0);
    var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, 'white');
    grd.addColorStop(1, rgbToHex(rgb.r, rgb.g, rgb.b));
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Render Game State
    renderGameState(ctx);
}


function loadResources() {
    initCellImgArray();
}

function initCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    scale = canvas.height / (tileSize * grid.rows);
    width = canvas.width;
    height = canvas.height;
}

function clearInput() {
    arrowRight = false;
    arrowLeft = false;
    arrowUp = false;
    arrowDown = false;
    okButton = false;
}


function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}