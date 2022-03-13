var timeElapsed = 0;

function initCanvas() {
    var canvas = document.createElement('canvas');
    canvas.id = 'canvas-id';
    resizeCanvas(canvas);
    document.getElementById('wrapper').appendChild(canvas);
    // Add resizeCanvas function to resize so that it changes dynamically:
    window.onresize = () => resizeCanvas(canvas);

    // Technically some browsers don't support canvas, so make sure that 
    // canvas.getContext exists first.
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        canvas.addEventListener('click', (event) => {
            let mousePosition = getMousePosition(canvas, event);
            handleMousePressed(mousePosition, context);
        }, false);

        document.addEventListener("keydown", function(event) {
            // Tip: You can use a combination of keyup, keydown, and boolean
            // (true/false) flags to know whether or not a user is holding
            // down a key.
            if (event.code === 'Space') {
                createBullet();
                console.log(bullets);
            }

            if (event.code === 'ArrowUp') {
                moveCharacterUp();
            }
            
            if (event.code === 'ArrowDown') {
                moveCharacterDown();
            }

            if (event.code === 'ArrowLeft') {
                moveBulletSourceLeft();
            }

            if (event.code === 'ArrowRight') {
                moveBulletSourceRight();
            }
        });

        // Start the game by starting the main loop.
        mainLoop(context);
    }
}

function mainLoop(context) {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt); // Some update function

    lastTime = now;

    context.clearRect(0, 0, document.documentElement.clientWidth, 
        document.documentElement.clientHeight);
    renderAll(context);

    // using requestAnimFrame to call mainloop again after a certain interval
    requestAnimFrame(() => mainLoop(context)); 
}

function update(dt) {
    // To do: we use timeElapsed only for spawning hazards. We might need
    // more for other time based events such as spawning sources, hazards
    // from sources, etc.
    timeElapsed += dt;
    // If we have information we need to update for every frame, write it here.
    moveBullets();
    moveHazards();

    if (timeElapsed > 5) {
        spawnHazard();
        timeElapsed = 0;
    }
}

/* How to change canvas size code from:
   https://stackoverflow.com/questions/4037212/html-canvas-full-screen */
   function resizeCanvas(canvas) {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

$(document).ready(function() {
    initCanvas();
});

// So that requestAnimationFrame works cross browser, see
// https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/ and
// https://github.com/jlongster/canvas-game-bootstrap/blob/a878158f39a91b19725f726675c752683c9e1c08/js/app.js#L22
var requestAnimFrame = (function() {
    return window.requestAnimationFrame     ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        window.oRequestAnimationFrame       ||
        window.msRequestAnimationFrame      ||
        function(callback) {
            // This is where the framerate is set, in milliseconds.
            window.setTimeout(callback, 1000 / 60);
        };
})();

// How to call functions based on events (controller functions):

// Returns the mouse click coordinates wrapped in an object {x: _, y: _}
// https://stackoverflow.com/questions/24384368/simple-button-in-html5-canvas/24384882
function getMousePosition(canvas, event) {
    let canvasRect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - canvasRect.left,
        y: event.clientY - canvasRect.top
    };
}

function handleMousePressed(mousePosition, context) {}