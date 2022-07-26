class MainCharacter {
    constructor(spriteImage) {
        this.x = (9 * document.documentElement.clientWidth) / 10;
        this.y = document.documentElement.clientHeight / 2;
        this.speed = 20;
        this.bullets = 10;
        this.spriteImage = spriteImage;
        this.gender = true;
        this.w = 2260 / (4 * 10);
        this.h = 740 / 10;
        this.frameIndex = 0;
        this.numFrames = 5;
        this.score = 0;
        this.health = 100;
        this.items = [];
        this.finalScore = 0;
        this.initial = 200;
    }

    moveCharacter(dir) {
        switch (dir) {
            case "ArrowUp":
                this.moveCharacterUp();
                break;
            case "ArrowDown":
                this.moveCharacterDown();
                break;
            case "ArrowLeft": // fall through
            case "ArrowRight":
                break;
        }
    }

    moveCharacterUp() {
        if (this.y <= 0 + document.documentElement.clientHeight * 0.25) return;
        if(this.frameIndex == 3) 
        { 
            this.frameIndex = 0 
        }
        else
        {
            this.frameIndex = (this.frameIndex + 1) % this.numFrames;
        }
        this.y -= this.speed;
    }

    moveCharacterDown() {
        if (this.y + this.h >= document.documentElement.clientHeight) return;
        if (this.frameIndex === 0) { this.frameIndex = 3; }
        else { this.frameIndex -= 1; }
        this.y += this.speed;
    }

    // Left + Right functionality leftover, can get rid of it if necessary.
    moveCharacterLeft() {
        if (this.x <= 0) return;
        this.frameIndex = (this.frameIndex + 1) % this.numFrames;
        this.x -= this.speed;
    }

    moveCharacterRight() {
        if (this.x + this.w >= document.documentElement.clientWidth) return;
        if (this.frameIndex === 0) { this.frameIndex = 3; }
        else { this.frameIndex -= 1; }
        this.x += this.speed;
    }

    changeImage(newSpriteImage, initial) {
        this.spriteImage = newSpriteImage;
        this.initial = initial;
    }

    draw(context) {
        context.drawImage(this.spriteImage,
            ((this.frameIndex * this.spriteImage.width) / this.numFrames) + this.initial,
            0,
            this.spriteImage.width / this.numFrames,
            this.spriteImage.height,
            this.x,
            this.y,
            this.spriteImage.width / this.numFrames / 10,
            this.spriteImage.height / 10);
    }
}
