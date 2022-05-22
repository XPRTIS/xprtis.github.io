/* This file contains all data for the game, as well as some functions to
   manipulate data.  */

// Variables needed for game:
var lastTime = Date.now();
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

let imageUrl = 'assets/walking_girl_spritesheet.png';
let spriteImage = new Image();
spriteImage.src = imageUrl;
var mainCharacter = new MainCharacter(spriteImage);

function addToScore(points) {
    if (points < 0 && mainCharacter.score + points >= 0) {
        mainCharacter.score += points;
    }

    else if (points > 0) {
        mainCharacter.score += points;
    }

    if (isLevelOver()) {
        level += 1;
        levelInfo = getLevelInfo(level);
        stateStack.push(new NextLevelView());
        mainCharacter.score = 0;
        hazards = [];
        sources = [];
        bullets = [];
    }
    
}

function resetGame() {
    level = 1;
    levelInfo = getLevelInfo(level);
    hazards = [];
    bullets = [];
    sources = [];
    mainCharacter = new MainCharacter(spriteImage);
}

function isLevelOver() {
    return mainCharacter.score >= levelInfo.maxPoints;
}

/* Returns true/false based on if two rectangles overlap.
   Each object needs to have the following fields:
   {x, y, w, h} (where x and y are the top left coords of the rectangle)
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

// Returns an array of all bullets that had collisions with hazards, as well as
// collisions with the mainCharacter and hazards.
function checkAllCollisions(bullets, hazards) {
    var bulletRemoveList = Array();
    var hazardRemoveList = Array();

    for (let i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        for (let j = 0; j < hazards.length; j++) {
            var hazard = hazards[j];
            if (!hazard.invincible && collisionCheckRect(bullet, hazard)) {
                bulletRemoveList.push(bullet);
                hazardRemoveList.push(hazard);
                addToScore(hazard.points);
                break;
            }
        }
    }

    for (let i = 0; i < hazards.length; i++) {
        var hazard = hazards[i];
        if (collisionCheckRect(mainCharacter, hazard)) {
            hazardRemoveList.push(hazard);
            mainCharacter.health -= hazard.healthLoss;
            console.log(mainCharacter);
            console.log(hazard);
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

function moveBullets() {
    for (let i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        bullet.update();
    }
}

// Check if game is over, whether they won OR lost.
function isGameOver() {
    // Check if won:
    if (isLevelOver() && levelInfo.hasNextLevel) {
        return true;
    }

    // Check if lost:
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

function spawnHazard() {
    // Some hazards are spawned from sources. Use the "canSpawn" function
    // before choosing a random hazard to spawn.
    var allHazards = levelInfo.availableHazards.filter(name => canSpawn(name));
    if (allHazards.length > 0) {
        var hazardName = allHazards.randomElement();
        let result = newInstanceFromName(hazardName);
        if (result != null) {
            hazards.push(result);
        }
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
        let result = newInstanceFromName(sourceName);
        if (result != null) {
            sources.push(result);
        }
    }
}

function removeBullets(bullets, removeList) {
    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        if (removeList.some(elem => elem == bullet)) {
            bullets.splice(i, 1);
        }
    }
}

function removeHazards(hazards, removeList) {
    for (let i = 0; i < hazards.length; i++) {
        let hazard = hazards[i];
        if (removeList.some(elem => elem == hazard)) {
            hazards.splice(i, 1);
        }
    }
}

// Makes hazards follow player. Currently after level 3 this function is
// enabled.
function updateHazardDirection() {
    if (!levelInfo.hazardFollowsPlayer) { return; }
    for (let i = 0; i < hazards.length; i++) {
        let hazard = hazards[i];
        // Don't change direction if it's already close to the end of the
        // screen.
        if (hazard.x >= 3 * document.documentElement.clientWidth / 4) {
            continue;
        }

        // First, calculate the angle between the character and the hazard:
        let angle = Math.atan2(mainCharacter.y - hazard.y, 
                               mainCharacter.x - hazard.x);
        
        // Then update the dx and dy using the angle:
        hazard.dx = hazard.speed * Math.cos(angle);
        hazard.dy = hazard.speed * Math.sin(angle);
    }
    
}
