class MainCharacter {
    constructor(spriteImage) {
        this.x = (9 * document.documentElement.clientWidth) / 10;
        this.y = document.documentElement.clientHeight / 2;
        this.speed = 30;
        this.bullets = 10;
        this.spriteImage = spriteImage;
        this.width = 2259;
        this.height = 740;
        this.frameIndex = 0;
        this.numFrames = 4; 
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

    draw(context) {
        context.drawImage(this.spriteImage,
            (this.frameIndex * this.spriteImage.width) / this.numFrames,
            0,
            this.width / this.numFrames,
            this.height,
            this.x,
            this.y,
            this.width / this.numFrames / 5,
            this.height / 5);
    }
}