/**
 * Class for the antagonist of the game. Just stores the image.
 */
class Antagonist {
    constructor() {
        this.imageUrl = './../assets/antagonist.png';
        this.spriteImage = new Image();
        spriteImage.src = imageUrl;
        this.w = 100;
        this.h = 100;
    }

    // Since antagonist may appear in multiple different places, supply the 
    // x and y coordinates to place the image.
    draw(context, x, y) {
        context.drawImage(this.spriteImage, x, y, this.w, this.h);
    }
}