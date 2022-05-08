class DirtyHand {
    constructor() {
        this.hazardName = "Dirty Hand";
        this.x = 0;
        this.y = Math.floor(Math.random() * document.documentElement.clientHeight);
        this.w = 400;
        this.h = 400;
        this.speed = 10;
        this.imgUrl = 'assets/dirty_hand.png';
        this.points = 1;
    }
}

class Smoke {
    constructor(x, y) {
        this.hazardName = "Smoke";
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 100;
        this.speed = 10;
        this.imgUrl = 'assets/smoke.png';
        this.points = 2;
    }
}