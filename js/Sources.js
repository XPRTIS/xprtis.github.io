class Source {
    constructor() {
        this.sourceName;
        this.x;
        this.y;
        this.w;
        this.h;
        this.imgUrl;
        this.enabled;
    }

    wasClicked(x, y) {
        if (x > this.x && x < this.x + this.w &&
                y > this.y && y < this.y + this.h) {
                    this.enabled = false;
                    console.log("Stove was clicked, disabling source.");
                }
    }

    draw(context) {
        var sourceImage = new Image();
        if (this.enabled) {
            sourceImage.src = this.imgUrl;
            context.drawImage(sourceImage, this.x, this.y, this.w, this.h);
        } else {
            sourceImage.src = this.imgUrl; // TO DO: replace with new image
            context.drawImage(sourceImage, this.x, this.y, this.w, this.h);
        }
    }
}

class Stove extends Source {
    constructor() {
        super();
        this.sourceName = "Stove";
        this.x = Math.floor(Math.random() * (document.documentElement.clientWidth * .75));
        this.y = Math.floor(Math.random() * (document.documentElement.clientHeight * .75));
        this.w = 250;
        this.h = 250;
        this.imgUrl = 'assets/stove.png';
        this.enabled = true;
    }
}

Stove.name = "Stove";