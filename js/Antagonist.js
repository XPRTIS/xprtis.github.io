/**
 * Class for the antagonist of the game. Just stores the image.
 */
class Antagonist {
    constructor() {
        this.imageUrl = 'assets/corona.png';
        this.image = new Image();
        this.image.src = this.imageUrl;
        this.w = 135;
        this.h = 135;
    }

    // Since antagonist may appear in multiple different places, supply the 
    // x and y coordinates to place the image.
    draw(context, x, y) {
        context.drawImage(this.image, x, y, this.w, this.h);
    }

    gameWon() {
        this.imageUrl = "assets/corona_win.png";
        this.image.src = this.imageUrl;
    }
    
    gameLost() {
        this.imageUrl = "assets/corona_lose.png";
        this.image.src = this.imageUrl;
    }
}