// Variables needed for game:
var lastTime = Date.now();

var character = {
    x: 0,
    y: 0,
    speed: 1,
    health: 100,
}
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
    points: 2,
    health: 100
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

var source = {
    smoke: stove,
}

var level = {
    levelNum: 1,
    maxScore: 16
};

var hazards = [];
var bullets = [];

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

// Where did we store the points for the character?
function addToScore(points) {
    mainCharacter.score += points;
}

const maxScore = [16, 20, 30, 30, 35, 40, 40]

// Returns true/false
function isLevelOver(level, currScore) {
    let levelNum = level
    let currentScore = currScore
    if (currentScore == maxScore[levelNum-1] || currentScore >= maxScore) {
        return true
    } else {
        return false
    }
    // Level is an object represented as:
    // {
    //     levelNum: 1,
    //     maxScore: 16,
    //     ...
    // }
}

/* Returns true/false based on if two rectangles overlap.
   Each object needs to have the following fields:
   {x, y, w, h} (where x and y are the TOP LEFT of the rectangle)
   (Hint 1: it might be helpful to draw out different scenarios on paper first!)
*/
function collisionCheckRect(object1, object2) {
    if (object1.x < object2.x + object2.w) {
        return false;
    }

    if (object1.x + object1.w < object2.x) {
        return false;
    }

    if (object1.y + object1.h < object2.y) {
        return false;
    }

    if (object1 > object2.y + object2.h) {
        return false;
    }

    return true;
}

// Returns true/false based on if two circles overlap.
// Each object needs to have the following fields: {cx, cy, r}
// (Hint 1: The distance between two points formula is needed for this calculation.)
// (Hint 2: it might be helpful to draw out differenct scenarios on paper first!)
function collisionCheckCircle(object1, object2) {
    let distance = ((object1.cx - object2.cx) ** 2 + (object1.cy - object2.cy) ** 2) ** 0.5;
    if (distance < (object1.r + object2.r)) {
        return true;
    }
    return false;
}

// Returns true/false based on if a rectangle and circle overlap.
// circleObj = {cx, cy, r}, rectObj = {x, y, w, h}
// (Hint: First figure out which edge of rect is closest to the circle)
function collisionCheckRectAndCircle(circleObj, rectObj) {

}

// Use bulletCollided to check for every single collision.
// Should return an array of all bullets that had collisions, which can be used
// to call removeBullets function from last session.
function checkAllCollisions(bullets, hazard) {
    var resultList = Array();
    for (let i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        for (let j = 0; j < hazards.length; j++) {
            var hazard = hazards[j];
            if (collisionCheckRect(bullet, hazard)) {
                resultList.push(bullet);
                break;
            }
        }
    }

    return resultList;
}

let imageUrl = 'assets/walking_girl_spritesheet.png';
this.spriteImage = new Image();
this.spriteImage.src = imageUrl;
var mainCharacter = new MainCharacter(spriteImage);

// Calculates deltaX and deltaY for bullet based on angle (in radians):
// (Hint: for cos and sin, use Math.cos and Math.sin)
function calculateDeltas(angle) {
    let speed = 10;
    return {dy: -1 * speed * Math.cos(angle), dx: speed * Math.sin(angle)}
}

class Bullet {
    constructor(angle) {
        this.angle = angle;
        this.x = bulletSource.x;
        this.y = bulletSource.y;
        this.w = 30;
        this.h = 10;
        let deltas = calculateDeltas(angle);
        this.dx = deltas.dx;
        this.dy = deltas.dy;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

}

function createBullet() {
    bullets.push(new Bullet(bulletSource.angle));
    mainCharacter.bullets -= 1; // this is optional 
}

// Get speed from character object's field.
function moveCharacterUp() {
    mainCharacter.y -= mainCharacter.speed;
    
}

function moveCharacterDown() {
    mainCharacter.y += mainCharacter.speed;
}

function moveBullets() {
    for (let i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        bullet.update();
    }
}

// Check if game is over, whether they won OR lost.
function isGameOver() {
    // Check if won:
    if (isLevelOver(level, mainCharacter.score)) {
        return true;
    }
    if (mainCharacter.health <= 0) {
        return true;
    }

    return false;
}

// Return script for evil enemy based on which level we're on, where 
// levelNum is an integer.
function getScript(levelNum) {
    return villanScripts[levelNum - 1];
}

// Create a new hazard from a source. A source should have a field called
// source.hazardName. Spawn it at the source's x and y coordinates.
function produceHazardFromSource(source) {
    hazard = {
        hazardName: source.hazardName,
        x: source.x,
        y: source.y,
        speed: 5
    }
    hazards.push(hazard);
}

// return {hazardName: __, points: ___} 
function spawnHazard(hazardName) {
    // Needs to spawn on left side, but randomly in terms of the y coordinate.
    // You should look up how to generate a random number between some bounds.
    let hazard = {
        hazardName: hazardName,
        x: 0,
        y: Math.floor(Math.random() * document.documentElement.clientHeight),
        w: 400,
        h: 400,
        speed: 10,
        imgUrl: 'assets/dirty_hand.png'
    }
    hazards.push(hazard);
}

var bulletSource = {
    x: (document.documentElement.clientWidth / 2) - 10,
    y: document.documentElement.clientHeight - 75,
    w: 20,
    h: 1000, // To elongate the source, not visible to user.
    angle: 0 // in radians
}

function moveBulletSourceLeft() {
    let angleDelta = 10; // in degrees
    let angleDeltaRadians = (Math.PI * angleDelta) / 180;
    
    bulletSource.angle -= angleDeltaRadians;
}

function moveBulletSourceRight() {
    let angleDelta = 10; // in degrees
    let angleDeltaRadians = (Math.PI * angleDelta) / 180;
    
    bulletSource.angle += angleDeltaRadians;
}

/*
    Lets say we create a hazard that can follow the player. How can we implement
    this? 

    Part of the challenge is that if the code always copies where the user is 
    and adjust the speed, the game is too difficult.

    One solution is to update the direction of the hazard every so often rather
    than all the time. Say every 2 seconds.

    Write a function that will update direction of a hazard given the current
    location of the character. Then add to the timer function for this to run
    only every 2 seconds.
*/

function updateHazardDirection(hazard, character) {

}
