// Variables needed for game:
var lastTime = Date.now();
var character = {
    x: 0,
    y: 0,
    speed: 1,
    health: 100,
}
var level = 1;
var levelInfo = getLevelInfo(level);
var hazards = [];
var bullets = [];
var sources = [];
var villanScripts = ["",
                    "He will run out of energy soon, and then my filthy hands will grab him!  I just hope he does not like fruits and vegetables!",
                    "Curses, he does eat fruits and vegetables.  He knows smoke from fires hurts his eyes.  I hope he does not also know it hurts his lungs! As long as his family cooks on a traditional fire, that smoke helps me out!",
                    "Zounds!  Even my dangerous smoke did not stop him.  Next round I’ll get him.  He won’t be able to avoid the poop on the ground.  And that poop carries worms that crawl into his bare feet and then live inside him!  They become my allies inside his body!",
                    "Curses!  Those worms are too slow.  Happily, flies that land on outdoor poop also fly to his food!  When he eats food with poop and germs on it, I will have him!  Each villager doing his morning walk to the fields is now helping me spread disease!",
                    "Even flies did not carry poop to him.  But he cannot avoid water!  Without boiling, chlorine or a filter, the water will carry poop and germs to him‼",
                    "...",
                    "Zounds!  He used chlorine [and a filter] to remove poop and germs from the water.  But there is no way to keep people with measles away from him.  He has not been immunized, so any nearby measles will spread to him quickly! ",
                    ];

// Where did we store the points for the character?
function addToScore(points) {
    console.log("Adding " + points + " to score.");
    if (points < 0 && mainCharacter.score + points >= 0) {
        mainCharacter.score += points;
    }

    else if (points > 0) {
        mainCharacter.score += points;
    }

    if (isLevelOver()) {
        level += 1;
        levelInfo = getLevelInfo(level);
    }
    
}

const maxScore = [1, 20, 30, 30, 35, 40, 40]; // TO DO change back to 16

function isLevelOver() {
    return mainCharacter.score >= levelInfo.maxPoints;
}

/* Returns true/false based on if two rectangles overlap.
   Each object needs to have the following fields:
   {x, y, w, h} (where x and y are the TOP LEFT of the rectangle)
*/
function collisionCheckRect(object1, object2) {
    if (object1.x + object1.w < object2.x) {
        return false;
    }

    if (object1.x > object2.x + object2.w) {
        return false;
    }

    if (object1.y + object1.h < object2.y) {
        return false;
    }

    if (object1.y > object2.y + object2.h) {
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

// Should return an array of all bullets that had collisions, which can be used
// to call removeBullets function from last session.
function checkAllCollisions(bullets, hazards) {
    var bulletRemoveList = Array();
    var hazardRemoveList = Array();

    for (let i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        for (let j = 0; j < hazards.length; j++) {
            var hazard = hazards[j];
            if (collisionCheckRect(bullet, hazard)) {
                bulletRemoveList.push(bullet);
                hazardRemoveList.push(hazard);
                break;
            }
        }
    }

    return { bulletRemoveList: bulletRemoveList, 
             hazardRemoveList: hazardRemoveList };
}

function checkHazardsOffSceen(hazards) {
    var removeList = [];
    for (let i = 0; i < hazards.length; i++) {
        var hazard = hazards[i];
        
        // Hazard is outside of the screen, remove and lower score.
        if (hazard.x >= document.documentElement.clientWidth || 
            hazard.y + hazard.h < 0) {
            addToScore(-1 * hazard.points);
            removeList.push(hazard);
        }
    }

    return removeList;
}

let imageUrl = 'assets/walking_girl_spritesheet.png';
this.spriteImage = new Image();
this.spriteImage.src = imageUrl;
var mainCharacter = new MainCharacter(spriteImage);

// Calculates deltaX and deltaY for bullet based on angle (in radians):
function calculateDeltas(angle, speed) {
    return {dy: -1 * speed * Math.cos(angle), dx: speed * Math.sin(angle)}
}

function getBulletSourceCordsFromAngle(angle) {
    let x0 = bulletSource.x;
    let y0 = bulletSource.y;
    
    // See https://study.com/skill/learn/how-to-find-the-coordinates-of-a-polygon-after-a-rotation-explanation.html
    // for formula for finding the coordinates after rotation. 
    return {x: x0 * Math.cos(angle) + y0 * Math.sin(angle), 
            y: -1 * x0 * Math.sin(angle) + y0 * Math.cos(angle)}
}

class Bullet {
    constructor(angle) {
        this.angle = angle;
        let coords = getBulletSourceCordsFromAngle(angle);
        this.x = coords.x;
        this.y = coords.y;
        this.w = 30;
        this.h = 10;
        let speed = 10;
        let deltas = calculateDeltas(angle, speed);
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

function handleSourceClicks(x, y) {
    for (let i = 0; i < sources.length; i++) {
        let source = sources[i];
        source.wasClicked(x, y);
    }
}

// Return script for evil enemy based on which level we're on, where 
// levelNum is an integer.
function getScript(levelNum) {
    return villanScripts[levelNum - 1];
}

function spawnHazard() {
    // Some hazards are spawned from sources. Use the "canSpawn" function
    // before choosing a random hazard to spawn.
    var allHazards = levelInfo.availableHazards.filter(name => canSpawn(name));

    if (allHazards.length > 0) {
        var hazardName = allHazards.randomElement();
        hazards.push(newInstanceFromName(hazardName));
    }
}

function moveHazards() {
    for (let i = 0; i < hazards.length; i++) {
        hazards[i].moveHazard();
    }
}

function spawnSource() {
    if (levelInfo.availableSources.length > 0) {
        var sourceName = levelInfo.availableSources.randomElement();
        sources.push(newInstanceFromName(sourceName));
    }
}

var bulletSource = {
    x: (document.documentElement.clientWidth / 2) - 10,
    y: document.documentElement.clientHeight - 75,
    w: 20,
    h: 1000, // To elongate the source, not visible to user.
    angle: 0 // in radians
}

function moveBulletSourceLeft() {
    let angleDelta = 5; // in degrees
    let angleDeltaRadians = (Math.PI * angleDelta) / 180;
    
    bulletSource.angle -= angleDeltaRadians;
}

function moveBulletSourceRight() {
    let angleDelta = 5; // in degrees
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

function updateHazardDirection() {
    // First, calculate the angle between the character and the hazard:
    for (let i = 0; i < hazards.length; i++) {
        let hazard = hazards[i];
        if (hazard.x >= 3 * document.documentElement.clientWidth / 4) {
            // Don't change direction if it's already close to the end of the
            // screen.
            continue;
        }
        let angle = Math.atan2(mainCharacter.y - hazard.y, 
                               mainCharacter.x - hazard.x);
        
        console.log(angle * (180 / Math.PI));

        hazard.dx = hazard.speed * Math.cos(angle);
        hazard.dy = hazard.speed * Math.sin(angle);
    }
    
}
