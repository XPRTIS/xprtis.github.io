// Bringing it all together: 
// Create a file that stores all game data and copy over the above code into it.
// Out of class, there are (conveniently) four things that we didn't get to:
// 1. Main character
// 2. Bullets
// 3. Sources (where hazards come from)
// 4. "Good" Items: Things like soap
// Complete these in the new game data file that we create and push to the
// Github repository.


// Write the function moveHazards, which takes in hazards and updates them.

function moveHazards() {
    for (let i = 0; i < hazards.length; i++) {
        var hazard = hazards[i];
        if ('speed' in hazard) {
            hazard.x += hazard.speed;
        }
    }
}

function moveBullets() {
    for (let i = 0; i < bullets.length; i ++) {
        var bullet = bullets[i];
        bullet.x -= bullet.speed;
        bullet.y -= bullet.speed;
    }
}
    
// Write a function that removes some bullets from list of all the bullets.
// Bullets are represented by x and y coordinates like: [x, y]. 

// bullets = [ [x1, y1], [x2, y2], ... ]

// if (array1 == array2) { ... } -> array 1: [1, 2, 3] and array 2: [1, 2, 3]
// let array2 = array1

function isEqual(bullet1, bullet2) {
    return bullet1[0] == bullet2[0] && bullet1[1] == bullet2[1];
}

// a = [[1, 2], [4, 3]]
// a.some(elem => isEqual(elem, [1, 2]))

// splice
// a = [1, 2, 3]
// a.splice(1, 1) -> a = [1, 3]

function removeBullets(bullets, removeList) {
    for (let i = 0; i < bullets.length; i++) {
        // Check that bullet is in removeList
        let bullet = bullets[i];
        if (removeList.some(elem => isEqual(elem, bullet))) {
            bullets.splice(i, 1);
        }
    }
}

function testRemoveBullets() {
    let bullets = [[1, 2], [4, 3]];
    let removeList = [[1, 2]]
    removeBullets(bullets, removeList);
    console.assert(bullets[0][0] == 4 && bullets[0][1] == 3);    
}

// testRemoveBullets();

