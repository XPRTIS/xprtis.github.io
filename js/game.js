var timeElapsed = {
    hazard: 0,
    source: 0,
    directionUpdate: 0,
    allTime: 0
}
var stateStack = [];

Array.prototype.randomElement = function () {
    return this[Math.floor((Math.random() * this.length))];
}

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
        var startScreen = new StartScreenView();
        stateStack.push(startScreen);
        canvas.addEventListener('click', (event) => {
            let mousePosition = getMousePosition(canvas, event);
            handleMousePressed(mousePosition, context);
        }, false);

        var arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        document.addEventListener("keydown", function(event) {
            // Tip: You can use a combination of keyup, keydown, and boolean
            // (true/false) flags to know whether or not a user is holding
            // down a key.

            // Separate out to different views so that keys only work in their
            // respective views:
            if (stateStack[stateStack.length - 1].name === "StartScreenView") {
                if (event.code === 'Space') {
                    // var levelView = new LevelView();
                    // stateStack.push(levelView)
                    var gameView = new GameView();
                    stateStack.push(gameView);
                }
            // } 
            // else if (stateStack[stateStack.length - 1].name === "LevelView") {
            //     if (event.code === 'Space') {
                
            //         var gameView = new GameView();
            //         stateStack.push(gameView);
            //     }
            } else if (stateStack[stateStack.length - 1].name === "GameView") {
                if (event.code === "KeyB") {
                    stateStack.pop();
                }

                if (event.code === "KeyP") {
                    stateStack.push(new PauseView());
                }

                if (event.code === 'Space') {
                    createBullet();
                }

                if (arrowKeys.includes(event.code)) {
                    mainCharacter.moveCharacter(event.code);
                }
    
            } else if (stateStack[stateStack.length - 1].name === "NextLevelView") {
                if (event.code === 'Space') {
                    stateStack.pop();
                }
            }
        });

        // Start the game by starting the main loop.
        mainLoop(context);
    }
}


function mainLoop(context) {
    if (stateStack[stateStack.length - 1].name === "GameView") {
        var now = Date.now();
        var dt = (now - lastTime) / 1000.0;
        update(dt); // Some update function
        lastTime = now;
    }

    context.clearRect(0, 0, document.documentElement.clientWidth, 
        document.documentElement.clientHeight);
    
    if (stateStack.length === 0) {
        // This is bad and should never happen, but in this case just
        // render only the View:
        var view = new View();
        view.renderAll(context);
    } else {
        // Get the current state and render its view.
        stateStack[stateStack.length - 1].renderAll(context);    }

    // using requestAnimFrame to call mainloop again after a certain interval
    requestAnimFrame(() => mainLoop(context)); 

    if (isLevelOver() === true) {
        stateStack.push(startScreen);
    }
    
}

function update(dt) {
    // To do: we use timeElapsed only for spawning hazards. We might need
    // more for other time based events such as spawning sources, hazards
    // from sources, etc.
    timeElapsed.hazard += dt;
    timeElapsed.source += dt;
    timeElapsed.directionUpdate += dt;

    // If we have information we need to update for every frame, write it here.
    moveBullets();
    moveHazards();

    var allCollisions = checkAllCollisions(bullets, hazards);
    
    removeBullets(bullets, allCollisions.bulletRemoveList);
    removeHazards(hazards, allCollisions.hazardRemoveList);

    var hazardsOffScreen = checkHazardsOffSceen(hazards);
    removeHazards(hazards, hazardsOffScreen);
    
    if (timeElapsed.hazard > 5) {
        spawnHazard();
        timeElapsed.hazard = 0;
    }

    if (timeElapsed.source > 5 && sources.length === 0) {
        spawnSource();
        timeElapsed.source = 0;
    }

    if (timeElapsed.directionUpdate > 3) {
        // updateHazardDirection();
        timeElapsed.directionUpdate = 0;
    }
}

/* How to change canvas size code from:
   https://stackoverflow.com/questions/4037212/html-canvas-full-screen */
function resizeCanvas(canvas) {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

$(document).ready(function() { // Once the page is loaded...
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

function handleMousePressed(mousePosition, context) {
    if (stateStack[stateStack.length - 1].name === "PauseView") {
        handleButtonClicks(mousePosition.x, mousePosition.y)
    }
    
    handleSourceClicks(mousePosition.x, mousePosition.y);
}

function handleButtonClicks(x, y) {
    let buttonWidth = 100;
    let buttonHeight = 30;
    let buttonX0 = document.documentElement.clientWidth / 2 - buttonWidth;
    let buttonY0 = document.documentElement.clientHeight / 2 - buttonHeight;
    let buttonX1 = buttonX0 + 2 * buttonWidth;
    let buttonY1 = buttonY0 + 2 * buttonHeight;

    if (x > buttonX0 && x < buttonX1 && y > buttonY0 && y < buttonY1) {
        stateStack.pop();
        stateStack.pop(); // Pop twice to get to the main screen.
        // Restart any data
        resetGame();
    }

    buttonY0 += 75;
    buttonY1 += 75;
    if (x > buttonX0 && x < buttonX1 && y > buttonY0 && y < buttonY1) {
        // resume
        stateStack.pop();
    }

}