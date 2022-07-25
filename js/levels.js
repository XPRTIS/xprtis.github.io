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
        // List of all names of sources available for a given level.
        availableSources: [],
        // Points needed to progress to the next level. Note that Math.min()
        // returns "Infinity," meaning that if this field is not specified the
        // level will last forever.
        maxPoints: Math.min(),
        // If set to true, hazards will shift towards player to increase
        // difficulty.
        hazardsFollowPlayer: false,
        lastLevel: false
    }

    switch (level) {
        case 1:
            levelInfo.availableHazards.push(DirtyHand.name);
            levelInfo.maxPoints = 3; // Should be 16, we set to 1 for testing purposes.
            break;
        case 2:
            levelInfo.availableHazards.push(DirtyHand.name, Food.name);
            levelInfo.availableSources.push(Stove.name);
            levelInfo.maxPoints = 10;
            break;
        case 3:
            levelInfo.availableHazards.push(DirtyHand.name, Food.name, Smoke.name);
            levelInfo.availableSources.push(Stove.name);
            levelInfo.maxPoints = 15;
            levelInfo.hazardsFollowPlayer = true;
            break;
        case 4:
            levelInfo.availableHazards.push(DirtyHand.name, Food.name, Smoke.name, Germ.name);
            levelInfo.availableSources.push(Stove.name);
            levelInfo.maxPoints = 20;
            levelInfo.hazardsFollowPlayer = true;
            levelInfo.lastLevel = true;
            break;
    }
    
    return levelInfo;
}
