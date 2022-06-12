class Bullet {
    constructor() {
        this.w = 30;
        this.h = 18;
        this.x = mainCharacter.x;
        this.y = mainCharacter.y + mainCharacter.h / 2;
        this.dx = 10;
        this.imageUrl = 'assets/soap.png';
        this.soapImage = new Image();
        this.soapImage.src = this.imageUrl;
    }

    update() {
        this.x -= this.dx; // right to left
        this.removeOffScreenBullets();
    }

    draw(context) {
        context.drawImage(this.soapImage, this.x, this.y, this.w, this.h);
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
    // if (mainCharacter.bullets <= 0) return; // Commented out for testing.
    bullets.push(new Bullet());
    mainCharacter.bullets -= 1; 
}