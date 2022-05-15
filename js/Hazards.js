class DirtyHand {
    // Dirty hands can always spawn, but to keep consistency with other hazards
    // and their canSpawn method, we create this method to always return true.
    static canSpawn() {
        return true; 
    }

    constructor() {
        this.x = 0;
        this.y = Math.floor(Math.random() * document.documentElement.clientHeight);
        this.w = 400;
        this.h = 400;
        this.dx = 10;
        this.dy = 0;
        this.speed = 10;
        this.imgUrl = 'assets/dirty_hand.png';
        this.points = 1;
    }

    moveHazard() {
        this.x += this.dx;
        this.y += this.dy;
    }
}

// Food is not necessarily a hazard but behaves in many of the same ways. Since
// there is only one food object in the game, we can leave it in this file. If
// more food objects are added to this game, we should create a separate file
// to split out the logic. 
class Food {
    static canSpawn() { return true; }
    constructor() {}
}

class Smoke {
    static canSpawn() {
        for (let i = 0; i < sources.length; i++) {
            let source = sources[i];
            if (source instanceof Stove && source.enabled) return true;
        }

        return false;
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 100;
        this.speed = 10;
        this.imgUrl = 'assets/smoke.png';
        this.points = 2;
    }
}

class Poop {}
class Flies {}

// STATIC VARIABLES FOR HAZARD NAMES
DirtyHand.name = "DirtyHand";
Smoke.name = "Smoke";
Poop.name = "Poop";
Flies.name = "Flies";
Food.name = "Food";


function canSpawn(name) {
    switch (name) {
        case DirtyHand.name:
            return DirtyHand.canSpawn();
        case Smoke.name:
            return Smoke.canSpawn();
        case Flies.name:
            return Flies.canSpawn();
        case Food.name:
            return Food.canSpawn();
    }

    return true;
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