// Create an array for the different hazards that exist:

var dirtyHands = {
    x: 0,
    y: 0,
    // Any other information that might be helpful to store about the object...
    // Examples: image url, speed, etc.
};

var anotherHazard = {}; // Fill in with another hazard

var hazards = []; // fill in the rest with your code.

// Create an array for the scripts of evil villan
// (Find them on the game design document)

var villanScripts = [];


// Bringing it all together: 
// Create a file that stores all game data and copy over the above code into it.
// Out of class, there are (conveniently) four things that we didn't get to:
// 1. Main character
// 2. Score (health, gold/points, etc.)
// 3. Sources (where hazards come from)
// 4. "Good" Items: Things like soap
// Complete these in the new game data file that we create and push to the
// Github repository.


// Write a function that removes some bullets from list of all the bullets.
// Bullets are represented by x and y coordinates like: [x, y]. 

function isEqual(bullet1, bullet2) {
    return bullet1[0] == bullet2[0] && bullet1[1] == bullet2[1];
}

function removeBullets(bullets, removeList) {
    // ...
}

function testRemoveBullets() {
    let bullets = [[1, 2], [4, 3]];
    let removeList = [[1, 2]]
    removeBullets(bullets, removeList);
    console.assert(bullets[0][0] == 4 && bullets[0][1] == 3);    
}

// testRemoveBullets();
