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
    }
}