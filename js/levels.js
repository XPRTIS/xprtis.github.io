function getLevelInfo(level) {
    var levelInfo = {
        // list of all names of hazards available for a given level.
        availableHazards: [],
        // list of all names of sources available for a given level.
        availableSources: [],
        // points needed to progress to the next level
        maxPoints: Math.min(),
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
            break;
        case 4:
            levelInfo.availableHazards.push(DirtyHand.name, Smoke.name, 
                Food.name, Flies.name, Poop.name);
            levelInfo.availableSources.push(Stove.name);
            levelInfo.maxPoints = 35;
            levelInfo.hasNextLevel = false;
            break;
    }
    
    return levelInfo;
}