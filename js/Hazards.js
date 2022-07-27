class Hazard {
    // If a 'canSpawn' function is not defined, defaults to true (i.e. there are
    // no conditions to spawning this hazard):
    static canSpawn() { return true; }

    // Each hazard should have these fields:
    constructor(name, x, y, w, h, dx, dy, speed, imgUrl, points, healthLoss) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = speed;
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
        this.x += this.dx * levelInfo.speed;
        this.y += this.dy * levelInfo.speed;
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
    constructor(type) {
        let name = "Dirty Hand";
        let yMin = document.documentElement.clientHeight * 0.3;
        let yMax = document.documentElement.clientHeight * 0.7;
        let y = Math.floor(Math.random() * (yMax - yMin) + yMin);
        let w = document.documentElement.clientWidth * 0.1;
        let x = w;
        let h = w;
        let dx = 2;
        let dy = 0;
        let speed = 0;
        let imgUrl;
        if(type == 1)
        {
            imgUrl = 'assets/hand1.png';
        }
        else if(type == 2)
        {
            imgUrl = 'assets/hand2.png';
        }
        else if(type == 3)
        {
            imgUrl = 'assets/hand3.png';
        }

        let points = 1;
        let healthLoss = 20;
        super(name, x, y, w, h, dx, dy, speed, imgUrl, points, healthLoss);

        this.hazardHealth = type == 1 ? 20 : type == 2 ? 30 : 40;
        this.totalHazardHealth = type == 1 ? 20 : type == 2 ? 30 : 40;;
    }

    draw(context) {
        var hazardImage = new Image();
        hazardImage.src = this.imgUrl;
        context.drawImage(hazardImage, this.x, this.y, this.w, this.h);

        let width = this.w / 2; 
        let height = 10;
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fillRect(this.x + this.w / 4, this.y + this.h + 10, width, height);

        context.fillStyle = 'rgba(255, 0, 0, 1)';
        context.fillRect(this.x + this.w / 4, this.y + this.h + 10, width * (this.hazardHealth / this.totalHazardHealth), height);
        context.restore();
    }

    reduceHealth(damage) {
        this.hazardHealth -= damage;
        if(this.imgUrl == 'assets/hand3.png')
        {
            this.imgUrl = 'assets/hand2.png';
        }
        else if(this.imgUrl == 'assets/hand2.png')
        {
            this.imgUrl = 'assets/hand1.png';
        }
        else if(this.imgUrl == 'assets/hand1.png')
        {
            this.imgUrl = 'assets/hand0.png';
        }
    }
}

class Germ extends Hazard {
    constructor() {
        let name = "Germ";
        let yMin = document.documentElement.clientHeight * 0.3;
        let yMax = document.documentElement.clientHeight * 0.7;
        let y = Math.floor(Math.random() * (yMax - yMin) + yMin);
        let w = document.documentElement.clientWidth * 0.1;
        let x = w;
        let h = w;
        let dx = 2;
        let dy = 0;
        let speed = 2;
        let random = Math.floor(Math.random() * 4);
        let imgUrl;
        if(random == 0)
        {
            imgUrl = 'assets/germ1.png';
        }
        else if(random == 1)
        {
            imgUrl = 'assets/germ2.png';
        }
        else if(random == 2)
        {
            imgUrl = 'assets/germ3.png';
        }
        else if(random == 3)
        {
            imgUrl = 'assets/germ4.png';
        }

        let points = 1;
        let healthLoss = 30;
        super(name, x, y, w, h, dx, dy, speed, imgUrl, points, healthLoss);
    }
}

