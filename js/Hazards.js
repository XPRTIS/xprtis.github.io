class Hazard {
    // If a 'canSpawn' function is not defined, defaults to true (i.e. there are
    // no conditions to spawning this hazard):
    static canSpawn() { return true; }
    static name = "Hazard";

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
        // If a hazard can't be hit by the soap bullets, the points field should
        // be 0 and be marked as invincible, unless it's food:
        if (this instanceof Food) {
            this.invincible = false;
        } else {
            this.invincible = points === 0 ? true : false;
        }
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

    playCollisionAudio() {
        if (typeof this.audio !== "undefined") {
            audioManager.playSound(this.audio);
        }
    }
}

class DirtyHand extends Hazard {
    static name = "DirtyHand";
    constructor() {
        let yMin = document.documentElement.clientHeight * 0.1;
        let yMax = document.documentElement.clientHeight * 0.7;
        let y = Math.floor(Math.random() * (yMax - yMin) + yMin);
        let w = document.documentElement.clientWidth * 0.1;
        let x = w;
        let h = w;
        let dx = 6;
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
    static name = "Food";
    constructor() { // Each hazard should have these fields:
        let yMin = document.documentElement.clientHeight * 0.1;
        let yMax = document.documentElement.clientHeight * 0.7;
        let y = Math.floor(Math.random() * (yMax - yMin) + yMin);
        let dx = 6;
        let dy = 0;
        let w = document.documentElement.clientWidth * 0.1;
        let h = w;
        let x = w;
        let imgUrl = 'assets/food.png';
        let points = 0;
        let healthLoss = -1 * 5;
        super(x, y, w, h, dx, dy, imgUrl, points, healthLoss);
        this.audio = "salad";
    }

    disable() {
        // If a player hits the Food with a bullet, this function is invoked. 
        // This changes the health "loss" to be 0 so that instead of gaining
        // health it has no effect. We change the imgUrl so that the player
        // can tell it's no longer "edible."
        this.healthLoss = 0;
        this.imgUrl = 'assets/food_bad.png'; // TODO: change to a different picture.
    }
}

class Smoke extends Hazard {
    static name = "Smoke";
    static canSpawn() {
        for (let i = 0; i < sources.length; i++) {
            let source = sources[i];
            if (source instanceof Stove && source.enabled) return true;
        }

        return false;
    }

    constructor(x, y) {
        let w = document.documentElement.clientWidth * 0.1;
        let h = w;
        let dx = 6;
        let dy = 0;
        let imgUrl = 'assets/smoke.png';
        let points = 0;
        let healthLoss = 5;
        super(x, y, w, h, dx, dy, imgUrl, points, healthLoss);
        this.audio = "cough";
    }
}

// TODO: Figure out how we handle this hazard since it spawns flies but also
// is a hazard itself.
class Poop extends Hazard {
    static name = "Poop";
    constructor() {
        let xMin = document.documentElement.clientWidth * 0.4;
        let xMax = document.documentElement.clientWidth * 0.7;
        let yMin = document.documentElement.clientHeight * 0.1;
        let yMax = document.documentElement.clientHeight * 0.7;
        let x = Math.floor(Math.random() * (xMax - xMin) + xMin);
        let y = Math.floor(Math.random() * (yMax - yMin) + yMin);
        let dx = 0;
        let dy = 0;
        let w = document.documentElement.clientWidth * 0.1;
        let h = w;
        let imgUrl = 'assets/poop.png';
        let points = 0;
        let healthLoss = 10;
        super(x, y, w, h, dx, dy, imgUrl, points, healthLoss);
    }
}
class Flies extends Hazard {
    static name = "Flies";
    
    constructor() {
        let xMin = document.documentElement.clientWidth * 0.4;
        let xMax = document.documentElement.clientWidth * 0.7;
        let yMin = document.documentElement.clientHeight * 0.1;
        let yMax = document.documentElement.clientHeight * 0.7;
        let x = Math.floor(Math.random() * (xMax - xMin) + xMin);
        let y = Math.floor(Math.random() * (yMax - yMin) + yMin);
        let dx = 0;
        let dy = 0;
        let w = document.documentElement.clientWidth * 0.1;
        let h = w;
        let imgUrl = 'assets/flies.png'; // TODO: find image of flies.
        let points = 0;
        let healthLoss = 10;
        super(x, y, w, h, dx, dy, imgUrl, points, healthLoss);
    }
}

var allHazards = [DirtyHand, Food, Smoke, Poop, Flies];
var hazardNameMappings = {};
for (const hazard of allHazards) {
    hazardNameMappings[hazard.name] = hazard;
}

function canSpawn(name) {
    if (name in hazardNameMappings) {
        return hazardNameMappings[name].canSpawn();
    }

    return false; // Safety measure 
}
    

function newInstanceFromName(name) {
    var res = null;

    // It's safer to split the functionality here since some hazards may require
    // specific fields, such as Smoke, which requires x and y coordinates. 
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
            res = new Smoke(stove.x + (stove.w / 2), stove.y + (stove.h / 2));
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