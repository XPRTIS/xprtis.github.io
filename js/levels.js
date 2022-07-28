/**
 * This file contains one function: getLevelInfo. This converts the given level
 * of the game to the attributes that are available for that level. 
 * 
 * Update this function with necessary level specific attributes if needed. The
 * game will end if levelInfo.lastLevel is set to false and the level is
 * completed.
 * 
 */

function getLevelInfo(level) {
    var levelInfo = {
        // List of all names of hazards available for a given level.
        availableHazards: [],
        probHazards: [],
        // List of all names of sources available for a given level.
        availableSources: [],
        // Points needed to progress to the next level. Note that Math.min()
        // returns "Infinity," meaning that if this field is not specified the
        // level will last forever.
        maxPoints: Math.min(),
        speed: 1,
        // If set to true, hazards will shift towards player to increase
        // difficulty.
        hazardsFollowPlayer: false,
        lastLevel: false
    }

    switch (level) {
        case 1:
            levelInfo.availableHazards.push(DirtyHand.name);
            levelInfo.probHazards.push(1);
            levelInfo.maxPoints = 1;//3; // Should be 16, we set to 1 for testing purposes.
            break;
        case 2:
            levelInfo.availableHazards.push(DirtyHand.name, Food.name);
            levelInfo.probHazards.push(0.8, 0.2);
            levelInfo.maxPoints = 1;//10;
            levelInfo.speed = 1.2;
            break;
        case 3:
            levelInfo.availableHazards.push(DirtyHand.name, Food.name, Smoke.name);
            levelInfo.probHazards.push(0.6, 0.2, 0.2);
            levelInfo.availableSources.push(Stove.name);
            levelInfo.maxPoints = 1;//15;
            levelInfo.speed = 1.5;
            levelInfo.hazardsFollowPlayer = true;
            break;
        case 4:
            levelInfo.availableHazards.push(DirtyHand.name, Food.name, Smoke.name, Germ.name);
            levelInfo.probHazards.push(0.3, 0.2, 0.2, 0.3);
            levelInfo.availableSources.push(Stove.name);
            levelInfo.maxPoints = 1;//20;
            levelInfo.speed = 2;
            levelInfo.hazardsFollowPlayer = true;
            levelInfo.lastLevel = true;
            break;
    }
    
    return levelInfo;
}
