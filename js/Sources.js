class Stove { 
    constructor() {
        this.sourceName = "Stove";
        this.x = Math.floor(Math.random() * (document.documentElement.clientWidth * .75));
        this.y = Math.floor(Math.random() * (document.documentElement.clientHeight * .75));
        this.w = 400;
        this.h = 400;
        this.speed = 0;
        this.imgUrl = 'assets/stove.png';
        this.points = 1;
        this.enabled = true;
    }

    wasClicked(x, y) {
        if (x > this.x && x < this.x + this.w &&
                y > this.y && y < this.y + this.h) {
                    this.enabled = false;
                    console.log("Stove was clicked, disabling source.")
                }
    }
}

Stove.name = "Stove";