// Variables needed for game:
var lastTime = Date.now();

// Create an array for the different hazards that exist:

var offScreenSource = {};

var soap = {
    // ...
};

var dirtyHands = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    damage: 5,
    imageUrl: "images/dirtyHand.jpg",
    speed: 10,
    source: offScreenSource,
    prevention: soap,
    points = 2,
    health = 100
};

var stove = {
    points: 10
};

var smoke = {
    x: 0,
    y: 0,
    width: 20,
    height: 20, 
    source: stove,
    damage: 5,
}; // Fill in with another hazard

var hazards = [dirtyHands, smoke]; // fill in the rest with your code.

// Create an array for the scripts of evil villan
// (Find them on the game design document)

var villanScripts = ["",
                    "He will run out of energy soon, and then my filthy hands will grab him!  I just hope he does not like fruits and vegetables!",
                    "Curses, he does eat fruits and vegetables.  He knows smoke from fires hurts his eyes.  I hope he does not also know it hurts his lungs! As long as his family cooks on a traditional fire, that smoke helps me out!",
                    "Zounds!  Even my dangerous smoke did not stop him.  Next round I’ll get him.  He won’t be able to avoid the poop on the ground.  And that poop carries worms that crawl into his bare feet and then live inside him!  They become my allies inside his body!",
                    "Curses!  Those worms are too slow.  Happily, flies that land on outdoor poop also fly to his food!  When he eats food with poop and germs on it, I will have him!  Each villager doing his morning walk to the fields is now helping me spread disease!",
                    "Even flies did not carry poop to him.  But he cannot avoid water!  Without boiling, chlorine or a filter, the water will carry poop and germs to him‼",
                    "...",
                    "Zounds!  He used chlorine [and a filter] to remove poop and germs from the water.  But there is no way to keep people with measles away from him.  He has not been immunized, so any nearby measles will spread to him quickly! ",
                    ];

// Easy Functions

function addToScore(points) {
    // ...
}

// Returns true/false
function isLevelOver(level, currScore) {
    // Level is an object represented as:
    // {
    //     levelNum: 1,
    //     maxScore: 16,
    //     ...
    // }
}

// Get speed from character object's field.
function moveCharacter() {
    // ...
}

function moveBullets(bullets) {
    // ...
}

// Check if game is over, whether they won OR lost.
function isGameOver() {
    // ...
}

// Return script for evil enemy based on which level we're on, where 
// levelNum is an integer.
function getScript(levelNum) {
    // ...
}

// Medium 
// Create a new hazard from a source. A source should have a field called
// source.hazard. Spawn it at the source's x and y coordinates.
function produceHazardFromSource(source) {
    // ...
}

function spawnHazard(hazard) {
    // Needs to spawn on left side, but randomly in terms of the y coordinate.
    // You should look up how to generate a random number between some bounds.
}

// Returns true/false based on if a bullet hit a hazard.
// Check to make sure the hazard can be hit in the first place.
// Assume we already implemented collisionCheck, a function that takes in two 
// coordinates and checks if they are overlapping. We will implement this 
// in a later week.
function bulletCollided(bullet, hazard) {
    // ...
}

// Use bulletCollided to check for every single collision.
// Should return an array of all bullets that had collisions, which can be used
// to call removeBullets function from last session.
function checkAllCollisions(bullets, hazard) {
    // ...
}

// These are all time-based functions. How would we call them based on 
// time passed?
function mainLoop(context) {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt); // Some update function

    lastTime = now;

    requestAnimFrame(() => mainLoop(context));
}

function update(dt) {
    // Do something to update...
    
}

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

// To use key pressed:
// window.onkeydown = function() {} or use lambda (window.onkeydown = () => {})
// Use this to implement when you press space to spawn a bullet if enough 
// bullets are available.

// ...