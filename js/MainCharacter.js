class MainCharacter {
    constructor(spriteImage) {
        this.x = (9 * document.documentElement.clientWidth) / 10;
        this.y = document.documentElement.clientHeight / 2;
        this.speed = 50;
        this.bullets = 10;
        this.spriteImage = spriteImage;
        this.w = 2259 / (4 * 4);
        this.h = 740 / 4;
        this.frameIndex = 0;
        this.numFrames = 4;
        this.score = 0;
        this.health = 100;
        this.items = [];
    }

    moveCharacter(dir) {
        switch (dir) {
            case "ArrowUp":
                this.moveCharacterUp();
                break;
            case "ArrowDown":
                this.moveCharacterDown();
                break;
            case "ArrowLeft":
                this.moveCharacterLeft();
                break;
            case "ArrowRight":
                this.moveCharacterRight();
                break;
        }
    }

    moveCharacterUp() {
        this.frameIndex = (this.frameIndex + 1) % this.numFrames;
        this.y -= this.speed;
    }

    moveCharacterDown() {
        if (this.frameIndex === 0) { this.frameIndex = 3; }
        else { this.frameIndex -= 1; }
        this.y += this.speed;
    }

    moveCharacterLeft() {
        this.frameIndex = (this.frameIndex + 1) % this.numFrames;
        this.x -= this.speed;
    }

    moveCharacterRight() {
        if (this.frameIndex === 0) { this.frameIndex = 3; }
        else { this.frameIndex -= 1; }
        this.x += this.speed;
    }

    draw(context) {
        context.drawImage(this.spriteImage,
            (this.frameIndex * this.spriteImage.width) / this.numFrames,
            0,
            this.spriteImage.width / this.numFrames,
            this.spriteImage.height,
            this.x,
            this.y,
            this.spriteImage.width / this.numFrames / 4,
            this.spriteImage.height / 4);
    }
}