// Food is not necessarily a hazard but behaves in many of the same ways. Since
// there is only one food object in the game, we can leave it in this file. If
// more food objects are added to this game, we should create a separate file
// to split out the logic. 
class Food extends Hazard {
    constructor() { // Each hazard should have these fields:
        let name = "Food";
        let yMin = document.documentElement.clientHeight * 0.3;
        let yMax = document.documentElement.clientHeight * 0.7;
        let y = Math.floor(Math.random() * (yMax - yMin) + yMin);
        let dx = 2;
        let dy = 0;
        let speed = 2;
        let w = document.documentElement.clientWidth * 0.1;
        let h = w;
        let x = w;
        let random = Math.floor(Math.random() * 3);
        let imgUrl;
        if(random == 0)
        {
            imgUrl = 'assets/food1.png';
        }
        else if(random == 1)
        {
            imgUrl = 'assets/food2.png';
        }
        else if(random == 2)
        {
            imgUrl = 'assets/food3.png';
        }
        let points = 0;
        let healthLoss = -1 * 5;
        super(name, x, y, w, h, dx, dy, speed, imgUrl, points, healthLoss);
        this.audio = "salad";
    }

    disable() {
        // If a player hits the Food with a bullet, this function is invoked. 
        // This changes the health "loss" to be 0 so that instead of gaining
        // health it has no effect. We change the imgUrl so that the player
        // can tell it's no longer "edible."
        this.healthLoss = 0;
        if(this.imgUrl == 'assets/food1.png')
        {
            this.imgUrl = 'assets/food1-rotten.png'; // TODO: change to a different picture.
        }
        else if(this.imgUrl == 'assets/food2.png')
        {
            this.imgUrl = 'assets/food2-rotten.png'; // TODO: change to a different picture.
        }
        else if(this.imgUrl == 'assets/food3.png')
        {
            this.imgUrl = 'assets/food3-rotten.png'; // TODO: change to a different picture.
        }
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
        let name = "Smoke";
        let w = document.documentElement.clientWidth * 0.1;
        let h = w;
        let dx = 2;
        let dy = 0;
        let speed = 2;
        let imgUrl = 'assets/smoke.png';
        let points = 0;
        let healthLoss = 50;
        super(name, x, y, w, h, dx, dy, speed, imgUrl, points, healthLoss);
        this.audio = "cough";
    }
}

// TODO: Figure out how we handle this hazard since it spawns flies but also
// is a hazard itself.
class Poop extends Hazard {
    constructor() {
        let name = "Poop";
        let xMin = document.documentElement.clientWidth * 0.4;
        let xMax = document.documentElement.clientWidth * 0.7;
        let yMin = document.documentElement.clientHeight * 0.3;
        let yMax = document.documentElement.clientHeight * 0.7;
        let x = Math.floor(Math.random() * (xMax - xMin) + xMin);
        let y = Math.floor(Math.random() * (yMax - yMin) + yMin);
        let dx = 0;
        let dy = 0;
        let speed = 0;
        let w = document.documentElement.clientWidth * 0.1;
        let h = w;
        let imgUrl = 'assets/poop.png';
        let points = 0;
        let healthLoss = 10;
        super(name, x, y, w, h, dx, dy, speed, imgUrl, points, healthLoss);
    }
}
class Flies extends Hazard {
    
    constructor() {
        let name = "Flies";
        let xMin = document.documentElement.clientWidth * 0.4;
        let xMax = document.documentElement.clientWidth * 0.7;
        let yMin = document.documentElement.clientHeight * 0.3;
        let yMax = document.documentElement.clientHeight * 0.7;
        let x = Math.floor(Math.random() * (xMax - xMin) + xMin);
        let y = Math.floor(Math.random() * (yMax - yMin) + yMin);
        let dx = 0;
        let dy = 0;
        let speed = 0;
        let w = document.documentElement.clientWidth * 0.1;
        let h = w;
        let imgUrl = 'assets/flies.png'; // TODO: find image of flies.
        let points = 0;
        let healthLoss = 10;
        super(name, x, y, w, h, dx, dy, speed, imgUrl, points, healthLoss);
    }
}

var allHazards = [DirtyHand, Food, Smoke, Poop, Flies, Germ];
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
            if(level == 1)
            {
                res = new DirtyHand(1);
            }
            else if(level == 2)
            {
                let type = Math.floor(Math.random() * 2) + 1
                res = new DirtyHand(type);
            }
            else if(level >= 3)
            {
                let type = Math.floor(Math.random() * 3) + 1
                res = new DirtyHand(type);
            }
            
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
        case Germ.name:
            res = new Germ();
            break;
    }

    return res;
}
