class Hazard {
    // If a 'canSpawn' function is not defined, defaults to true (i.e. there are
    // no conditions to spawning this hazard):
    static canSpawn() { return true; }

    // Each hazard should have these fields:
    constructor(x, y, w, h, dx, dy, imgUrl, points, healthLoss) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.w = w;
        this.h = h;
        this.imgUrl = imgUrl;
        this.points = points;
        this.healthLoss = healthLoss;
        this.invincible = false;
    }

    moveHazard() {
        this.x += this.dx;
        this.y += this.dy;
    }

    draw(context) {
        var hazardImage = new Image();
        hazardImage.src = this.imgUrl;
        context.drawImage(hazardImage, this.x, this.y, this.w, this.h);
    }

}

class DirtyHand extends Hazard {
    constructor() {
        let x = 0;
        let yMin = document.documentElement.clientHeight * 0.1;
        let yMax = document.documentElement.clientHeight * 0.7;
        let y = Math.floor(Math.random() * yMax + yMin);
        let w = 400;
        let h = 400;
        let dx = 10;
        let dy = 0;
        let imgUrl = 'assets/dirty_hand.png';
        let points = 1;
        let healthLoss = 5;
        super(x, y, w, h, dx, dy, imgUrl, points, healthLoss);
    }
}

// Food is not necessarily a hazard but behaves in many of the same ways. Since
// there is only one food object in the game, we can leave it in this file. If
// more food objects are added to this game, we should create a separate file
// to split out the logic. 
class Food extends Hazard {
    constructor() { // Each hazard should have these fields:
        let xMin = document.documentElement.clientWidth * 0.3;
        let xMax = document.documentElement.clientWidth * 0.7;
        let yMin = document.documentElement.clientHeight * 0.1;
        let yMax = document.documentElement.clientHeight * 0.7;
        let x = Math.floor(Math.random() * xMax + xMin);
        let y = Math.floor(Math.random() * yMax + yMin);
        let dx = 0;
        let dy = 0;
        let w = 200;
        let h = 200;
        let imgUrl = 'assets/food.png';
        let points = 0;
        let healthLoss = -1 * 5;
        super(x, y, w, h, dx, dy, imgUrl, points, healthLoss);
        this.invincible = true;
    }
}

class Smoke extends Hazard {
    static canSpawn() {
        for (let i = 0; i < sources.length; i++) {
            let source = sources[i];
            if (source instanceof Stove && source.enabled) return true;
        }

        return false;
    }

    constructor(x, y) {
        let w = 100;
        let h = 100;
        let dx = 10;
        let dy = 0;
        let imgUrl = 'assets/smoke.png';
        let points = 0;
        let healthLoss = 5;
        super(x, y, w, h, dx, dy, imgUrl, points, healthLoss);
        this.invincible = true;
    }
}

class Poop extends Hazard {
    constructor() {
        let xMin = document.documentElement.clientWidth * 0.4;
        let xMax = document.documentElement.clientWidth * 0.7;
        let yMin = document.documentElement.clientHeight * 0.1;
        let yMax = document.documentElement.clientHeight * 0.7;
        let x = Math.floor(Math.random() * xMax + xMin);
        let y = Math.floor(Math.random() * yMax + yMin);
        let dx = 0;
        let dy = 0;
        let w = 200;
        let h = 200;
        let imgUrl = 'assets/poop.png';
        let points = 0;
        let healthLoss = 10;
        super(x, y, w, h, dx, dy, imgUrl, points, healthLoss);
        this.invincible = true;
    }
}
class Flies extends Hazard {}

// STATIC VARIABLES FOR HAZARD NAMES
DirtyHand.name = "DirtyHand";
Smoke.name = "Smoke";
Poop.name = "Poop";
Flies.name = "Flies";
Food.name = "Food";


function canSpawn(name) {
    switch (name) {
        case DirtyHand.name:
            return true;
        case Smoke.name:
            return Smoke.canSpawn();
        case Poop.name:
            return Poop.canSpawn();
        case Flies.name:
            return Flies.canSpawn();
        case Food.name:
            return Food.canSpawn();
    }

    return false; // Default return false.
}

function newInstanceFromName(name) {
    var res = null;
    switch (name) {
        case DirtyHand.name:
            res = new DirtyHand();
            break;
        case Stove.name:
            res = new Stove();
            break;
        case Smoke.name:
            let stoveSources = sources.filter(s => s instanceof Stove);
            let stove = stoveSources.randomElement();
            res = new Smoke(stove.x, stove.y);
            break;
        case Poop.name:
            res = new Poop();
            break;
        case Flies.name:
            res = new Flies();
            break;
        case Food.name:
            res = new Food();
            break;
    }

    return res;
}