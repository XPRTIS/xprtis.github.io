class Bullet {
    constructor(angle) {
        this.angle = angle;
        this.w = 30;
        this.h = 10;
        this.x = mainCharacter.x + this.w / 2;
        this.y = mainCharacter.y;
        this.dx = 10;
    }

    update() {
        this.x -= this.dx; // right to left
        this.removeOffScreenBullets();
    }

    draw(context) {
        context.fillStyle = 'rgba(0, 0, 255, 1)';
        context.fillRect(this.x, this.y, this.w, this.h);
    }

    removeOffScreenBullets() {
        var remainingBullets = [];
        for (let i = 0; i < bullets.length; i++) {
            let bullet = bullets[i];
            if (bullet.x >= -1 * this.w) {
                remainingBullets.push(bullet);
            }
        }

        bullets = remainingBullets;
    }

}

function createBullet() {
    // if (mainCharacter.bullets <= 0) return; // Turned off for testing.
    bullets.push(new Bullet());
    mainCharacter.bullets -= 1; 
}