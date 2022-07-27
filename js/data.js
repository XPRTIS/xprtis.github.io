/* This file contains all data for the game, as well as some functions to
   manipulate data.  */

// Variables needed for game:
var lastTime = Date.now();
var level = 1;
var levelInfo = getLevelInfo(level);
var hazards = [];
var bullets = [];
var sources = [];

var antagonist = new Antagonist();
let imageUrl = 'assets/character1.png';
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
       audioManager.enableOrDisableMusic("bg"); 
       audioManager.playSound("level_clear");
        mainCharacter.finalScore += mainCharacter.score;
        if (levelInfo.lastLevel) {
            stateStack.push(new GameOverView());
            antagonist.gameWon();
        } else {
            level += 1;
            levelInfo = getLevelInfo(level);
            stateStack.push(new LevelClearView());
            mainCharacter.score = 0;
            mainCharacter.health = 100;
            hazards = [];
            sources = [];
            bullets = [];
        }
    }
    
}

function resetGame() {
    level = 1;
    levelInfo = getLevelInfo(level);
    hazards = [];
    bullets = [];
    sources = [];
    mainCharacter = new MainCharacter(spriteImage);
    audioManager.enableOrDisableMusic("bg");
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
            var shouldRemove = true;
            if (!hazard.invincible && collisionCheckRect(bullet, hazard)) {
                // In the case of food being hit, disable the effects so it 
                // doesn't give any points for removal but don't remove it.
                if (hazard instanceof Food) {
                    hazard.disable();
                    shouldRemove = false;
                }

                if (shouldRemove) {
                    console.log(hazard.name)
                    if(hazard.name === "Dirty Hand")
                    {
                        hazard.reduceHealth(10)
                        console.log(hazard.hazardHealth)
                        if(hazard.hazardHealth <= 0)
                        {
                            addToScore(hazard.points);
                            hazardRemoveList.push(hazard);
                        }
                    }
                    else if(hazard.name === "Germ")
                    {
                        addToScore(hazard.points);
                        hazardRemoveList.push(hazard);
                    }
                }

                bulletRemoveList.push(bullet);
                break;
            }
        }
    }

    // Checks for collisions with the character. 
    for (let i = 0; i < hazards.length; i++) {
        var hazard = hazards[i];
        if (collisionCheckRect(mainCharacter, hazard)) {
            hazardRemoveList.push(hazard);
            mainCharacter.health -= hazard.healthLoss;
            if (mainCharacter.health > 100) mainCharacter.health = 100;
            hazard.playCollisionAudio();
        }
    }

    if (mainCharacter.health <= 0) {
        stateStack.push(new GameOverView);
        antagonist.gameLost();
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
        bullets[i].update();
    }
}

function isGameOver() {
    // Check if won:
    if (isLevelOver() && levelInfo.lastLevel) {
        return true;
    }

    // Check if lost:
    if (mainCharacter.health <= 0) {
        return true;
    }

    return false;
}

function handleSourceClicks(x, y) {
    if (stateStack[stateStack.length - 1].name === "GameView") {
        for (let i = 0; i < sources.length; i++) {
            let source = sources[i];
            source.wasClicked(x, y);
        }
    }
}

function spawnHazard() {
    // Some hazards are spawned from sources, which may not have appeared yet. 
    // Use the "canSpawn" functionvbefore choosing a random hazard to spawn
    var allHazards = levelInfo.availableHazards.filter(name => canSpawn(name));
    if (allHazards.length > 0) {
        var hazardName = allHazards.randomElement();
        let result = newInstanceFromName(hazardName);
        if (result !== null) {
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
    // Limit how many sources are spawned at a given point:
    if (sources.length >= 5) return;

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
// enabled (see levels.js to make edits to this feature).
function updateHazardDirection() {
    if (!levelInfo.hazardsFollowPlayer) { return; }
    for (let i = 0; i < hazards.length; i++) {
        let hazard = hazards[i];
        // Don't change direction if it's already close to the end of the
        // screen.
        let ratio = 3 / 5;
        if (hazard.x >= document.documentElement.clientWidth * ratio) {
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
