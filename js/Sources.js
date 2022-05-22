class Source {
    constructor() {
        this.sourceName;
        this.x;
        this.y;
        this.w;
        this.h;
        this.imgUrlEnabled;
        this.imgUrlDisabled;
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
        sourceImage.src = this.enabled ? this.imgUrlEnabled : this.imgUrlDisabled;
        context.drawImage(sourceImage, this.x, this.y, this.w, this.h);
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
        this.imgUrlEnabled = 'assets/stove.png';
        this.imgUrlDisabled = 'assets/stove.png'; // Update with new image
        this.enabled = true;
    }
}

Stove.name = "Stove";