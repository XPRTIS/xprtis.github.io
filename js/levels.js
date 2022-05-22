/**
 * This file contains one function: getLevelInfo. This converts the given level
 * of the game to the attributes that are available for that level. 
 * 
 * Update this function with necessary level specific attributes if needed. The
 * game will end levelInfo.hasNextLevel is set to false and the level is
 * completed.
 * 
 */

function getLevelInfo(level) {
    var levelInfo = {
        // list of all names of hazards available for a given level.
        availableHazards: [],
        // list of all names of sources available for a given level.
        availableSources: [],
        // points needed to progress to the next level. note that Math.min()
        // returns "Infinity," meaning that if this field is not specified the
        // level will last forever.
        maxPoints: Math.min(),
        hazardsFollowPlayer: false,
        hasNextLevel: true
    }

    switch (level) {
        case 1:
            levelInfo.availableHazards.push(DirtyHand.name);
            levelInfo.maxPoints = 1; // Should be 16.
            break;
        case 2:
            levelInfo.availableHazards.push(DirtyHand.name, Smoke.name, 
                                            Food.name);
            levelInfo.availableSources.push(Stove.name);
            levelInfo.maxPoints = 20;
            break;
        case 3:
            levelInfo.availableHazards.push(DirtyHand.name, Smoke.name, 
                                            Food.name, Poop.name);
            levelInfo.availableSources.push(Stove.name);
            levelInfo.maxPoints = 30;
            levelInfo.hazardsFollowPlayer = true;
            break;
        case 4:
            levelInfo.availableHazards.push(DirtyHand.name, Smoke.name, 
                Food.name, Flies.name, Poop.name);
            levelInfo.availableSources.push(Stove.name);
            levelInfo.maxPoints = 35;
            levelInfo.hazardsFollowPlayer = true;
            levelInfo.hasNextLevel = false;
            break;
    }
    
    return levelInfo;
}