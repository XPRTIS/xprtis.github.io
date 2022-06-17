/**
 * This file contains all elements related to the game operations. This includes
 * the initiating the game, handling key/mouse presses, timer functions, the
 * main game loop, audio, etc.
 */

var timeElapsed = {
    hazard: 0,
    source: 0,
    directionUpdate: 0,
    allTime: 0,
    bullet: 0
}
var stateStack = [];
var audioEnabled = false;
var supportedLanguages = ["en"]; // TODO: add Tamil once supported.
var languageMap = {
    "en": "English",
    "ta": "Tamil"
}
var gameText;

// Adds a new method to all arrays (arr.randomElement()) to return a random
// element within the array. Helpful for several functions in this application.
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
    // canvas.getContext exists first. This is also helpful if JavaScript is
    // disabled.
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        var startScreen = new StartScreenView();
        stateStack.push(startScreen);
        canvas.addEventListener('click', (event) => {
            let mousePosition = getMousePosition(canvas, event);
            handleMousePressed(mousePosition, context);
        }, false);

        var arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        document.addEventListener("keydown", function (event) {
            if (event.code === 'KeyA') { enableOrDisableMusic(); }
            // Separate out to different views so that keys only work in their
            // respective views:
            if (stateStack[stateStack.length - 1].name === "StartScreenView") {
                if (event.code === 'Space') {
                    changeToGameView();
                }

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
    } else {
        // Either browser doesn't support canvas or javascript is disabled.
        fallbackToErrorMessage();
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
        stateStack[stateStack.length - 1].renderAll(context);
    }

    // using requestAnimFrame to call mainloop again after a certain interval
    requestAnimFrame(() => mainLoop(context));
}

function update(dt) {
    // To do: we use timeElapsed only for spawning hazards. We might need
    // more for other time based events such as spawning sources, hazards
    // from sources, etc.
    timeElapsed.hazard += dt;
    timeElapsed.source += dt;
    timeElapsed.directionUpdate += dt;
    timeElapsed.bullet += dt;

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
        updateHazardDirection();
        timeElapsed.directionUpdate = 0;
    }

    if (timeElapsed.bullet > 5) {
        mainCharacter.bullets = mainCharacter.bullets < 15 ? 
                                mainCharacter.bullets + 1 :
                                mainCharacter.bullets;
    }
}

/* How to change canvas size code from:
   https://stackoverflow.com/questions/4037212/html-canvas-full-screen */
function resizeCanvas(canvas) {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

$(document).ready(function () { // Once the page is loaded...
    configureLanguageAndStartGame();
});

// https://stackoverflow.com/questions/46008760/how-to-build-multiple-language-website-using-pure-html-js-jquery
function configureLanguageAndStartGame() {
    let lang = localStorage.getItem('lang');
    if (lang == null) {
        setGameLanguage(supportedLanguages[0]);
        lang = localStorage.getItem('lang');
    };

    // Async call to get language from json file:
    fetch('./js/lang/' + lang + '.json')
        .then(response => response.json())
        .then(data => {
            gameText = data
            initCanvas();
        })
        .catch(error => console.error(error));

}

function setGameLanguage(languageCode) {
    try {
        if (!supportedLanguages.includes(languageCode)) {
            throw "Unsupported language.";
        }
        localStorage.setItem('lang', languageCode);
    } catch (error) {
        console.error(error);
        // Fallback to english:
        localStorage.setItem('lang', 'en');
    }
}

// Called when new language selection is chosen, we should refresh the page
// to reflect new language changes. 
function setGameLanguageAndReload(languageCode) {
    setGameLanguage(languageCode);
    document.location.reload();
}

// So that requestAnimationFrame works cross browser, see
// https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/ and
// https://github.com/jlongster/canvas-game-bootstrap/blob/a878158f39a91b19725f726675c752683c9e1c08/js/app.js#L22
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
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

function handleMousePressed(mousePosition) {
    handleButtonClicks(mousePosition.x, mousePosition.y)
    handleSourceClicks(mousePosition.x, mousePosition.y);
}

function handleButtonClicks(x, y) {
    var currentState = stateStack[stateStack.length - 1];
    if (currentState.name === "PauseView") {
        for (let i = 0; i < currentState.buttons.length; i++) {
            let currentButton = currentState.buttons[i];
            if (currentButton.wasClicked(x, y)) {
                // Restart game
                if (i === 0) {
                    stateStack.pop();
                    stateStack.pop(); // Pop twice to get to the main screen.
                    // Restart any data
                    resetGame();
                } else if (i === 1) {
                    stateStack.pop();
                }
            }
        }
    } else if (currentState.name === "GameOverView") {
        for (let i = 0; i < currentState.buttons.length; i++) {
            let currentButton = currentState.buttons[i];
            if (currentButton.wasClicked(x, y)) {
                if (i === 0) {
                    stateStack.pop();
                    stateStack.pop();
                    resetGame();
                }
            }
        }
    } else if (currentState.name === "StartScreenView") {
        var bgClicked = true;
        for (let i = 0; i < currentState.buttons.length; i++) {
            let currentButton = currentState.buttons[i];
            // wasClicked will call the function associated with the button too
            if (currentButton.wasClicked(x, y)) {
                bgClicked = false;
            }
        }

        // If something was tapped but it wasn't a different button, start
        // the game:
        if (bgClicked) changeToGameView();
    }

}

function enableOrDisableMusic() {
    audioEnabled = !audioEnabled;
    var audioElement = document.getElementById("bg-music");
    audioEnabled ? audioElement.play() : audioElement.pause();
}

function changeToGameView() {
    var gameView = new GameView();
    stateStack.push(gameView);

    // Most browsers (notably Chrome and Safari) don't allow
    // autoplaying music until the page is interacted with in
    // some way, so we'll only enable background music once the
    // game starts. 
    enableOrDisableMusic();
}

// In certain cases, we need to show an error message because canvas is not
// supported on the browser.
function fallbackToErrorMessage() {
    var noticeElement = document.createElement('h3');
    noticeElement.innerHTML = "Either JavaScript is disabled or the " +
        "browser you are using does not support this game. Please enable " +
        "JavaScript or use Google Chrome, which is supported.";
    noticeElement.style = "text-align: center";

    var boldWrapper = document.createElement('b');
    boldWrapper.appendChild(noticeElement);
    document.getElementById("wrapper").appendChild(noticeElement);
}